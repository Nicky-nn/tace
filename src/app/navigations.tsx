import { ncdRouteMap } from './modules/notaCreditoDebito/NotaCreditoDebitoRoutesMap'
import { productosRouteMap } from './modules/productos/ProductosRoutesMap'
import { proveedorRouteMap } from './modules/proveedor/ProveedorRoutesMap'

export interface NavigationProps {
  name: string
  path?: string
  icon?: any
  iconText?: string
  label?: string
  type?: string
  badge?: { value: string; color: string }
  children?: Array<{
    name: string
    iconText: string
    path: string
    visible: boolean
  }>
}

export const navigations: NavigationProps[] = [
  {
    name: 'Página Principal',
    path: '/Inicio',
    icon: 'home',
  },
  {
    name: 'SEGURIDAD',
    label: 'TRANSACCIONES',
    type: 'label',
  },
  {
    name: 'Facturación',
    icon: 'add_to_queue',
    children: [
      {
        name: 'Registrar Venta Libros',
        iconText: 'VL',
        path: '/ventas/registro',
        visible: true,
      },
      {
        name: 'Registrar T. de Carga',
        iconText: 'TRA',
        path: '/ventas/registroCarga',
        visible: true,
      },
      {
        name: 'Gestión de Facturas',
        iconText: 'ALGE',
        path: '/ventas/gestion',
        visible: true,
      },
    ],
  },
  // {
  //   name: 'Nota Crédito Debito',
  //   icon: 'document_scanner',
  //   children: [
  //     {
  //       name: 'Gestión de Notas',
  //       iconText: 'NCD',
  //       path: ncdRouteMap.gestion,
  //     },
  //   ],
  // },
  {
    name: 'Servicios',
    icon: 'storefront_sharp',
    children: [
      {
        name: 'Gestión de Servicios',
        iconText: 'GP',
        path: productosRouteMap.gestion,
        visible: true,
      },
      {
        name: 'Proveedores',
        iconText: 'PR',
        path: proveedorRouteMap.gestion,
        visible: true,
      },
    ],
  },
  {
    name: 'Clientes',
    icon: 'person_sharp',
    badge: { value: '', color: 'secondary' },
    children: [
      {
        name: 'Gestión de clientes',
        path: '/clientes/gestion',
        iconText: 'GC',
        visible: true,
      },
    ],
  },
  {
    name: 'Contingencias',
    icon: 'report_problem',
    children: [
      {
        name: 'Registrar Contingencia',
        iconText: 'RC',
        path: '/contingencia/registro',
        visible: true,
      },
      {
        name: 'Gestión de Contingencias',
        iconText: 'GC',
        path: '/contingencia/gestion',
        visible: true,
      },
    ],
  },
  {
    name: 'Reportes',
    icon: 'trending_up',

    children: [
      {
        name: 'Echarts',
        path: '/charts/echarts',
        iconText: 'E',
        visible: true,
      },
    ],
  },
  {
    name: 'Documentación',
    icon: 'launch',
    type: 'extLink',
    path: 'https://youtu.be/XPDOkFO_J1o?si=dvHBn04-s__N2DKh',
  },
]

