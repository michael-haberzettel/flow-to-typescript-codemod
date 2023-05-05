import { API, FileInfo } from "jscodeshift";

// Transformation de test qui permet de renommer une variable

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;

  const root = j(file.source);

  const variableDeclarators = root.findVariableDeclarators("maxHeight");

  variableDeclarators.renameTo("bar");

  return root.toSource();
}
