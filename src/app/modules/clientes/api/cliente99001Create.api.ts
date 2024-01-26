// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'
import { Cliente99001ApiInputProps, ClienteProps } from '../interfaces/cliente'

/* Definición de una consulta de mutación de GraphQL llamada "CLIENTE_99001_REGISTRO" que crea un nuevo cliente con el
parámetros de entrada especificados. La consulta devuelve las propiedades del cliente recién creado, incluidos sus
DNI, nombre, número de documento e información de contacto. */

const apiQuery = gql`
  mutation CLIENTE_99001_REGISTRO($input: Cliente99001Input!) {
    cliente99001Create(input: $input) {
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

// console.log(apiQuery)
export const apiCliente99001Registro = async (
  input: Cliente99001ApiInputProps,
): Promise<ClienteProps> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    // Set a single header
    client.setHeader('authorization', `Bearer ${token}`)

    const data: any = await client.request(apiQuery, { input })
    return data.cliente99001Create
  } catch (e: any) {
    throw new MyGraphQlError(e)
  }
}
