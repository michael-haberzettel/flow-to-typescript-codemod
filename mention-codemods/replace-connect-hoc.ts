// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = "flow";

// Transformation de test qui essaye de transformer le HoC connect vers un composant fonctionnel avec les hooks de redux
// WIP

// Press ctrl+space for code completion
export default function transformer(file, api) {
  const j = api.jscodeshift;
  const root = j(file.source);

  const connects = root.find(j.VariableDeclarator, {
    init: { callee: { callee: { name: "connect" } } },
  });

  connects.forEach((path) => {
    const Parent = path.parent.parent;
    const Node = path.value;

    const componentName = Node.id.name;
    const childComponentName = Node.init.arguments[0].name;

    let stateToProps = null;
    if (Node.init.callee.arguments.length > 0) {
      stateToProps = Node.init.callee.arguments[0].name;
    }

    let actionsToProps = null;
    let dispachActions = "";
    if (Node.init.callee.arguments.length > 1) {
      actionsToProps = Node.init.callee.arguments[1].name;

      root
        .find(j.VariableDeclarator, {
          init: { body: { callee: { name: "bindActionCreators" } } },
        })
        .forEach((v) => {
          const objExpression = v.value.init.body.arguments[0].properties;

          objExpression.forEach((property) => {
            const key = property.key.name;
            const val = property.value.name;

            dispachActions += `${key}: (...args) => dispatch(${val}(...args)),`;
          });
        });
    }

    let dispatch = "";
    if (dispachActions !== "") {
      dispatch = `
			const dispatch = useDispatch()

            const dispatchActions = useMemo(
              () => ({
				${dispachActions}
              }),
              [dispatch]
			)
		`;
    }

    Parent.replace(`

      type ${componentName}Props = {

      }

      export const ${componentName} = (props : ${componentName}Props) => {
          const storeData = useMentionSelector(${stateToProps})
          ${dispatch}

          return (
            <${childComponentName} 
               {...props}
               {...storeData} 
               ${dispatch != null ? "{...dispatchActions}" : ""}
              />
		  )
      }`);
  });

  return root.toSource();
}
