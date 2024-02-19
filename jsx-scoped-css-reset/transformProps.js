import { resetClassNameByElementType } from "./resetClassNameByElementType";

/**
 * @param {React.ElementType} type
 * @param {Object.<string, *>} props
 */
export function transformProps(type, props) {
  const prefix = resetClassNameByElementType.get(type);
  return prefix != null
    ? {
        ...props,
        className: props.className ? `${prefix} ${props.className}` : prefix,
      }
    : props;
}
