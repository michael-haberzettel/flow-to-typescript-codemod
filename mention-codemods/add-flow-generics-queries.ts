import { namedTypes } from "ast-types";
import core, {
  API,
  ASTPath,
  Collection,
  FileInfo,
  TaggedTemplateExpression,
} from "jscodeshift";

// Permet d'ajouter les génériques aux hooks de relay s'ils ne sont pas renseignés.
// WIP.

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

function addMissingTypeImport(
  root: Collection<any>,
  j: core.JSCodeshift,
  importTypeName: string
) {
  const imports = root.find(j.ImportSpecifier, {
    local: { name: importTypeName },

    // @ts-ignore: field importKind exists
    importKind: "type",
  });

  if (imports.length === 0) {
    const importType = j.importSpecifier({
      type: "Identifier",
      name: importTypeName,
    });

    // @ts-ignore: field importKind exists
    importType.importKind = "type";
    const newImport = j.importDeclaration(
      [importType],
      {
        type: "Literal",
        value: `__generated__/${importTypeName}.graphql`,
      },
      "value"
    );

    root.find(j.ImportDeclaration).at(1).insertBefore(newImport);
  }
}

function extractQueryNameFromTemplateLiteral(
  queryTemplateLiteral: namedTypes.TaggedTemplateExpression | null
) {
  const queryNameResult =
    queryTemplateLiteral?.quasi?.quasis[0].value.raw.match(
      /query (?<queryName>[^ ]+)/
    );
  const queryName =
    queryNameResult != null && queryNameResult.groups != null
      ? queryNameResult.groups["queryName"]
      : "EXTRACTION_ERROR";
  return queryName;
}

export default function (file: FileInfo, api: API) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const useLazyLoadQueries = root.find(j.CallExpression, {
    callee: { name: "useLazyLoadQuery" },
  });

  useLazyLoadQueries.forEach((useLazyLoadQueryPath) => {
    const useLazyLoadQueryNode = useLazyLoadQueryPath.value;

    const addGenericAndMissingImport = (
      queryTemplateLiteralString: namedTypes.TaggedTemplateExpression | null
    ) => {
      const queryName = extractQueryNameFromTemplateLiteral(
        queryTemplateLiteralString
      );

      // Add generic to useLazyLoadQuery hook
      const genericsToSpecify = j.typeParameterInstantiation([]);
      const genericQueryType = j.genericTypeAnnotation(
        j.identifier(queryName),
        null
      );
      genericsToSpecify.params = [genericQueryType];
      useLazyLoadQueryNode.typeArguments = genericsToSpecify;

      // Add missing import
      addMissingTypeImport(root, j, queryName);
    };

    if (useLazyLoadQueryNode.arguments[0].type === "Identifier") {
      const queriesVariables = root.find(j.VariableDeclarator, {
        id: { name: useLazyLoadQueryNode.arguments[0].name },
      });

      queriesVariables.forEach((queryVariablePath) => {
        addGenericAndMissingImport(
          queryVariablePath.value.init as TaggedTemplateExpression | null
        );
      });
    } else if (
      useLazyLoadQueryNode.arguments[0].type === "TaggedTemplateExpression"
    ) {
      addGenericAndMissingImport(useLazyLoadQueryNode.arguments[0]);
    }
  });

  return root.toSource();
}
