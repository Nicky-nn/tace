import './App.css'

import { Provider } from 'react-redux'
import { useRoutes } from 'react-router-dom'

import MatxTheme from './app/base/components/Template/MatxTheme/MatxTheme'
import { AuthProvider } from './app/base/contexts/JWTAuthContext'
import { SettingsProvider } from './app/base/contexts/SettingsContext'
import { appRoutes } from './app/routes/routes'
import { store } from './app/store/store'
import { navigations } from './app/navigations'
import { useEffect } from 'react'

function App() {
  const content = useRoutes(appRoutes)
  const x = navigations

  useEffect(() => {
    x.map((item) => {
      if (item.name === 'Facturación') {
        item.children?.map((item2) => {
          if (item2.name === 'Registrar Venta Libros') {
            // item2.visible = ventaLibrosChecked
            item2.visible = localStorage.getItem('ventaLibrosChecked') === 'true'
          }
          if (item2.name === 'Registrar T. de Carga') {
            item2.visible = localStorage.getItem('transporteCargaChecked') === 'true'
          }
        })
      }
    })
  }, [])


  return (
    <Provider store={store}>
      <SettingsProvider>
        <MatxTheme>
          <AuthProvider>{content}</AuthProvider>
        </MatxTheme>
      </SettingsProvider>
    </Provider>
  )
}

export default App

