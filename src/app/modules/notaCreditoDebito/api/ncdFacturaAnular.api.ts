// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'

export const ALQ_ONLINE = gql`
  mutation ANULAR($cuf: String!, $codigoMotivo: Int!) {
    notaCreditoDebitoEduAnular(cuf: $cuf, codigoMotivo: $codigoMotivo) {
      cuf
    }
  }
`

export const fetchNcdFacturaAnular = async (
  cuf: string,
  codigoMotivo: number,
): Promise<any> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(ALQ_ONLINE, { cuf, codigoMotivo })
  return data.notaCreditoDebitoEduAnular
}

