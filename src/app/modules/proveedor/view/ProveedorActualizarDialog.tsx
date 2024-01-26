import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { FormikProps, useFormik } from 'formik'
import React, { FunctionComponent, useEffect } from 'react'

import { genRandomString } from '../../../utils/helper'
import { notSuccess } from '../../../utils/notification'
import { swalAsyncConfirmDialog, swalException } from '../../../utils/swal'
import { apiProveedor } from '../api/proveedor.api'
import { apiProveedorActualizar } from '../api/proveedorActualizar.api'
import { apiProveedorRegistro } from '../api/XproveedorRegistro.api'
import {
  PROVEEDOR_INITIAL_VALUES,
  ProveedorInputProp,
  ProveedorProps,
} from '../interfaces/proveedor.interface'
import { proveedorRegistroValidationSchema } from '../validator/proveedorRegistro.validator'
import ProveedorForm from './ProveedorForm'

interface OwnProps {
  keepMounted: boolean
  open: boolean
  codigo: string
  onClose: (value?: ProveedorProps) => void
}

type Props = OwnProps

const ProveedorActualizar: FunctionComponent<Props> = (props) => {
  const { onClose, open, ...other } = props

  const formik: FormikProps<ProveedorInputProp> = useFormik<ProveedorInputProp>({
    initialValues: PROVEEDOR_INITIAL_VALUES,
    validationSchema: proveedorRegistroValidationSchema,
    onSubmit: async (values) => {
      const { codigo, ...valuesWithoutCodigo } = values // Excluir la propiedad 'codigo'
      await swalAsyncConfirmDialog({
        preConfirm: () => {
          return apiProveedorActualizar(codigo || '', valuesWithoutCodigo).catch(
            (err) => {
              swalException(err)
              return false
            },
          )
        },
        text: 'Confirma que desea actualizar el proveedor?',
      }).then((resp) => {
        if (resp.isConfirmed) {
          notSuccess()
          onClose(resp.value)
        }
      })
    },
  })

  const handleCancel = () => {
    onClose()
  }

  useEffect(() => {
    if (open) {
      // Aquí debemos obtener los datos del proveedor y establecerlos en los valores iniciales del formulario
      // Puedes utilizar la función apiProveedorActualizar o cualquier otra función para obtener los datos
      // Actualiza el siguiente código con la lógica adecuada para obtener los datos del proveedor
      const obtenerDatosProveedor = async () => {
        try {
          const datosProveedor = await apiProveedor(props.codigo) // Reemplaza apiProveedor por la función adecuada
          formik.setValues(datosProveedor)
        } catch (error) {
          console.log(error)
        }
      }

      obtenerDatosProveedor()
    }
  }, [open])

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '100%', maxHeight: 500 } }}
      maxWidth="sm"
      open={open}
      {...other}
    >
      <DialogTitle>Editar Proveedor {props.codigo}</DialogTitle>
      <DialogContent dividers>
        <ProveedorForm formik={formik} />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          color={'error'}
          size={'small'}
          variant={'contained'}
          onClick={handleCancel}
        >
          Cancelar
        </Button>
        <Button
          onClick={formik.submitForm}
          size={'small'}
          style={{ marginRight: 25 }}
          variant={'contained'}
          disabled={!formik.isValid}
        >
          Actualizar Proveedor
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ProveedorActualizar
