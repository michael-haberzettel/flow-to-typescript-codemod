import { API, FileInfo } from "jscodeshift";

// Permet d'inverser les génériques dans la fonction fowardRef de react (l'ordre des génériques est inversé entre flow et typescript)

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const forwardRefs = root.find(j.Identifier, {
    name: "forwardRef",
  });

  forwardRefs.forEach((path) => {
    const callExpression = path.parent.value;

    if (
      callExpression.typeArguments != null &&
      callExpression.typeArguments.params != null &&
      callExpression.typeArguments.params.length === 2
    ) {
      const firstGenericName = callExpression.typeArguments.params[0].id.name;
      callExpression.typeArguments.params[0].id.name =
        callExpression.typeArguments.params[1].id.name;
      callExpression.typeArguments.params[1].id.name = firstGenericName;
    }
  });

  return root.toSource();
}
