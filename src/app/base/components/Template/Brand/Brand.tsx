import { Box, styled, Theme } from '@mui/system'
import useSettings from '../../../hooks/useSettings'
import { Span } from '../Typography'
import { useEffect, useState } from 'react'
import { obtenerLogo } from '../../../api/logo.api'

const BrandRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '20px 18px 20px 29px',
})) as typeof Box

interface StyledSpanProps {
  theme?: Theme
  mode: any
  child: JSX.Element | JSX.Element[]
}
const StyledSpan: any = styled(Span)(({ theme, mode }: StyledSpanProps) => ({
  fontSize: 18,
  marginLeft: '.5rem',
  display: mode === 'compact' ? 'none' : 'block',
}))

const Brand = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const { settings } = useSettings()
  const leftSidebar = settings.layout1Settings.leftSidebar
  const { mode } = leftSidebar

  const [logoUrl, setLogoUrl] = useState<string | undefined>(undefined) // Cambiado a string | undefined

  useEffect(() => {
    // Intenta recuperar la URL del logotipo desde el almacenamiento local (caché)
    const cachedLogoUrl = localStorage.getItem('logoUrl')
    if (cachedLogoUrl) {
      setLogoUrl(cachedLogoUrl)
    } else {
      // Si no hay URL en caché, realiza la llamada a la API
      const fetchLogoUrl = async () => {
        try {
          const response = await obtenerLogo()
          setLogoUrl(response?.logo)

          // Almacena la URL del logotipo en caché
          localStorage.setItem('logoUrl', response?.logo || '')
        } catch (error) {
          console.error('Error al obtener la URL del logotipo', error)
          setLogoUrl('/assets/images/logo_dark.png')
        }
      }

      // Llama a la función para obtener la URL del logotipo
      fetchLogoUrl()
    }
  }, []) // Ejecuta la llamada solo una vez al montar el componente

  return (
    <BrandRoot>
      <Box display="flex" alignItems="center">
        {logoUrl ? (
          <img
            src={logoUrl} // Asegurando que src sea de tipo string | undefined
            style={{ height: 30, marginTop: -15 }}
            alt="Logo"
          />
        ) : (
          <Box display="flex" alignItems="center">
            <img
              src="/assets/images/logo_dark.png"
              style={{ height: 30, marginTop: -15 }}
              alt=""
            />
            <StyledSpan mode={mode} className="sidenavHoverShow">
              ISI.INVOICE
            </StyledSpan>
          </Box>
        )}
      </Box>
      <Box
        className="sidenavHoverShow"
        sx={{ display: mode === 'compact' ? 'none' : 'block' }}
      >
        {children || null}
      </Box>
    </BrandRoot>
  )
}

export default Brand

