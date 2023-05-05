import { API, FileInfo } from "jscodeshift";

// Permet d'ajouter le namespace React. devant les types utilisés dans la codebase

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

function prefixReactType(root, j, specifierName) {
  const identifiers = root.find(j.GenericTypeAnnotation, {
    id: { name: specifierName },
  });
  identifiers.forEach((identifierPath) => {
    const newNode = j.genericTypeAnnotation(
      j.qualifiedTypeIdentifier(
        j.identifier("React"),
        j.identifier(specifierName)
      ),
      null
    );
    newNode.typeParameters = identifierPath.value.typeParameters;
    identifierPath.replace(newNode);
  });
}

const typesToPrefix = [
  "Node",
  "ComponentType",
  "Component",
  "AbstractComponent",
  "ElementRef",
  "ElementType",
];

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
        typesToPrefix.includes(specifierName)
      ) {
        prefixReactType(root, j, specifierName);

        // importSpecifier.specifiers = importSpecifier.specifiers.filter(
        //     (spec) => spec.imported.name !== specifierName
        // )
      }
    });
  });

  return root.toSource();
}
