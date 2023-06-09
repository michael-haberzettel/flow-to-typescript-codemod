import { API, FileInfo } from "jscodeshift";

// Transformation des * en any pour typescript

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const elements = root.find(j.ExistsTypeAnnotation);

  elements.forEach((path) => {
    path.replace("any");
  });

  return root.toSource();
}
