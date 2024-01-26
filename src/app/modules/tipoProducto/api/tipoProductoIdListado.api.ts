// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { TipoProductoProps } from '../interfaces/tipoProducto.interface'

const gqlQuery = gql`
  query TIPO_PRODUCTO($id: ID!) {
    tipoProducto(id: $id) {
      _id
      descripcion
      codigoParent
      parientes
    }
  }
`

export const apiTipoProductoIdListado = async (
  id: string,
): Promise<TipoProductoProps[]> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)
  const data: any = await client.request(gqlQuery, { id })
  return data.tipoProducto || []
}
