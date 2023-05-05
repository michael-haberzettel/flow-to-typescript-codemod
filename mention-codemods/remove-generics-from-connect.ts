import { API, FileInfo } from "jscodeshift";

// Permet de supprimer les génériques sur le HoC connect car typescript n'en a pas besoin

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const connects = root.find(j.VariableDeclarator, {
    init: { callee: { callee: { name: "connect" } } },
  });

  connects.forEach((path) => {
    const Node = path.value;
    Node.id.typeAnnotation = null;
    Node.init.callee.typeArguments = null;
  });

  return root.toSource();
}
