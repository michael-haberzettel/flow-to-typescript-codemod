import {
    API,
    FileInfo,
    QualifiedTypeIdentifier,
    Identifier,
    GenericTypeAnnotation,
} from 'jscodeshift'

export default function (file: FileInfo, api: API) {
    const j = api.jscodeshift
    const root = j(file.source)

    const erf = root.find(j.GenericTypeAnnotation, {
        id: {
            qualification: {
                name: 'React',
            },
            id: {
                name: 'ComponentType',
            },
        },
    })

    erf.forEach((path) => {
        const Node = path.value
        const qualifiedIdentifier = Node.id as QualifiedTypeIdentifier
        qualifiedIdentifier.id.name = 'ComponentTypeddds'

        const generics = Node.typeParameters?.params as GenericTypeAnnotation[]
        if (generics.length > 0) {
            const id = generics[0].id as Identifier
            id.name = 'Figre'
        }
    })
    //const variableDeclarators = root.find(ttt)
    console.log(erf)

    return root.toSource()
}

// import { API, FileInfo } from 'jscodeshift'

// export default function (file: FileInfo, api: API) {
//     const j = api.jscodeshift
//     const root = j(file.source)

//     const ttt = j.typeAlias(j.identifier('Props'), null, {
//         type: 'AnyTypeAnnotation',
//     })
//     const erf = root.find(j.TypeAlias, {
//         id: {
//             name: 'Props',
//         },
//     })

//     erf.forEach((path) => {
//         const Node = path.value
//         Node.id.name = 'gdgfd'
//     })
//     //const variableDeclarators = root.find(ttt)
//     console.log(erf)

//     return root.toSource()
// }
