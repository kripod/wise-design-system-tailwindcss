import type { Transform } from "jscodeshift";

const tailwindUtilityByNeptuneUtility = new Map([
  ["affix", "fixed"],
  ["m-a-0", "m-0"],
]);

const neptuneUtilityMatcher = new RegExp(
  // Handles escapes via backslashes in raw template strings
  // https://exploringjs.com/impatient-js/ch_template-literals.html#template-strings-cooked-vs-raw
  `(^|\\s|\\\\[\\w{}]+)(${[...tailwindUtilityByNeptuneUtility.keys()].join(
    "|",
  )})($|\\s|\\\\[\\w{}]+)`,
  "gu",
);

function replaceUtilities(value: string) {
  let didTransform = false;

  const replaced = value.replace(
    neptuneUtilityMatcher,
    (substring, start: string, neptuneUtility: string, end: string) => {
      didTransform = true;
      const tailwindUtility =
        tailwindUtilityByNeptuneUtility.get(neptuneUtility);
      return tailwindUtility != null
        ? `${start}${tailwindUtility}${end}`
        : substring;
    },
  );

  return didTransform ? replaced : null;
}

const transform: Transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let didTransform = false;

  root.find(j.Literal).forEach((path) => {
    if (typeof path.node.value === "string") {
      const replaced = replaceUtilities(path.node.value);
      if (replaced != null) {
        didTransform = true;
        j(path).replaceWith(j.literal(replaced));
      }
    }
  });

  root.find(j.TemplateElement).forEach((path) => {
    if (path.node.value.cooked != null) {
      const replaced = replaceUtilities(path.node.value.cooked);
      if (replaced != null) {
        const rawReplaced = replaceUtilities(path.node.value.raw);
        if (rawReplaced != null) {
          didTransform = true;
          j(path).replaceWith(
            j.templateElement(
              { cooked: replaced, raw: rawReplaced },
              path.node.tail,
            ),
          );
        }
      }
    }
  });

  return didTransform ? root.toSource() : null;
};

export default transform;
