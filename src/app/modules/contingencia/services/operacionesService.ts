import { genReplaceEmpty } from '../../../utils/helper'
import { FacturaInputProps } from '../interfaces/factura'

export const montoPagarService = (factura: FacturaInputProps): number => {
  if (factura.detalle.length > 0) {
    const subTotal: number =
      factura.detalle.reduce(
        (acc, cur) =>
          acc + cur.cantidad * cur.conversionMoneda - cur.conversionMontoDescuento,
        0,
      ) || 0
    return subTotal - factura.descuentoAdicional
  }
  return 0
}

export const montoSubTotal = (factura: FacturaInputProps): number => {
  if (factura.detalle.length > 0) {
    return (
      factura.detalle.reduce(
        (acc, cur) =>
          acc + cur.cantidad * cur.conversionMoneda - cur.conversionMontoDescuento,
        0,
      ) || 0
    )
  }
  return 0
}
export const montoSubTotal2 = (factura: FacturaInputProps): number => {
  if (factura.detalle.length > 0) {
    return (
      factura.detalle.reduce(
        (acc, cur) => acc + cur.cantidad * cur.precioUnitario - cur.montoDescuento,
        0,
      ) || 0
    )
  }
  return 0
}

export const montoInputVuelto = (factura: FacturaInputProps): number => {
  return factura.inputMontoPagar - factura.montoPagar
}

/**
 * @description Calculamos los montos totales a distribuir
 * @param factura
 */
export const genCalculoTotalesService = (
  factura: FacturaInputProps,
): {
  subTotal: number
  total: number
  montoPagar: number
  vuelto: number
  detalleConInfoMoneda: any[]
} => {
  const detalleConInfoMoneda = factura.detalle.map((detalleItem) => {
    const { moneda, ...restoDetalle } = detalleItem // extraer 'moneda' y el resto del detalle
    return {
      ...restoDetalle,
      monedaInfo: moneda.sigla, // agregar la información de la moneda al objeto
    }
  })

  const subTotal = montoSubTotal(factura)
  const total = subTotal - factura.descuentoAdicional
  // const montoPagar =
  //   subTotal - genReplaceEmpty(factura.descuentoAdicional, 0) - (factura?.montoGiftCard ?? 0)

  const montoPagar =
    factura.codigoMetodoPago.codigoClasificador === 27
      ? subTotal -
        genReplaceEmpty(factura.descuentoAdicional, 0) -
        (factura?.montoGiftCard ?? 0)
      : subTotal - genReplaceEmpty(factura.descuentoAdicional, 0)

  const vuelto = factura.inputMontoPagar - montoPagar

  return { subTotal, total, montoPagar, vuelto, detalleConInfoMoneda }
}

