// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = 'flow'

// Press ctrl+space for code completion
export default function (file, api) {
    const j = api.jscodeshift
    const root = j(file.source)

    const erf = root.find(j.CallExpression, {
        callee: { name: 'useLazyLoadQuery' },
    })

    erf.forEach((path) => {
        const Node = path.value

        Node.typeArguments = null
    })
    //const variableDeclarators = root.find(ttt)
    console.log(erf)

    return root.toSource()
}
