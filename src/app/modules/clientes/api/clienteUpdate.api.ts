// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'
import {
  ClienteApiInputProps,
  ClienteInputProps,
  ClienteProps,
} from '../interfaces/cliente'

/* Definiendo una consulta de mutación de GraphQL llamada "CLIENTE_ACTUALIZACION" que toma dos variables: "id"
de tipo ID y "input" de tipo ClienteUpdateInput. La mutación actualiza un cliente con el "id" dado
utilizando los valores proporcionados en el objeto de "entrada". La consulta devuelve varias propiedades de la actualización
cliente, incluyendo su ID, nombre, correo electrónico e información del documento. */
const query = gql`
  mutation CLIENTE_ACTUALIZACION($id: ID!, $input: ClienteUpdateInput!) {
    clienteUpdate(id: $id, input: $input) {
      _id
      razonSocial
      tipoDocumentoIdentidad {
        codigoClasificador
        descripcion
      }
      codigoCliente
      numeroDocumento
      complemento
      nombres
      apellidos
      email
      codigoExcepcion
    }
  }
`

/**
 * Esta es una función de TypeScript que actualiza un cliente usando GraphQL y devuelve el cliente actualizado
 * datos.
 * @param {string} id: una cadena que representa la ID del cliente que se actualizará en la API.
 * @param {ClienteApiInputProps} input - El objeto de entrada que contiene las propiedades actualizadas del
 * cliente que necesita ser actualizado en la API.
 * @returns La función `apiClienteActualizar` devuelve una Promesa que se resuelve en un `ClienteProps`
 * objeto.
 */
export const apiClienteActualizar = async (
  id: string,
  input: ClienteApiInputProps,
): Promise<ClienteProps> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    // Set a single header
    client.setHeader('authorization', `Bearer ${token}`)

    const data: any = await client.request(query, { id, input })
    return data.clienteUpdate
  } catch (e: any) {
    throw new MyGraphQlError(e)
  }
}
