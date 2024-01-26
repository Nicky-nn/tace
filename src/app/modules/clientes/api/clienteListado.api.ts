// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { PageInfoProps, PageProps } from '../../../interfaces'
import { ClienteProps } from '../interfaces/cliente'

/* La `interfaz ClienteListadoProps` define la estructura de un objeto que contiene un `pageInfo`
propiedad de tipo `PageInfoProps` y una propiedad `docs` que es una matriz de objetos de tipo
`ClienteProps`. Esta interfaz se utiliza para garantizar que los datos devueltos desde el
La función `fetchClienteListado` coincide con la estructura esperada. */
interface ClienteListadoProps {
  pageInfo: PageInfoProps
  docs: ClienteProps[]
}

/* La `const query` es una consulta de GraphQL que obtiene una lista de clientes con paginación y filtrado
opciones Toma variables como `límite`, `reversa`, `página` y `consulta` para personalizar el
resultados de la consulta. La consulta devuelve un objeto `ClienteListadoProps` que contiene un objeto `pageInfo`
con información de paginación y una matriz de objetos `ClienteProps` que representan a los clientes. */
const query = gql`
  query CLIENTES_LISTADO($limit: Int!, $reverse: Boolean, $page: Int!, $query: String) {
    clientesAll(limit: $limit, reverse: $reverse, page: $page, query: $query) {
      pageInfo {
        hasNextPage
        hasPrevPage
        totalDocs
        limit
        page
        totalPages
      }
      docs {
        _id
        apellidos
        codigoCliente
        complemento
        email
        nombres
        numeroDocumento
        razonSocial
        codigoExcepcion
        tipoDocumentoIdentidad {
          codigoClasificador
          descripcion
        }
        state
        usucre
        createdAt
        usumod
        UpdatedAt
      }
    }
  }
`

/**
 * Esta función obtiene una lista de clientes usando GraphQL y establece un encabezado de autorización usando un token
 * del almacenamiento local.
 * @param {PageProps} pageInfo - PageProps es probablemente una interfaz o tipo que define las propiedades
 * de una página, como el número de página, el tamaño de página y cualquier filtro u opción de clasificación. Se utiliza como un
 * argumento a la función fetchClienteListado para especificar qué página de resultados obtener de la API.
 * @returns La función `fetchClienteListado` está devolviendo una Promesa que se resuelve en un objeto de
 * escriba `ClienteListadoProps`. El objeto se obtiene haciendo una solicitud de GraphQL a una API específica
 * punto final con el objeto `pageInfo` proporcionado como parámetros de consulta. La función también establece un
 * encabezado de autorización usando un token recuperado del almacenamiento local.
 */
export const fetchClienteListado = async (
  pageInfo: PageProps,
): Promise<ClienteListadoProps> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(query, { ...pageInfo })
  return data.clientesAll
}
