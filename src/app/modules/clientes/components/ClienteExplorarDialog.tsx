import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  styled,
} from '@mui/material'
import React, { FunctionComponent, useEffect, useState } from 'react'

import { ClienteProps } from '../interfaces/cliente'
import ClientesListadoDialog from './ClientesListadoDialog'

interface OwnProps {
  id: string
  keepMounted: boolean
  open: boolean
  onClose: (value?: ClienteProps) => void
}

type Props = OwnProps

const BlurredBackdrop = styled(Backdrop)(({ theme }) => ({
  backdropFilter: 'blur(5px)',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  zIndex: theme.zIndex.drawer + 1,
}))

const ClienteExplorarDialog: FunctionComponent<Props> = (props) => {
  const { onClose, open, ...other } = props
  const [rowCliente, setRowCliente] = useState<ClienteProps | null>(null)

  useEffect(() => {
    if (rowCliente) {
      onClose(rowCliente)
    }
  }, [rowCliente])

  useEffect(() => {
    if (open) setRowCliente(null)
  }, [open])

  const handleClose = () => {
    onClose()
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      onClose()
    }
  }

  return (
    <>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: '100%' } }}
        maxWidth="xl"
        open={open}
        onClose={handleClose}
        onKeyDown={handleKeyDown}
        BackdropComponent={BlurredBackdrop}
        {...other}
      >
        <DialogTitle>Explorar Clientes</DialogTitle>
        <DialogContent sx={{ overflow: 'hidden' }} dividers>
          <ClientesListadoDialog setRowCliente={setRowCliente} />
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            color={'error'}
            size={'small'}
            variant={'contained'}
            onClick={handleClose}
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ClienteExplorarDialog
