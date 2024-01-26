// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'
import {
  SinActividadesPorDocumentoSector,
  SinActividadesProps,
} from '../interfaces/sin.interface'

/* Este código define una consulta GraphQL usando la función `gql` de la biblioteca `graphql-request`. El
consulta se llama `ACTIVIDADES_POR_DOCUMENTO_SECTOR` y toma un solo argumento `codDocSector` de tipo
`Int!`. La consulta solicita datos del campo `sinActividadesPorDocumentoSector`, que devuelve un
array de objetos con propiedades `codigoActividad`, `codigoDocumentoSector`, `tipoDocumentoSector`,
y `actividadEconómica`. */
const query = gql`
  query ACTIVIDADES {
    sinActividades {
      codigoCaeb
      descripcion
      tipoActividad
    }
  }
`

export const fetchSinActividadesPorDocumentoSector = async (): Promise<
  SinActividadesProps[]
> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    // Set a single header
    client.setHeader('authorization', `Bearer ${token}`)

    const data: any = await client.request(query)
    return data.sinActividades
  } catch (error: any) {
    throw new MyGraphQlError(error)
  }
}
