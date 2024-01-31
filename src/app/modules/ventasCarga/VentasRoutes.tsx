import { lazy } from 'react'

import { authRoles } from '../../../auth/authRoles'
import Loadable from '../../base/components/Template/Loadable/Loadable'

const AppVentaRegistro = Loadable(lazy(() => import('./view/VentaRegistro')))
const AppVentaGestion = Loadable(lazy(() => import('./view/VentaGestion')))

const ventasCargaRoutes = [
  {
    path: '/ventas/registroCarga',
    element: <AppVentaRegistro />,
    auth: authRoles.admin,
  },
  {
    path: '/ventas/gestionCarga',
    element: <AppVentaGestion />,
    auth: authRoles.admin,
  },
]

export default ventasCargaRoutes
