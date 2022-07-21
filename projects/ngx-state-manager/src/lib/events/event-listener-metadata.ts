import { Type } from '@angular/core';
import { FeatureStateManager } from '../feature-state-manager';

const METADATA_KEY = Symbol('state-manager: Event Listeners');

interface ListenerMetadata<T = Type<any>> {
  methodName: string | symbol;
  type: T;
}

function getListenerMetadataEntries(
  featureStateManager: FeatureStateManager<any>
): ListenerMetadata[] {
  const ctor = featureStateManager.constructor as Function & {
    [METADATA_KEY]: ListenerMetadata[];
  };
  return ctor.hasOwnProperty(METADATA_KEY) ? ctor[METADATA_KEY] : [];
}

function setListenerMetadataEntries(
  featureStateManagerClass: Object,
  listenerMetadata: ListenerMetadata
) {
  const ctor = featureStateManagerClass.constructor as Function & {
    [METADATA_KEY]: ListenerMetadata[];
  };
  const metadataEntries: ListenerMetadata[] = ctor.hasOwnProperty(METADATA_KEY)
    ? ctor[METADATA_KEY]
    : Object.defineProperty(ctor, METADATA_KEY, { value: [] })[METADATA_KEY];
  if (
    metadataEntries.some(
      ({ methodName, type }) =>
        methodName === listenerMetadata.methodName ||
        type === listenerMetadata.type
    )
  ) {
    return;
  }
  metadataEntries.push(listenerMetadata);
}

export function ListenEvent<T extends Type<any>>(type: T): MethodDecorator {
  return function (target: Object, methodName: string | symbol) {
    const metadata: ListenerMetadata<T> = { methodName, type };
    setListenerMetadataEntries(target, metadata);
  };
}

export function getListenerMetadata(
  featureStateManager: FeatureStateManager<any>
): Array<ListenerMetadata<Type<any>>> {
  return getListenerMetadataEntries(featureStateManager);
}
