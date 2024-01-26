// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'
import { Cliente99001ApiInputProps, ClienteProps } from '../interfaces/cliente'

/* Definiendo una consulta de mutación de GraphQL llamada "CLIENTE_99001_ACTUALIZAR" que toma dos variables:
"id" de tipo ID e "input" de tipo Cliente99001UpdateInput. La mutación actualiza un cliente con el
dado "id" usando los valores provistos en el objeto "input". La consulta devuelve varios campos del
cliente actualizado, incluyendo su identificación, nombre, información del documento e información de contacto. */
const query = gql`
  mutation CLIENTE_99001_ACTUALIZAR($id: ID!, $input: Cliente99001UpdateInput!) {
    cliente99001Update(id: $id, input: $input) {
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

export const apiCliente99001Actualizar = async (
  id: string,
  input: Cliente99001ApiInputProps,
): Promise<ClienteProps> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    // Set a single headers
    client.setHeader('authorization', `Bearer ${token}`)

    const data: any = await client.request(query, { id, input })
    return data.cliente99001Update
  } catch (e: any) {
    throw new MyGraphQlError(e)
  }
}
