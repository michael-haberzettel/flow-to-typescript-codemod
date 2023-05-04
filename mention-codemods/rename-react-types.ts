import { API, FileInfo } from "jscodeshift";

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

export const ReactTypes = {
  Node: "ReactElement",
  Child: "ReactChild",
  Children: "ReactChildren",
  Text: "ReactText",
  Fragment: "ReactFragment",
  FragmentType: "ComponentType",
  Portal: "ReactPortal",
  NodeArray: "ReactNodeArray",
  ElementProps: "ComponentProps",
  StatelessFunctionalComponent: `FC`,
} as const;

export const SyntheticEvents = {
  SyntheticEvent: "React.SyntheticEvent",
  SyntheticAnimationEvent: "React.AnimationEvent",
  SyntheticCompositionEvent: "React.CompositionEvent",
  SyntheticClipboardEvent: "React.ClipboardEvent",
  SyntheticUIEvent: "React.UIEvent",
  SyntheticFocusEvent: "React.FocusEvent",
  SyntheticKeyboardEvent: "React.KeyboardEvent",
  SyntheticMouseEvent: "React.MouseEvent",
  SyntheticDragEvent: "React.DragEvent",
  SyntheticWheelEvent: "React.WheelEvent",
  SyntheticPointerEvent: "React.PointerEvent",
  SyntheticTouchEvent: "React.TouchEvent",
  SyntheticTransitionEvent: "React.TransitionEvent",
} as const;

const AllTypes = {
  ...ReactTypes,
  ...SyntheticEvents,
};

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const reactImports = root
    .find(j.ImportDeclaration)
    .filter((path) => path.node.source.value === "react");

  reactImports.forEach((importSpecifierPath) => {
    const importSpecifier = importSpecifierPath.value;
    importSpecifier.specifiers.forEach((specifier) => {
      if (specifier.imported == null) {
        return;
      }
      const specifierName = specifier.imported.name;

      if (
        specifier.importKind === "type" &&
        Object.keys(AllTypes).includes(specifierName)
      ) {
        const reactImports = root
          .find(j.GenericTypeAnnotation, { id: { name: specifierName } })
          .forEach((path) => (path.value.id.name = AllTypes[specifierName]));
      }
    });
  });

  return root.toSource();
}
