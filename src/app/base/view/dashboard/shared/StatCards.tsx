import { Card, Fab, Grid, Icon } from '@mui/material'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { lighten, styled } from '@mui/system'
import { useEffect, useState } from 'react'
import { FC } from 'react'

import { fetchFacturaListado } from '../../../../../app/modules/ventas/api/factura.listado.api'
import Analytics from '../Analytics'

const ContentBox: any = styled('div')(({ theme }: any): any => ({
  display: 'flex',
  flexWrap: 'wra,p',
  alignItems: 'center',
}))

const FabIcon = styled(Fab)(() => ({
  width: '44px !important',
  height: '44px !important',
  boxShadow: 'none !important',
}))

const H3: FC<any> = styled('h3')(({ textcolor }: any) => ({
  margin: 0,
  fontWeight: '500',
  marginLeft: '12px',
  color: textcolor,
}))

const H1: FC<any> = styled('h1')(({ theme }) => ({
  margin: 0,
  flexGrow: 1,
  color: theme.palette.text.secondary,
}))

const IconBox = styled('div')(({ theme }) => ({
  width: 16,
  height: 16,
  overflow: 'hidden',
  borderRadius: '300px ',
  color: '#fff',
  display: 'flex',
  justifyContent: 'center',
  '& .icon': { fontSize: '14px' },
}))

const Span: FC<any> = styled('span')(({ textcolor }: any) => ({
  fontSize: '13px',
  color: textcolor,
  marginLeft: '4px',
}))

const StatCards = () => {
  return <Analytics></Analytics>
}

export default StatCards
