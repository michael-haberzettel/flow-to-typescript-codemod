// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

// Permet de supprimer les types OutputSelector qui n'existent qu'en flow et de laisser l'inférence typescript se faire

// Press ctrl+space for code completion
export default function (file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const selectors = root.find(j.Identifier, {
    typeAnnotation: { typeAnnotation: { id: { name: "OutputSelector" } } },
  });

  selectors.forEach((path) => {
    const Node = path.value;

    Node.typeAnnotation = null;
  });

  return root.toSource();
}
