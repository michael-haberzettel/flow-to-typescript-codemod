import { API, FileInfo } from 'jscodeshift'

// jscodeshift can take a parser, like "babel", "babylon", "flow", "ts", or "tsx"
// Read more: https://github.com/facebook/jscodeshift#parser
export const parser = 'flow'

export default function (file: FileInfo, api: API) {
    const j = api.jscodeshift
    const root = j(file.source)

    const underscoreTypes = root
        .find(j.GenericTypeAnnotation, {
            id: { name: '_' },
        })
        .paths()

    underscoreTypes.forEach((path) => {
        const Node = path.value

        // @ts-ignore
        Node.id.name = 'any'
    })

    return root.toSource()
}
