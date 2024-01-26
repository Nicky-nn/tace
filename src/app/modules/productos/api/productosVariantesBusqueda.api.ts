// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { ProductoVarianteProps } from '../interfaces/producto.interface'

const reqQuery = gql`
  query BUSQUEDA($query: String!) {
    tasaCeroProductoBusqueda(query: $query) {
      state
      codigoProducto
      nombre
      descripcion
      actividadEconomica {
        codigoCaeb
        descripcion
        tipoActividad
      }
      descripcionHtml
      tipoProducto {
        _id
        descripcion
        codigoParent
      }
      imagen {
        altText
        url
      }
      proveedor {
        codigo
        nombre
        correo
      }
      sinProductoServicio {
        codigoActividad
        codigoProducto
        descripcionProducto
      }
      precio
      precioComparacion
      costo
      unidadMedida {
        codigoClasificador
        descripcion
      }
      moneda {
        codigo
        descripcion
        sigla
        tipoCambio
        activo
      }
    }
  }
`

export const apiProductosVariantesBusqueda = async (
  query: string,
): Promise<ProductoVarianteProps[]> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(reqQuery, { query })
  return data?.tasaCeroProductoBusqueda || []
}

