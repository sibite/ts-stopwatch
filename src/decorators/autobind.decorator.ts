export default function Autobind(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
): PropertyDescriptor {
  return {
    configurable: false,
    enumerable: descriptor.enumerable,
    get() {
      return descriptor.value.bind(this);
    },
  };
}
