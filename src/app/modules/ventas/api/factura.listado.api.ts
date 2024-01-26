// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { PageInfoProps, PageProps } from '../../../interfaces'
import { FacturaProps } from '../interfaces/factura'

/**
 * Respuesta de productos
 */
export interface ApiFacturaResponse {
  docs: Array<FacturaProps>
  pageInfo: PageInfoProps
}

const query = gql`
  query LISTADO($limit: Int!, $reverse: Boolean, $page: Int!, $query: String) {
    facturaSectorEducativoListado(
      limit: $limit
      reverse: $reverse
      page: $page
      query: $query
    ) {
      pageInfo {
        hasNextPage
        hasPrevPage
        limit
        page
        totalDocs
      }
      docs {
        cuf
        moneda {
          codigoClasificador
          descripcion
        }
        representacionGrafica {
          rollo
          sin
          pdf
          xml
        }
        sucursal {
          codigo
          direccion
          telefono
        }
        puntoVenta {
          codigo
          tipoPuntoVenta {
            codigoClasificador
            descripcion
          }
          nombre
          descripcion
        }
        metodoPago {
          codigoClasificador
          descripcion
        }
        detalle {
          descripcionProducto
          nroItem
          actividadEconomica {
            codigoCaeb
            descripcion
          }
          productoServicio {
            codigoActividad
            codigoProducto
            descripcionProducto
          }
          codigoProducto
          cantidad
          unidadMedida {
            codigoClasificador
            descripcion
          }
          precioUnitario
          montoDescuento
          subTotal
          detalleExtra
        }
        nitEmisor
        razonSocialEmisor
        numeroFactura
        fechaEmision
        cliente {
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
        montoTotal
        montoTotalMoneda
        tipoCambio
        state
        updatedAt
        usuario
        usucre
        usumod
        createdAt
      }
    }
  }
`

export const fetchFacturaListado = async (
  pageInfo: PageProps,
): Promise<ApiFacturaResponse> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(query, { ...pageInfo })
  return data.facturaSectorEducativoListado
}

