import { genReplaceEmpty } from '../../../utils/helper'
import { ProductoInputProps } from '../interfaces/producto.interface'

/**
 * Componemos el producto para su posterior guardado
 * @param prod
 */

export const productoComposeService = (aql: ProductoInputProps): any => {
  return {
    // codigoProducto: aql.codigoProducto,
    nombre: aql.nombre,
    descripcion: aql.descripcion,
    codigoActividad: aql.codigoActividad?.codigoActividad,
    codigoProductoSin: aql.codigoProductoSin?.codigoProducto,
    // @ts-ignore
    codigoMoneda: aql.moneda.codigo,
    precio: aql.precio,
    codigoUnidadMedida: parseInt(
      genReplaceEmpty(aql.codigoUnidadMedida?.codigoClasificador, 0),
      10,
    ),
    tipoProductoId: aql.tipoProducto?._id,
    codigoProveedor: aql.codigoProveedor?.codigo,
  }
}
