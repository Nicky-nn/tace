import { ImagenProps } from '../../../base/interfaces/base'
import { genRandomString } from '../../../utils/helper'
import { ProveedorProps } from '../../proveedor/interfaces/proveedor.interface'
import {
  SinActividadesEconomicasProps,
  SinActividadesProps,
  SinProductoServicioProps,
  SinUnidadMedidaProps,
} from '../../sin/interfaces/sin.interface'
import { SucursalProps } from '../../sucursal/interfaces/sucursal'
import { TipoProductoProps } from '../../tipoProducto/interfaces/tipoProducto.interface'
import { InventarioProps } from './inventario.interface'

export interface ProductoDefinitionProps {
  codigoProducto: string
  nombre: string
  descripcion: string
  descripcionHtml: string
  codigoActividad: SinActividadesEconomicasProps
  codigoProductoSin: SinProductoServicioProps
  precio: number
  codigoUnidadMedida: SinUnidadMedidaProps
  tipoProducto: TipoProductoProps
  codigoProveedor: ProveedorProps
  state?: string
  codigoNandina?: string
}

export interface ProductoProps extends ProductoDefinitionProps {
  [x: string]: any
}

export interface ProductoVarianteInventarioProps {}

export interface ProductoVarianteProps {
  moneda: any
  _id: string
  id: string
  sinProductoServicio: SinProductoServicioProps
  codigoProducto: string // identificador o codigo unico
  producto: ProductoDefinitionProps
  titulo: string // nombre propio
  nombre: string // nombre producto + titulo
  detalleExtra?: string
  codigoBarras: string | null
  precio: number
  precioComparacion: number // Para mostrar un precio rebajado
  costo: number
  imagen?: ImagenProps
  incluirCantidad: boolean // habilita cantidad al stock del inventario
  verificarStock: boolean // si es true, se verifica cantidad en stock, false = no se toma en cuenta
  unidadMedida: SinUnidadMedidaProps
  inventario: InventarioProps[]
  state?: string
  usucre?: string
  createdAt?: Date
  usumod?: string
  updatedAt?: Date
  proveedor?: ProveedorProps
}

export interface ProductoVarianteInputProps {
  id: string
  codigoProducto: string // identificador o codigo unico
  sinProductoServicio: string
  titulo: string // nombre propio
  nombre: string // nombre producto + titulo
  disponibleParaVenta: boolean
  codigoBarras: string | null
  precio: number
  precioComparacion?: number
  incluirCantidad: boolean // Incluye cantidad por cada item producto
  verificarStock: boolean // Continuar venta aun si el stock ha terminado
  costo: number
  inventario: ProductoVarianteInventarioProps[]
  peso?: number
  unidadMedida: SinUnidadMedidaProps | null
}

export interface OpcionesProductoProps {
  id: string
  nombre: string
  valores: string[]
}

export interface ProductoInputProps {
  codigoProducto: string
  moneda: string
  nombre: string
  descripcion: string
  descripcionHtml: string
  codigoActividad: SinActividadesProps | null
  codigoProductoSin: SinProductoServicioProps | null
  precio: number
  codigoUnidadMedida: SinUnidadMedidaProps | null
  tipoProducto: TipoProductoProps | null
  codigoProveedor: ProveedorProps | null
  tipoOperacion?: string | null
  state?: string
}

export const PRODUCTO_VARIANTE_INITIAL_VALUES: ProductoVarianteInputProps = {
  id: genRandomString(10),
  codigoProducto: '',
  sinProductoServicio: '',
  titulo: '',
  nombre: '',
  disponibleParaVenta: true,
  codigoBarras: '',
  precio: 0,
  incluirCantidad: true,
  verificarStock: true,
  precioComparacion: 0,
  costo: 0,
  inventario: [],
  unidadMedida: null,
}

export const PRODUCTO_INITIAL_VALUES: ProductoInputProps = {
  codigoProducto: '',
  moneda: '',
  nombre: '',
  descripcion: '',
  descripcionHtml: '',
  codigoActividad: null,
  codigoProductoSin: null,
  precio: 0,
  codigoUnidadMedida: null,
  tipoProducto: null,
  codigoProveedor: null,
  state: '',
}

export interface ProductoVarianteApiProps {
  id: string
  codigoProducto: string
  codigoProductoSin: string
  titulo: string
  precio: number
  precioComparacion: number
  costo: number
  incluirCantidad: boolean
  verificarStock: boolean
  codigoUnidadMedida: number
  inventario: { codigoSucursal: number; stock: number }[]
}

export interface ProductoInputApiProps {
  nombre: string
  descripcion: string
  codigoActividad?: SinActividadesProps | null
  codigoProductoSin: SinProductoServicioProps | null
  precio: number
  codigoUnidadMedida: number
  // tipoProducto: SinProductoServicioProps | null
  tipoProducto: TipoProductoProps | null
  codigoProveedor: ProveedorProps | null
}
