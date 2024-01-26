import { lazy } from 'react'

import { authRoles } from '../../../auth/authRoles'
import Loadable from '../../base/components/Template/Loadable/Loadable'

const AppVentaRegistro = Loadable(lazy(() => import('./view/VentaRegistro')))
const AppVentaGestion = Loadable(lazy(() => import('./view/VentaGestion')))

const contingenciasRoutes = [
  {
    path: '/contingencia/registro',
    element: <AppVentaRegistro />,
    auth: authRoles.admin,
  },
  {
    path: '/contingencia/gestion',
    element: <AppVentaGestion />,
    auth: authRoles.admin,
  },
]

export default contingenciasRoutes
