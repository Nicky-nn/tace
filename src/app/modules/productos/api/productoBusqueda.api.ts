// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { ClasificadorProps } from '../../../interfaces'
import { SinActividadesProps } from '../../sin/interfaces/sin.interface'
import { ProductoVarianteProps } from '../interfaces/producto.interface'

export interface FacturaProps {
  sinTipoMetodoPago: ClasificadorProps[]
  sinUnidadMedida: ClasificadorProps[]
  sinActividades: SinActividadesProps[]
}

const productoQuery = (query: string) => gql`
    query PRODUCTOS_BUSQUEDA {
        tasaCeroProductoBusqueda(query: "${query}") {
            codigoProducto
			nombre
			descripcion
			actividadEconomica{
				codigoCaeb
				descripcion
				tipoActividad
			}
			descripcionHtml
			tipoProducto{
				_id
				descripcion
				codigoParent
			}
			imagen{
				altText
				url
			}
			proveedor{
				codigo
				nombre
				correo
			}
			sinProductoServicio{
				codigoActividad
				codigoProducto
				descripcionProducto
			}
			precio
			precioComparacion
			costo
			unidadMedida{
				codigoClasificador
				descripcion
			}
			moneda{
			codigo
			descripcion
			sigla
			tipoCambio
			activo
		}
			state
			usucre
			usumod
			updatedAt
			createdAt
        }
    }
`

export const fetchProductoBusqueda = async (
  query: string,
): Promise<ProductoVarianteProps[]> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(productoQuery(query))
  return data?.tasaCeroProductoBusqueda || []
}

