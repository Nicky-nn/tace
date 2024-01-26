// noinspection GraphQLUnresolvedReference
import { gql, GraphQLClient } from 'graphql-request'
import { AccessToken } from '../models/paramsModel'

const apiQuery = gql`
  query CONFIGURACION_PARAMETROS {
    parametrosEmpresa {
      paqueteFacturas
      paqueteMasivoFacturas
      emailContacto
      logoSmall
      colorPrimario
      agregarMetodoPago
      logo
    }
  }
`

interface ParametrosEmpresa {
  paqueteFacturas: string
  paqueteMasivoFacturas: string
  emailContacto: string
  logoSmall: string
  colorPrimario: string
  agregarMetodoPago: boolean
  logo: string
}

export const obtenerLogo = async (): Promise<ParametrosEmpresa | null> => {
  try {
    const client = new GraphQLClient(import.meta.env.ISI_API_URL)
    const token = localStorage.getItem(AccessToken)

    if (!token) {
      // Manejar el caso en que el token no esté presente
      return null
    }

    // Establecer un encabezado único
    client.setHeader('authorization', `Bearer ${token}`)

    // Realizar la solicitud a la API GraphQL
    const data: any = await client.request(apiQuery)

    // Retornar los datos obtenidos o null si no hay datos
    return data.parametrosEmpresa || null
  } catch (error) {
    console.error('Error al obtener la configuración de la empresa', error)
    return null
  }
}

