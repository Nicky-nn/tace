import { Navigate } from 'react-router-dom'

import AuthGuard from '../../auth/AuthGuard'
import MatxLayout from '../base/components/Template/MatxLayout/MatxLayout'
import dashboardRoutes from '../base/view/dashboard/DashboardRoutes'
import NotFound from '../base/view/sessions/NotFound'
import sessionRoutes from '../base/view/sessions/SessionRoutes'
import clientesRoutes from '../modules/clientes/ClientesRoutes'
import contingenciasRoutes from '../modules/contingencia/Contingencia'
import cuentaRoutes from '../modules/cuenta/CuentaRoutes'
import notaCreditoDebitoRoutes from '../modules/notaCreditoDebito/NotaCreditoDebitoRoutes'
import productosRoutes from '../modules/productos/ProductosRoutes'
import proveedorRoutes from '../modules/proveedor/ProveedorRoutes'
import ventasRoutes from '../modules/ventas/VentasRoutes'
import ventasCargaRoutes from '../modules/ventasCarga/VentasRoutes'

export const appRoutes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...dashboardRoutes,
      ...ventasRoutes,
      ...ventasCargaRoutes,
      ...productosRoutes,
      ...clientesRoutes,
      ...cuentaRoutes,
      ...proveedorRoutes,
      ...notaCreditoDebitoRoutes,
      ...contingenciasRoutes,
    ],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="inicio" /> },
  { path: '*', element: <NotFound /> },
]
