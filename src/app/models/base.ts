export class BaseModel<T> {
  constructor(attributes: T) {
    Object.assign(this, attributes);
  }
}
