// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'

/*`const query` está definiendo una operación de mutación de GraphQL llamada `CLIENTE_ELIMINAR` que toma un
array de cadenas llamado `codigosCliente` como argumento requerido. La mutación llamará a un resolver
función llamada `clientesEliminar` y pasar el argumento `codigosCliente`. */

const query = gql`
  mutation CLIENTE_ELIMINAR($codigosCliente: [String]!) {
    clientesEliminar(codigosCliente: $codigosCliente)
  }
`

/**
 * @description Eliminacion de clientes
 * @param codigosCliente
 */

/**
 * Esta es una función de TypeScript que usa GraphQL para eliminar clientes de una API.
 * @param {string[]} codigosCliente - una matriz de cadenas que representan los códigos de los clientes a ser
 * eliminado.
 * @devuelve un valor booleano, que es el resultado de llamar a la mutación `clientesEliminar` en el
 * API GraphQL con el parámetro proporcionado `codigosCliente`.
 */
export const apiClientesEliminar = async (codigosCliente: string[]): Promise<boolean> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    // Set a single header
    client.setHeader('authorization', `Bearer ${token}`)

    const data: any = await client.request(query, { codigosCliente })
    return data.clientesEliminar
  } catch (e: any) {
    throw new MyGraphQlError(e)
  }
}
