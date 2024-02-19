import type { Transform } from "jscodeshift";

const tailwindUtilityByNeptuneUtility = new Map([
  ["affix", "fixed"],
  ["align-items-baseline", "items-baseline"],
  ["align-items-baseline--sm", "sm:items-baseline"],
  ["align-items-baseline--md", "md:items-baseline"],
  ["align-items-baseline--lg", "lg:items-baseline"],
  ["align-items-baseline--xl", "xl:items-baseline"],
  ["align-items-center", "items-center"],
  ["align-items-center--sm", "sm:items-center"],
  ["align-items-center--md", "md:items-center"],
  ["align-items-center--lg", "lg:items-center"],
  ["align-items-center--xl", "xl:items-center"],
  ["align-items-end", "items-end"],
  ["align-items-end--sm", "sm:items-end"],
  ["align-items-end--md", "md:items-end"],
  ["align-items-end--lg", "lg:items-end"],
  ["align-items-end--xl", "xl:items-end"],
  ["align-items-start", "items-start"],
  ["align-items-start--sm", "sm:items-start"],
  ["align-items-start--md", "md:items-start"],
  ["align-items-start--lg", "lg:items-start"],
  ["align-items-start--xl", "xl:items-start"],
  ["align-items-stretch", "items-stretch"],
  ["align-items-stretch--sm", "sm:items-stretch"],
  ["align-items-stretch--md", "md:items-stretch"],
  ["align-items-stretch--lg", "lg:items-stretch"],
  ["align-items-stretch--xl", "xl:items-stretch"],
  ["align-self-baseline", "self-baseline"],
  ["align-self-baseline--sm", "sm:self-baseline"],
  ["align-self-baseline--md", "md:self-baseline"],
  ["align-self-baseline--lg", "lg:self-baseline"],
  ["align-self-baseline--xl", "xl:self-baseline"],
  ["align-self-center", "self-center"],
  ["align-self-center--sm", "sm:self-center"],
  ["align-self-center--md", "md:self-center"],
  ["align-self-center--lg", "lg:self-center"],
  ["align-self-center--xl", "xl:self-center"],
  ["align-self-end", "self-end"],
  ["align-self-end--sm", "sm:self-end"],
  ["align-self-end--md", "md:self-end"],
  ["align-self-end--lg", "lg:self-end"],
  ["align-self-end--xl", "xl:self-end"],
  ["align-self-start", "self-start"],
  ["align-self-start--sm", "sm:self-start"],
  ["align-self-start--md", "md:self-start"],
  ["align-self-start--lg", "lg:self-start"],
  ["align-self-start--xl", "xl:self-start"],
  ["align-self-stretch", "self-stretch"],
  ["align-self-stretch--sm", "sm:self-stretch"],
  ["align-self-stretch--md", "md:self-stretch"],
  ["align-self-stretch--lg", "lg:self-stretch"],
  ["align-self-stretch--xl", "xl:self-stretch"],
  // TODO: body-1, body-2, body-3
  ["center-block", "mx-auto block"],
  ["clickable", "cursor-pointer"],
  ["d-block", "block"],
  ["d-flex", "flex"],
  ["d-flex--sm", "sm:flex"],
  ["d-flex--md", "md:flex"],
  ["d-flex--lg", "lg:flex"],
  ["d-flex--xl", "xl:flex"],
  ["d-inline", "inline"],
  ["d-inline-block", "inline-block"],
  ["d-inline-flex", "inline-flex"],
  ["d-inline-flex--sm", "sm:inline-flex"],
  ["d-inline-flex--md", "md:inline-flex"],
  ["d-inline-flex--lg", "lg:inline-flex"],
  ["d-inline-flex--xl", "xl:inline-flex"],
  // TODO: display-1, display-2, display-3, display-4, display-5
  ["flex-column", "flex-col"],
  ["flex-column--sm", "sm:flex-col"],
  ["flex-column--md", "md:flex-col"],
  ["flex-column--lg", "lg:flex-col"],
  ["flex-column--xl", "xl:flex-col"],
  ["flex-grow-1", "grow"],
  ["flex-grow-1--sm", "sm:grow"],
  ["flex-grow-1--md", "md:grow"],
  ["flex-grow-1--lg", "lg:grow"],
  ["flex-grow-1--xl", "xl:grow"],
  ["flex-nowrap--sm", "sm:flex-nowrap"],
  ["flex-nowrap--md", "md:flex-nowrap"],
  ["flex-nowrap--lg", "lg:flex-nowrap"],
  ["flex-nowrap--xl", "xl:flex-nowrap"],
  ["flex-row", "flex-row"],
  ["flex-row--sm", "sm:flex-row"],
  ["flex-row--md", "md:flex-row"],
  ["flex-row--lg", "lg:flex-row"],
  ["flex-row--xl", "xl:flex-row"],
  ["flex-wrap--sm", "sm:flex-wrap"],
  ["flex-wrap--md", "md:flex-wrap"],
  ["flex-wrap--lg", "lg:flex-wrap"],
  ["flex-wrap--xl", "xl:flex-wrap"],
  ["font-italic", "italic"],
  ["font-weight-bold", "font-bold"], // TODO: Consider `font-extrabold`
  ["font-weight-normal", "font-normal"],
  ["font-weight-semi-bold", "font-semibold"],
  ["gap-y-1", "gap-y-2"],
  ["hidden-xs", "max-sm:hidden"],
  ["hidden-sm", "sm:max-md:hidden"],
  ["hidden-md", "md:max-lg:hidden"],
  ["hidden-lg", "lg:max-xl:hidden"],
  ["hidden-xl", "xl:hidden"],
  ["hide", "hidden"],
  ["img-circle", "rounded-full"],
  ["img-rounded", "rounded"],
  ["justify-content-around", "justify-around"],
  ["justify-content-around--sm", "sm:justify-around"],
  ["justify-content-around--md", "md:justify-around"],
  ["justify-content-around--lg", "lg:justify-around"],
  ["justify-content-around--xl", "xl:justify-around"],
  ["justify-content-between", "justify-between"],
  ["justify-content-between--sm", "sm:justify-between"],
  ["justify-content-between--md", "md:justify-between"],
  ["justify-content-between--lg", "lg:justify-between"],
  ["justify-content-between--xl", "xl:justify-between"],
  ["justify-content-center", "justify-center"],
  ["justify-content-center--sm", "sm:justify-center"],
  ["justify-content-center--md", "md:justify-center"],
  ["justify-content-center--lg", "lg:justify-center"],
  ["justify-content-center--xl", "xl:justify-center"],
  ["justify-content-end", "justify-end"],
  ["justify-content-end--sm", "sm:justify-end"],
  ["justify-content-end--md", "md:justify-end"],
  ["justify-content-end--lg", "lg:justify-end"],
  ["justify-content-end--xl", "xl:justify-end"],
  ["justify-content-start", "justify-start"],
  ["justify-content-start--sm", "sm:justify-start"],
  ["justify-content-start--md", "md:justify-start"],
  ["justify-content-start--lg", "lg:justify-start"],
  ["justify-content-start--xl", "xl:justify-start"],
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
