import { Type } from '@angular/core';
import { FeatureStateManager } from '../feature-state-manager';

const METADATA_KEY = '__state-manager/events__';

interface ListenerMetadata<T extends Type<any>> {
  methodName: string;
  type: T;
}

function getEffectMetadataEntries<T extends FeatureStateManager<any>>(
  sourceProto: T
): Array<ListenerMetadata<Type<any>>> {
  return sourceProto.constructor.hasOwnProperty(METADATA_KEY)
    ? (sourceProto.constructor as any)[METADATA_KEY]
    : [];
}

function setListenerMetadataEntries<T extends Type<FeatureStateManager<any>>>(
  sourceProto: T,
  entries: Array<ListenerMetadata<Type<any>>>
) {
  const constructor = sourceProto.constructor;
  const meta: Array<ListenerMetadata<T>> = constructor.hasOwnProperty(
    METADATA_KEY
  )
    ? (constructor as any)[METADATA_KEY]
    : Object.defineProperty(constructor as any, METADATA_KEY, { value: [] })[
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

export function ListenEvent<T extends Type<any>>(type: T): PropertyDecorator {
  return function <F extends Type<FeatureStateManager<any>>>(target: F, methodName: string) {
    const metadata: ListenerMetadata<T> = { methodName, type };
    setListenerMetadataEntries(target, [metadata]);
  } as (target: {}, propertyName: string | symbol) => void;
}

export function getListenerMetadata<T extends FeatureStateManager<any>>(
  instance: T
): Array<ListenerMetadata<Type<any>>> {
  return getEffectMetadataEntries(instance);
}
