import core, { API, Collection, FileInfo } from 'jscodeshift'

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = 'flow'

function replaceNodeReactImport(root: Collection<any>, j: core.JSCodeshift) {
    let hasMatching = false
    const reactImports = root.find(j.ImportDeclaration, {
        importKind: 'value',
        source: { value: 'react' },
    })

    for (const reactImportsPaths of reactImports.paths()) {
        if (reactImportsPaths.value && reactImportsPaths.value.specifiers != null) {
            reactImportsPaths.value.specifiers.forEach((specifier) => {
                if (
                    specifier.type === 'ImportSpecifier' &&
                    specifier.local != null &&
                    specifier.local.name === 'Node'
                ) {
                    specifier.local.name = 'ReactElement'
                    hasMatching = true
                }
            })
        }
    }

    return hasMatching
}

export default function (file: FileInfo, api: API) {
    const j = api.jscodeshift
    const root = j(file.source)

    // Step 1 : rename types Node
    const selectors = root.find(j.Identifier, {
        name: 'Node',
    })

    if (replaceNodeReactImport(root, j)) {
        selectors.forEach((path) => {
            const Node = path.value
            Node.name = 'ReactElement'
        })
    }

    // Step 2 : rename types React$Node
    const selectorsInternalReactNode = root.find(j.Identifier, {
        name: 'React$Node',
    })

    selectorsInternalReactNode.forEach((path) => {
        const Node = path.value
        Node.name = 'React.ReactElement'
    })

    // Step 3 : rename types React.Node
    const selectorsNamespaceReactNode = root.find(j.Identifier, {
        name: 'React.Node',
    })

    selectorsNamespaceReactNode.forEach((path) => {
        const Node = path.value
        Node.name = 'React.ReactElement'
    })

    return root.toSource()
}
