import type { API, Collection, Transform } from "jscodeshift";

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
  // TODO: body-1, body-2, body-3, small, tiny
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
  ["flex-nowrap", "flex-nowrap"],
  ["flex-nowrap--sm", "sm:flex-nowrap"],
  ["flex-nowrap--md", "md:flex-nowrap"],
  ["flex-nowrap--lg", "lg:flex-nowrap"],
  ["flex-nowrap--xl", "xl:flex-nowrap"],
  ["flex-row", "flex-row"],
  ["flex-row--sm", "sm:flex-row"],
  ["flex-row--md", "md:flex-row"],
  ["flex-row--lg", "lg:flex-row"],
  ["flex-row--xl", "xl:flex-row"],
  ["flex-wrap", "flex-wrap"],
  ["flex-wrap--sm", "sm:flex-wrap"],
  ["flex-wrap--md", "md:flex-wrap"],
  ["flex-wrap--lg", "lg:flex-wrap"],
  ["flex-wrap--xl", "xl:flex-wrap"],
  ["font-italic", "italic"],
  ["font-weight-bold", "font-bold"], // TODO: Consider `font-extrabold`
  ["font-weight-normal", "font-normal"],
  ["font-weight-semi-bold", "font-semibold"],
  ["gap-y-1", "gap-y-2"],
  ["hidden", "hidden"],
  ["hidden-xs", "max-sm:hidden"],
  ["hidden-sm", "sm:max-md:hidden"],
  ["hidden-md", "md:max-lg:hidden"],
  ["hidden-lg", "lg:max-xl:hidden"],
  ["hidden-xl", "xl:hidden"],
  ["hide", "hidden"],
  ["img-circle", "rounded-full"],
  ["img-rounded", "rounded"],
  ["invisible", "invisible"],
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
  ["m-a-0", "m-0"],
  ["m-a-1", "m-2"],
  ["m-a-2", "m-4"],
  ["m-a-3", "m-6"],
  ["m-a-4", "m-8"],
  ["m-a-5", "m-10"],
  ["m-b-0", "mb-0"],
  ["m-b-1", "mb-2"],
  ["m-b-2", "mb-4"],
  ["m-b-3", "mb-6"],
  ["m-b-4", "mb-8"],
  ["m-b-5", "mb-10"],
  ["m-l-0", "ms-0"],
  ["m-l-1", "ms-2"],
  ["m-l-2", "ms-4"],
  ["m-l-3", "ms-6"],
  ["m-l-4", "ms-8"],
  ["m-l-5", "ms-10"],
  ["m-l-auto", "ms-auto"],
  ["m-r-0", "me-0"],
  ["m-r-1", "me-2"],
  ["m-r-2", "me-4"],
  ["m-r-3", "me-6"],
  ["m-r-4", "me-8"],
  ["m-r-5", "me-10"],
  ["m-r-auto", "me-auto"],
  ["m-t-0", "mt-0"],
  ["m-t-1", "mt-2"],
  ["m-t-2", "mt-4"],
  ["m-t-3", "mt-6"],
  ["m-t-4", "mt-8"],
  ["m-t-5", "mt-10"],
  ["m-x-0", "mx-0"],
  ["m-x-1", "mx-2"],
  ["m-x-2", "mx-4"],
  ["m-x-3", "mx-6"],
  ["m-x-4", "mx-8"],
  ["m-x-5", "mx-10"],
  ["m-x-auto", "mx-auto"],
  ["m-y-0", "my-0"],
  ["m-y-1", "my-2"],
  ["m-y-2", "my-4"],
  ["m-y-3", "my-6"],
  ["m-y-4", "my-8"],
  ["m-y-5", "my-10"],
  // TODO: np-text-body-default, np-text-body-default-bold, np-text-body-large, np-text-body-large-bold, np-text-display-extra-large, np-text-display-large, np-text-display-medium, np-text-display-number, np-text-display-small, np-text-link-default, np-text-link-large, np-text-title-body, np-text-title-group, np-text-title-screen, np-text-title-section, np-text-title-subsection
  ["order-0", "order-none"],
  ["order-0--sm", "sm:order-none"],
  ["order-0--md", "md:order-none"],
  ["order-0--lg", "lg:order-none"],
  ["order-0--xl", "xl:order-none"],
  ["order-1", "order-1"],
  ["order-1--sm", "sm:order-1"],
  ["order-1--md", "md:order-1"],
  ["order-1--lg", "lg:order-1"],
  ["order-1--xl", "xl:order-1"],
  ["order-2", "order-2"],
  ["order-2--sm", "sm:order-2"],
  ["order-2--md", "md:order-2"],
  ["order-2--lg", "lg:order-2"],
  ["order-2--xl", "xl:order-2"],
  ["order-3", "order-3"],
  ["order-3--sm", "sm:order-3"],
  ["order-3--md", "md:order-3"],
  ["order-3--lg", "lg:order-3"],
  ["order-3--xl", "xl:order-3"],
  ["p-a-0", "p-0"],
  ["p-a-1", "p-2"],
  ["p-a-2", "p-4"],
  ["p-a-3", "p-6"],
  ["p-a-4", "p-8"],
  ["p-a-5", "p-10"],
  ["p-b-0", "pb-0"],
  ["p-b-1", "pb-2"],
  ["p-b-2", "pb-4"],
  ["p-b-3", "pb-6"],
  ["p-b-4", "pb-8"],
  ["p-b-5", "pb-10"],
  ["p-l-0", "ps-0"],
  ["p-l-1", "ps-2"],
  ["p-l-2", "ps-4"],
  ["p-l-3", "ps-6"],
  ["p-l-4", "ps-8"],
  ["p-l-5", "ps-10"],
  ["p-r-0", "pe-0"],
  ["p-r-1", "pe-2"],
  ["p-r-2", "pe-4"],
  ["p-r-3", "pe-6"],
  ["p-r-4", "pe-8"],
  ["p-r-5", "pe-10"],
  ["p-t-0", "pt-0"],
  ["p-t-1", "pt-2"],
  ["p-t-2", "pt-4"],
  ["p-t-3", "pt-6"],
  ["p-t-4", "pt-8"],
  ["p-t-5", "pt-10"],
  ["p-x-0", "px-0"],
  ["p-x-1", "px-2"],
  ["p-x-2", "px-4"],
  ["p-x-3", "px-6"],
  ["p-x-4", "px-8"],
  ["p-x-5", "px-10"],
  ["p-y-0", "py-0"],
  ["p-y-1", "py-2"],
  ["p-y-2", "py-4"],
  ["p-y-3", "py-6"],
  ["p-y-4", "py-8"],
  ["p-y-5", "py-10"],
  ["pull-left", "float-start"],
  ["pull-xs-left", "float-start"],
  ["pull-sm-left", "sm:float-start"],
  ["pull-md-left", "md:float-start"],
  ["pull-lg-left", "lg:float-start"],
  ["pull-xl-left", "xl:float-start"],
  ["pull-left-single-direction", "float-left"],
  ["pull-xs-none", "float-none"],
  ["pull-sm-none", "sm:float-none"],
  ["pull-md-none", "md:float-none"],
  ["pull-lg-none", "lg:float-none"],
  ["pull-xl-none", "xl:float-none"],
  ["pull-right", "float-end"],
  // TODO: pull-xs-right
  ["pull-sm-right", "sm:float-end"],
  ["pull-md-right", "md:float-end"],
  ["pull-lg-right", "lg:float-end"],
  ["pull-xl-right", "xl:float-end"],
  ["pull-right-single-direction", "float-right"],
  ["rotate90", "rotate-90"],
  ["rotate180", "rotate-180"],
  ["rotate270", "-rotate-90"],
  ["rotate-90", "-rotate-90"],
  ["rounded-sm", "rounded-xs"],
  ["show", "block"],
  ["sr-only-focusable", "focus:not-sr-only"],
  ["text-accent", "text-interactive-primary"],
  ["text-capitalize", "capitalize"],
  ["text-danger", "text-sentiment-negative"],
  ["text-ellipses", "truncate"],
  ["text-ellipsis", "truncate"],
  ["text-info", "text-interactive-primary"],
  ["text-xs-center", "text-center"],
  ["text-sm-center", "sm:text-center"],
  ["text-md-center", "md:text-center"],
  ["text-lg-center", "lg:text-center"],
  ["text-xl-center", "xl:text-center"],
  ["text-xs-justify", "text-justify"],
  ["text-sm-justify", "sm:text-justify"],
  ["text-md-justify", "md:text-justify"],
  ["text-lg-justify", "lg:text-justify"],
  ["text-xl-justify", "xl:text-justify"],
  ["text-xs-left", "text-start"],
  ["text-sm-left", "sm:text-start"],
  ["text-md-left", "md:text-start"],
  ["text-lg-left", "lg:text-start"],
  ["text-xl-left", "xl:text-start"],
  ["text-xs-nowrap", "whitespace-nowrap"],
  ["text-sm-nowrap", "sm:whitespace-nowrap"],
  ["text-md-nowrap", "md:whitespace-nowrap"],
  ["text-lg-nowrap", "lg:whitespace-nowrap"],
  ["text-xl-nowrap", "xl:whitespace-nowrap"],
  ["text-xs-right", "text-end"],
  ["text-sm-right", "sm:text-end"],
  ["text-md-right", "md:text-end"],
  ["text-lg-right", "lg:text-end"],
  ["text-xl-right", "xl:text-end"],
  ["text-lowercase", "lowercase"],
  // TODO: ["text-max-width", "max-w-prose"],
  ["text-muted", "text-content-tertiary"],
  ["text-negative", "text-sentiment-negative"],
  ["text-no-decoration", "no-underline"],
  ["text-positive", "text-sentiment-positive"],
  ["text-primary", "text-content-primary"],
  ["text-secondary", "text-content-secondary"],
  ["text-success", "text-sentiment-positive"],
  ["text-underline", "underline underline-offset-2"],
  ["text-uppercase", "uppercase"],
  // TODO: `text-warning` (only as a bg with `text-content-primary`)
  ["text-word-break", "break-words"], // Not a 1:1 mapping
  ["visible-xs", "hidden max-sm:block"],
  ["visible-sm", "hidden sm:max-md:block"],
  ["visible-md", "hidden md:max-lg:block"],
  ["visible-lg", "hidden lg:max-xl:block"],
  ["visible-xl", "hidden xl:block"],
  ["visible-xs-block", "hidden max-sm:block"],
  ["visible-sm-block", "hidden sm:max-md:block"],
  ["visible-md-block", "hidden md:max-lg:block"],
  ["visible-lg-block", "hidden lg:max-xl:block"],
  ["visible-xl-block", "hidden xl:block"],
  ["visible-xs-inline", "hidden max-sm:inline"],
  ["visible-sm-inline", "hidden sm:max-md:inline"],
  ["visible-md-inline", "hidden md:max-lg:inline"],
  ["visible-lg-inline", "hidden lg:max-xl:inline"],
  ["visible-xl-inline", "hidden xl:inline"],
  ["visible-xs-inline-block", "hidden max-sm:inline-block"],
  ["visible-sm-inline-block", "hidden sm:max-md:inline-block"],
  ["visible-md-inline-block", "hidden md:max-lg:inline-block"],
  ["visible-lg-inline-block", "hidden lg:max-xl:inline-block"],
  ["visible-xl-inline-block", "hidden xl:inline-block"],
]);

