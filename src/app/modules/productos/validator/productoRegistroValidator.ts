import { toast } from 'react-toastify'
import { array, boolean, mixed, number, object, setLocale, string } from 'yup'
import yup from 'yup'
import { es } from 'yup-locales'

import { ProductoInputProps } from '../interfaces/producto.interface'

export const productoRegistroValidatorResponde = async (
  alq: ProductoInputProps,
): Promise<boolean> => {
  setLocale(es)
  const schema = object({
    codigoProducto: string().required('Debe ingresar el código del producto'),
    nombre: string().required('Debe ingresar el nombre del producto'),
    codigoActividad: mixed().required('Debe seleccionar la actividad económica'),
    codigoProductoSin: mixed().required('Debe seleccionar el producto sin'),
    precio: number()
      .min(0.01)
      .required('Debe ingresar el precio del producto')
      .typeError('Debe ingresar un número'),
    codigoUnidadMedida: number().required('Debe seleccionar la unidad de medida'),
    moneda: object().required('Debe seleccionar la moneda'),
    tipoOperacion: mixed()
      .required('Debe seleccionar el tipo de operación')
      .typeError('Debe seleccionar el tipo de operación')
      .required(),
  })

  try {
    await schema.validate(alq, { abortEarly: false })
    return true
    console.log('valido')
  } catch (e: any) {
    console.log(e)
    console.log(e.errors)
    return false
  }
}

export const productoRegistroValidator = object({
  codigoProducto: string().required('Debe ingresar el código del producto'),
  moneda: object().required('Debe seleccionar la moneda'),
  nombre: string().required(),
  codigoActividad: mixed().required(),
  codigoProductoSin: mixed().required(),
  precio: number().min(0.01).required('Debe ingresar un número').typeError('Debe ingresar un número'),
  codigoUnidadMedida: mixed().required(),
  tipoOperacion: mixed()
    .required('Debe seleccionar el tipo de operación')
    .typeError('Debe seleccionar el tipo de operación')
    .required(),
})

