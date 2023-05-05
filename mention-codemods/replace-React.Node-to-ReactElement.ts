import { API, FileInfo } from "jscodeshift";

// Transformation qui permet de transformer un React.Node -> React.ReactElement pour typescript

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const selectorsNamespacedReactNode = root.find(j.QualifiedTypeIdentifier, {
    qualification: { name: "React" },
    id: { name: "Node" },
  });

  selectorsNamespacedReactNode.forEach((path) => {
    // @ts-ignore
    path.replace("ReactElement");
  });

  return root.toSource();
}
