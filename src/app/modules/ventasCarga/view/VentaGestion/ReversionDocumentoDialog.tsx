import { LoadingButton } from '@mui/lab'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Typography,
} from '@mui/material'
import { FunctionComponent, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

import { swalConfirm, swalException } from '../../../../utils/swal'
import { FacturaProps } from '../../interfaces/factura'
import { fetchFacturaRevertir } from '../../api/facturaRevertir.api'

interface OwnProps {
  id: string
  keepMounted: boolean
  open: boolean
  onClose: (value?: any) => void
  factura: FacturaProps | null
}

type Props = OwnProps

const ReversionDocumentoDialog: FunctionComponent<Props> = (props: Props) => {
  const { onClose, open, factura, ...other } = props
  const [loading, setLoading] = useState(false)
  const initalValues: any = {
    codigoMotivo: null,
  }
  const [value, setValue] = useState(initalValues)

  useEffect(() => {
    if (open) {
      setValue(initalValues)
    }
  }, [open])

  const handleCancel = () => {
    onClose()
  }

  const handleOk = async () => {
    let aux = true
    if (!factura?.cuf) {
      toast.error('Seleccione el documento')
      aux = false
    }
    if (aux) {
      Swal.fire({
        ...swalConfirm,
        html: '¿Confirma que desea revertir el documento? <br> este proceso no se podra revertir',
        showLoaderOnConfirm: true,
        preConfirm: () => {
          setLoading(true)
          const input = { id: factura?.cuf, codigoMotivo: value.codigoMotivo }
          return fetchFacturaRevertir(factura?.cuf || '',)
        },
        allowOutsideClick: () => !Swal.isLoading(),
      })
        .then((result) => {
          if (result.isConfirmed) {
            toast.success('Documento Revertido correctamente')
            onClose(true)
            setLoading(false)
          }
        })
        .catch((err) => {
          if (err.message.includes('Error')) {
            toast.error(
              'Contacte con el administrador del sistema, no se puede revertir el documento',
            )
            swalException(err)
            toast.error(
              'Contacte con el administrador del sistema, no se puede revertir el documento',
            )

            setLoading(false)
          } else {
            toast.error('Ha ocurrido un error')
            swalException(err)
            setLoading(false)
          }
        })
    }
  }

  return (
    <>
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="sm"
        open={open}
        {...other}
      >
        <DialogTitle>Reversión de Anulación</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item lg={12} md={12}>
              <Typography variant="body1" component="div">
                <strong>Nro Factura:</strong> {factura?.numeroFactura || ''} <br />
                <strong>Cliente:</strong> {factura?.cliente.razonSocial || ''} <br />
                <strong>Fecha Emisión:</strong> {factura?.fechaEmision || ''} <br />
                <strong>C.U.F.:</strong> {factura?.cuf || ''} <br />
                <strong>Estado:</strong> {factura?.state || ''} <br />
              </Typography>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleCancel} disabled={loading}>
            Cancelar
          </Button>
          <LoadingButton onClick={handleOk} loading={loading} style={{ marginRight: 15 }}>
            Revertir Documento
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ReversionDocumentoDialog

