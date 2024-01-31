// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'
import { FacturaProps } from '../interfaces/factura'

export const REVERTIR = gql`
  mutation REVERTIR($cuf: String!) {
    facturaTasaCeroRevertirAnulacion(cuf: $cuf) {
      cuf
    }
  }
`

export const fetchFacturaRevertir = async (
  cuf: string,
): Promise<FacturaProps> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(REVERTIR, { cuf })
  return data.facturaTasaCeroRevertirAnulacion
}
