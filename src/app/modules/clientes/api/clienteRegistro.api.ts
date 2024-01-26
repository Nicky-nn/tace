// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'
import { ClienteApiInputProps, ClienteProps } from '../interfaces/cliente'

/* Definición de una consulta de mutación de GraphQL llamada "CLIENTE_REGISTRO" que crea un nuevo cliente con el
parámetros de entrada especificados y devuelve las propiedades del cliente creado, como _id, razonSocial,
codigoCliente, tipoDocumentoIdentidad, numeroDocumento, complemento, nombres, apellidos, and email. */

const query = gql`
  mutation CLIENTE_REGISTRO($input: ClienteInput!) {
    clienteCreate(input: $input) {
      _id
      razonSocial
      codigoCliente
      tipoDocumentoIdentidad {
        codigoClasificador
        descripcion
      }
      numeroDocumento
      complemento
      nombres
      apellidos
      email
    }
  }
`

/**
 * Esta es una función de TypeScript que envía una solicitud de GraphQL para crear un nuevo cliente y devuelve el
 * datos de clientes creados.
 * @param {ClienteApiInputProps} input - El parámetro de entrada es un objeto de tipo ClienteApiInputProps,
 * que contiene los datos necesarios para crear un nuevo cliente en la API. Este objeto probablemente incluye
 * propiedades como el nombre del cliente, correo electrónico, número de teléfono y dirección.
 * @returns La función `apiClienteRegistro` devuelve una Promesa que se resuelve en un `ClienteProps`
 * objeto.
 */
export const apiClienteRegistro = async (
  input: ClienteApiInputProps,
): Promise<ClienteProps> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    // Set a single header
    client.setHeader('authorization', `Bearer ${token}`)

    const data: any = await client.request(query, { input })
    return data.clienteCreate
  } catch (e: any) {
    throw new MyGraphQlError(e)
  }
}
