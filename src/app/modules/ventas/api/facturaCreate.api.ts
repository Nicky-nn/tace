// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { MyGraphQlError } from '../../../base/services/GraphqlError'
import { ClasificadorProps } from '../../../interfaces'
import { SinActividadesProps } from '../../sin/interfaces/sin.interface'

export interface FacturaProps {
  sinTipoMetodoPago: ClasificadorProps[]
  sinUnidadMedida: ClasificadorProps[]
  sinActividades: SinActividadesProps[]
  notificacion: boolean
}

const genDetalle = () => {}

export const REGISTRO_ONLINE = gql`
  mutation ICE_REGISTRO($input: FacturaTasaCeroInput!) {
    facturaTasaCeroRegistro(input: $input) {
      state
      numeroFactura
      representacionGrafica {
        pdf
        rollo
        xml
        sin
      }
      sucursal {
        codigo
      }
      puntoVenta {
        codigo
      }
    }
  }
`

export const fetchFacturaCreate = async (input: any): Promise<FacturaProps> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)
    client.setHeader('authorization', `Bearer ${token}`)
    const data: any = await client.request(REGISTRO_ONLINE, {
      input: input,
    })
    return data.facturaTasaCeroRegistro
  } catch (e: any) {
    console.log('error', e)
    // error en json
    console.log('error', e.response.errors[0].message)

    throw new MyGraphQlError(e)
  }
}
