import { MailOutline, Menu, PowerSettingsNew, Settings, Store } from '@mui/icons-material'
import StorefrontIcon from '@mui/icons-material/Storefront'
import StoreMallDirectoryIcon from '@mui/icons-material/StoreMallDirectory'
import {
  Avatar,
  Badge,
  Chip,
  Hidden,
  IconButton,
  MenuItem,
  TableCell,
  Tooltip,
  useMediaQuery,
} from '@mui/material'
import { Box, styled, useTheme } from '@mui/system'
import React, { FC } from 'react'
import { Link } from 'react-router-dom'

import { cuentaRouteMap } from '../../../../../modules/cuenta/CuentaRoutesMap'
import { topBarHeight } from '../../../../../utils/constant'
import { NotificationProvider } from '../../../../contexts/NotificationContext'
import { ThemeColorBarProvider } from '../../../../contexts/ThemeColorContext'
import useAuth from '../../../../hooks/useAuth'
import useSettings from '../../../../hooks/useSettings'
import MatxMenu from '../../MatxMenu/MatxMenu'
import { themeShadows } from '../../MatxTheme/themeColors'
import NotificationBar from '../../NotificationBar/NotificationBar'
import ThemeColorBar from '../../NotificationBar/ThemeColorBar'
import { Span } from '../../Typography'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: theme.palette.success.main,
    color: theme.palette.success.main,
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&.MuiBadge-anchorOriginTopRightCircular': {
      top: '0',
      right: '0',
    },
  },
}))

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}))

const TopbarRoot = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: 'all 0.3s ease',
  boxShadow: themeShadows[8],
  height: topBarHeight,
}))

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: '8px',
  paddingLeft: 18,
  paddingRight: 20,
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: theme.palette.primary.main,
  [theme.breakpoints.down('sm')]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down('xs')]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}))

const UserMenu = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  borderRadius: 24,
  padding: 4,
  '& span': {
    margin: '0 8px',
  },
}))

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  minWidth: 185,
  '& a': {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
  },
  '& span': {
    marginRight: '10px',
    color: theme.palette.text.primary,
  },
}))

const IconBox = styled('div')(({ theme }) => ({
  display: 'inherit',
  [theme.breakpoints.down('md')]: {
    display: 'none !important',
  },
}))

const Layout1Topbar: FC<any> = () => {
  const theme = useTheme()
  const { settings, updateSettings }: any = useSettings()
  const { logout, user }: any = useAuth()
  const isMdScreen = useMediaQuery(theme.breakpoints.down('md'))

  const updateSidebarMode = (sidebarSettings: any) => {
    updateSettings({
      layout1Settings: {
        leftSidebar: {
          ...sidebarSettings,
        },
      },
    })
  }

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings
    let mode
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === 'close' ? 'mobile' : 'close'
    } else {
      mode = layout1Settings.leftSidebar.mode === 'full' ? 'close' : 'full'
    }
    updateSidebarMode({ mode })
  }

  return (
    <TopbarRoot>
      <TopbarContainer>
        <Box display="flex">
          <StyledIconButton onClick={handleSidebarToggle}>
            <Menu>Menu</Menu>
          </StyledIconButton>

          <TableCell align="left" sx={{ width: 'auto', paddingLeft: 1 }}>
            <Tooltip title={'Comercio'}>
              <Chip
                color="info"
                size="small"
                icon={<StoreMallDirectoryIcon />}
                label={
                  <>
                    <strong>{user.miEmpresa.tienda}</strong>
                  </>
                }
                variant="outlined"
              />
            </Tooltip>
          </TableCell>
          <TableCell sx={{ width: 'auto', paddingRight: 1 }}>
            <Tooltip title={'Ambiente'}>
              <Chip
                color={user.miEmpresa.codigoAmbiente === 1 ? 'success' : 'warning'}
                size="small"
                icon={<StorefrontIcon />}
                label={
                  <>
                    <strong>
                      {user.miEmpresa.codigoAmbiente === 1 ? 'Producción' : 'Piloto'}
                    </strong>
                  </>
                }
              />
            </Tooltip>
          </TableCell>
        </Box>
        <Box display="flex" alignItems="center">
          <NotificationProvider>
            <NotificationBar />
          </NotificationProvider>
          <ThemeColorBarProvider></ThemeColorBarProvider>

          <MatxMenu
            menuButton={
              <UserMenu>
                <Hidden xsDown>
                  <Span>
                    Hola <strong>{user.nombres}</strong>
                  </Span>
                </Hidden>
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  {/* <Avatar
                    src="/public/assets/images/avatars/001-man.svg"
                    onError={(e) => {
                      e.currentTarget.src = user.avatar // En caso de error, cargar la imagen de usuario
                    }}
                    sx={{ cursor: 'pointer' }}
                  /> */}
                  <Avatar sx={{ cursor: 'pointer' }}>
                    <img
                      src="/assets/images/avatars/001-man.svg"
                      onError={(e) => {
                        e.currentTarget.src = user.avatar // En caso de error, cargar la imagen de usuario
                      }}
                      alt="User Avatar"
                      width="100%"
                    />
                  </Avatar>
                </StyledBadge>
              </UserMenu>
            }
          >
            <StyledItem>
              <Link to={cuentaRouteMap.cuenta}>
                <Settings> settings </Settings> &nbsp;&nbsp;
                <Span> Opciones </Span>
              </Link>
            </StyledItem>
            <StyledItem onClick={() => logout()}>
              <PowerSettingsNew> power_settings_new </PowerSettingsNew> &nbsp;&nbsp;
              <Span> Cerrar Sesión </Span>
            </StyledItem>
          </MatxMenu>
        </Box>
      </TopbarContainer>
    </TopbarRoot>
  )
}

export default React.memo(Layout1Topbar)
