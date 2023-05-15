// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

// Permet à partir du code flow d'ajouter un type générique par rapport à ce qui est utilisé dans un styled component

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  function extractAndBuildStringType(path, options) {
    const functionalProps = path.value.quasi.expressions
      .map((expr) => expr)
      .filter(
        (expr) =>
          expr.type === "CallExpression" &&
          expr.callee != null &&
          expr.callee.object != null &&
          expr.callee.object.name === "F" &&
          expr.callee.property != null &&
          expr.callee.property.name === "prop" &&
          expr.arguments.length > 0
      )
      .map((expr) => expr.arguments[0].value);

    const usedVarsComplex = path.value.quasi.expressions
      .map((expr) => expr)
      .filter(
        (expr) =>
          expr.type === "ArrowFunctionExpression" &&
          expr.params != null &&
          expr.params.length > 0 &&
          expr.body != null &&
          expr.body.type.includes("Expression")
      )
      .flatMap((e) => {
        const str = j(e.body).toSource();
        const regex = new RegExp(
          e.params[0].name + "\\.[^, }\\])\\[.-]+",
          "gm"
        );

        const matchingResult = str.match(regex) || [];

        return matchingResult
          .filter((s) => !s.includes("theme."))
          .map((s) => s.slice(e.params[0].name.length + 1));
      });

    const usedVars = path.value.quasi.expressions
      .map((expr) => expr)
      .filter(
        (expr) =>
          expr.type === "ArrowFunctionExpression" &&
          expr.params != null &&
          expr.params.length > 0 &&
          expr.body != null &&
          expr.body.type === "TemplateLiteral"
      )
      .flatMap((e) => {
        const str = j(e.body).toSource();
        const regex = new RegExp(
          e.params[0].name + "\\.[^, }\\])\\[.-]+",
          "gm"
        );

        const matchingResult = str.match(regex) || [];

        return matchingResult
          .filter((s) => !s.includes("theme."))
          .map((s) => s.slice(e.params[0].name.length + 1));
      });

    const destructuredVars = path.value.quasi.expressions
      .map((expr) => expr)
      .filter(
        (expr) =>
          expr.type === "ArrowFunctionExpression" &&
          expr.params != null &&
          expr.params.length > 0 &&
          expr.params[0].properties != null
      )
      .flatMap((e) => e.params[0].properties.map((p) => p.key.name));

    const extractedTypes = new Set([
      ...functionalProps,
      ...usedVars,
      ...usedVarsComplex,
      ...destructuredVars,
    ]);
    const extractedType = Array.from(extractedTypes)
      .filter((t) => options.isNativeElement || t.startsWith("$"))
      .map((t) => t + ": any")
      .join(", ");

    return extractedType;
  }

  // Detection of styled.div`` styled.span` span.section`, etc.
  root
    .find(j.TaggedTemplateExpression)
    .filter(
      (el) =>
        el.value.tag.object != null && el.value.tag.object.name === "styled"
    )
    .filter(
      (el) =>
        el.value.quasi.expressions != null &&
        el.value.quasi.expressions.length > 0
    )
    .forEach((path) => {
      const extractedType = extractAndBuildStringType(path, {
        isNativeElement: true,
      });

      if (extractedType.length > 0) {
        path.value.tag.property.name =
          path.value.tag.property.name + `<{ ${extractedType} }>`;
      }
    });

  // Detection of styled(Component1)`` styled(Component2)`` etc.
  root
    .find(j.TaggedTemplateExpression)
    .filter(
      (el) =>
        el.value.tag.callee != null && el.value.tag.callee.name === "styled"
    )
    .filter(
      (el) =>
        el.value.quasi.expressions != null &&
        el.value.quasi.expressions.length > 0
    )
    .forEach((path) => {
      const extractedType = extractAndBuildStringType(path, {
        isNativeElement: false,
      });

      if (extractedType.length > 0) {
        const styledComponentWithGeneric = j.binaryExpression(
          ">",
          j.binaryExpression(
            "<",
            path.value.tag,
            j.identifier(`{ ${extractedType} }`)
          ),
          path.value.quasi
        );
        path.replace(styledComponentWithGeneric);
      }
    });

  return root.toSource();
}
