// noinspection GraphQLUnresolvedReference

import { gql, GraphQLClient } from 'graphql-request'

import { AccessToken } from '../../../base/models/paramsModel'

const mutation = gql`
  mutation REENVIAR_EMAIL($cuf: String!, $emails: [String]!) {
    facturaTasaCeroReenviarEmail(cuf: $cuf, emails: $emails)
  }
`

/**
 * @description Envio de multiples notificaciones por correo
 * @param input
 */
export const apiFcvReenvioEmails = async (input: {
  cuf: string
  emails: string[]
}): Promise<boolean> => {
  const client = new GraphQLClient(import.meta.env.ISI_API_URL)
  const token = localStorage.getItem(AccessToken)
  // Set a single header
  client.setHeader('authorization', `Bearer ${token}`)

  const data: any = await client.request(mutation, input)
  return data
}
