// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { SinMotivoAnulacionProps } from '../interfaces/sin.interface'

/* Este código define una consulta GraphQL utilizando la función `gql` de la biblioteca `graphql-request`.
La consulta se llama `MOTIVO_ANULACION` y pide el `codigoClasificador` y `descripcion`
campos del objeto `sinMotivoAnulacion`. Esta consulta se utiliza en el `fetchSinMotivoAnulacion`
función para recuperar datos de una API de GraphQL. */
const query = gql`
  query MOTIVO_ANULACION {
    sinMotivoAnulacion {
      codigoClasificador
      descripcion
    }
  }
`

export const fetchSinMotivoAnulacion = async (): Promise<SinMotivoAnulacionProps[]> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(query)
  return data.sinMotivoAnulacion
}
