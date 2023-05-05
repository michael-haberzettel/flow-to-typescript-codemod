import { API, FileInfo } from "jscodeshift";

// Permet d'ajouter une virgule après les génériques.
// Cela permet d'éviter l'ambiguité dans les fichiers tsx avec l'ouverture d'un composant.

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const elements = root
    .find(j.TypeParameterInstantiation)
    .filter((el) => el.value.params != null && el.value.params.length > 0);

  elements.forEach((identifierPath) => {
    identifierPath.value.params.push("");
  });

  const elements2 = root
    .find(j.TypeParameterDeclaration)
    .filter((el) => el.value.params != null && el.value.params.length > 0);

  elements2.forEach((identifierPath) => {
    identifierPath.value.params.push("");
  });

  return root.toSource();
}
