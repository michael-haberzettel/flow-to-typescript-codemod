// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

// Permet de caster tous les JSON.parse avec du any pour éviter plein d'erreurs typescript lors de la conversion.

export default function (file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const selectors = root
    .find(j.CallExpression, {
      callee: { object: { name: "JSON" } },
    })
    .filter((el) => el.value.callee.property.name === "parse");

  selectors.forEach((path) => {
    const anyCastExpression = j.typeCastExpression(
      path.value,
      j.typeAnnotation(j.anyTypeAnnotation())
    );
    path.replace(anyCastExpression);
  });

  return root.toSource();
}
