import { number, object, string } from 'yup'
import * as Yup from 'yup'

export const VentaRegistroValidator = object({
  actividadEconomica: object({
    codigoActividad: string().required(),
  }),
  tipoCliente: string().required(),
  tipoCambio: number().required('Debe ingresar el tipo de cambio'),
  tipoCambioOficial: number().required('Debe ingresar el tipo de cambio oficial'),
  cliente: object({
    codigoCliente: string().required(),
  })
    .nullable()
    .required(),
  emailCliente: string().email().nullable().required(),
  periodoFacturado: string().nullable().required('Debe ingresar el periodo facturado'),
  nombreEstudiante: string().nullable().required('Debe ingresar el nombre del estudiante'),
})
