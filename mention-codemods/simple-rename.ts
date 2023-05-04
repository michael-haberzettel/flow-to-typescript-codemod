import { API, FileInfo } from 'jscodeshift'

export default function (file: FileInfo, api: API) {
    const j = api.jscodeshift

    const root = j(file.source)

    const variableDeclarators = root.findVariableDeclarators('maxHeight')

    variableDeclarators.renameTo('bar')

    return root.toSource()
}