const neptuneUtilityMatcher = new RegExp(
  // Handles escapes via backslashes in raw template strings
  // https://exploringjs.com/impatient-js/ch_template-literals.html#template-strings-cooked-vs-raw
  `(^|\\s|\\\\[\\w{}]+)(${[...tailwindUtilityByNeptuneUtility.keys()].join(
    "|",
  )})(?=$|\\s|\\\\[\\w{}])`,
  "gmu",
);

const classAttributes = [/^class(?:Name)?$/u, /Class/u];
const classConcatFunctions = ["clsx", "classNames", "classnames", "cva", "cx"];

function replaceUtilities(value: string) {
  let didTransform = false;

  const replaced = value.replace(
    neptuneUtilityMatcher,
    (substring, start: string, neptuneUtility: string) => {
      const tailwindUtility =
        tailwindUtilityByNeptuneUtility.get(neptuneUtility);
      if (tailwindUtility != null) {
        didTransform = true;
        return `${start}${tailwindUtility}`;
      }
      return substring;
    },
  );

  return didTransform ? replaced : null;
}

function replaceNodes(root: Collection, api: API) {
  const j = api.jscodeshift;

  let didTransform = false;

  root.find(j.StringLiteral).forEach((path) => {
    const replaced = replaceUtilities(path.node.value);
    if (replaced != null) {
      didTransform = true;
      j(path).replaceWith(j.stringLiteral(replaced));
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

  root.find(j.ObjectProperty).forEach((path) => {
    if (path.node.key.type === "Identifier") {
      const replaced = replaceUtilities(path.node.key.name);
      if (replaced != null) {
        didTransform = true;
        j(path).replaceWith(
          j.objectProperty(j.stringLiteral(replaced), path.node.value),
        );
      }
    } else if (replaceNodes(j(path.node.key), api)) {
      didTransform = true;
    }
  });

  return didTransform;
}

const transform: Transform = (fileInfo, api) => {
  const j = api.jscodeshift;
  const root = j(fileInfo.source);

  let didTransform = false;

  root
    .find(j.JSXAttribute, (node) => {
      const attributeName = node.name.name;
      if (typeof attributeName === "string") {
        return (
          classAttributes.find((attribute) => attribute.test(attributeName)) !=
          null
        );
      }
      return false;
    })
    .forEach((path) => {
      if (replaceNodes(j(path), api)) {
        didTransform = true;
      }
    });

  root
    .find(j.CallExpression, (node) => {
      if (node.callee.type === "Identifier") {
        return classConcatFunctions.includes(node.callee.name);
      }
      return false;
    })
    .forEach((path) => {
      if (replaceNodes(j(path), api)) {
        didTransform = true;
      }
    });

  root
    .find(j.TaggedTemplateExpression, (node) => {
      if (node.tag.type === "Identifier") {
        return classConcatFunctions.includes(node.tag.name);
      }
      return false;
    })
    .forEach((path) => {
      if (replaceNodes(j(path), api)) {
        didTransform = true;
      }
    });

  return didTransform ? root.toSource() : null;
};

export const parser = "tsx";

export default transform;
