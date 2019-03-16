const METADATA_KEY = '__state-manager/events__';

interface ListenerMetadata<T> {
  methodName: string;
  type: any;
}

function getEffectMetadataEntries<T>(
  sourceProto: T
): Array<ListenerMetadata<T>> {
  return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
    ? (sourceProto.constructor as any)[METADATA_KEY]
    : [];
}

function setListenerMetadataEntries<T>(
  sourceProto: T,
  entries: Array<ListenerMetadata<T>>
) {
  const constructor = sourceProto.constructor;
  const meta: Array<ListenerMetadata<T>> = constructor.hasOwnProperty(
    METADATA_KEY
  )
    ? (constructor as any)[METADATA_KEY]
    : Object.defineProperty(constructor, METADATA_KEY, { value: [] })[
        METADATA_KEY
      ];
  if (
    meta.some(lm =>
      entries.some(e => lm.methodName === e.methodName || lm.type === e.type)
    )
  ) {
    return;
  }
  Array.prototype.push.apply(meta, entries);
}

export function ListenEvent<T>(type: any): PropertyDecorator {
  return function(target: T, methodName: string) {
    const metadata: ListenerMetadata<T> = { methodName, type };
    setListenerMetadataEntries<T>(target, [metadata]);
  } as (target: {}, propertyName: string | symbol) => void;
}

export function getListenerMetadata<T>(
  instance: T
): Array<ListenerMetadata<T>> {
  return getEffectMetadataEntries(instance);
}
