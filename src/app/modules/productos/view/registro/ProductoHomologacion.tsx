import { Autocomplete, FormControl, FormHelperText, Grid, TextField } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import { FunctionComponent, useEffect, useState } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'

import AlertError from '../../../../base/components/Alert/AlertError'
import { FormTextField } from '../../../../base/components/Form'
import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { reactSelectStyles } from '../../../../base/components/MySelect/ReactSelect'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import useAuth from '../../../../base/hooks/useAuth'
import { fetchSinProductoServicioPorActividad } from '../../../sin/api/sinProductoServicio.api'
import useQueryActividadesPorDocumentoSector from '../../../sin/hooks/useQueryActividadesPorDocumentoSector'
import {
  SinActividadesDocumentoSectorProps,
  SinProductoServicioProps,
} from '../../../sin/interfaces/sin.interface'
import { ProductoInputProps } from '../../interfaces/producto.interface'

interface OwnProps {
  form: UseFormReturn<ProductoInputProps>
}

type Props = OwnProps

const ProductoHomologacion: FunctionComponent<Props> = (props) => {
  const {
    form: {
      control,
      setValue,
      getValues,
      watch,
      formState: { errors, isSubmitting },
    },
  } = props

  const codigoActividadWatch = watch('codigoActividad')

  const [codigoProducto, setCodigoProducto] = useState('')
  const options = ['Tasa Cero Venta Libros', 'Tasa Cero Transporte de Carga']

  const [valor, setValor] = useState<string | null>(null)
  const [inputValor, setInputValor] = useState('')

  const generarCodigoProducto = (nombreProducto: string): string => {
    const palabras = nombreProducto
      .toUpperCase()
      .replace(/[^A-Z0-9 ]/g, '') // Eliminar caracteres especiales
      .split(' ')
      .map((palabra) => palabra.substring(0, 5)) // Limitar a 3 caracteres por palabra

    let palabrasValidas: string[]
    if (palabras.length > 3) {
      palabrasValidas = [...palabras.slice(0, 5), ...palabras.slice(-2)]
    } else {
      palabrasValidas = palabras
    }

    const codigo = palabrasValidas.join('')

    let numeroAleatorio = Math.floor(Math.random() * 100)
    // Asegurarse de que el número aleatorio tenga al menos 2 dígitos
    if (numeroAleatorio < 10) {
      numeroAleatorio += 10
    }

    const codigoFinal = `${codigo}-${numeroAleatorio}`.slice(
      0,
      Math.min(13, codigo.length + 4),
    ) // Limitar a máximo 13 caracteres
    // console.log('codigoFinal', codigoFinal)
    if (nombreProducto.length > 0) {
      // setValue('codigoProducto', codigoFinal)
      return codigoFinal
    } else {
      // setValue('codigoProducto', '')
      return ''
    }
  }

  useEffect(() => {
    const nombreProducto = getValues('nombre')

    // Verificar si el campo de codigoProducto ya tiene un valor
    const codigoProductoExistente = getValues('codigoProducto')
    const codigoProductoActualizado =
      codigoProductoExistente || generarCodigoProducto(nombreProducto)

    setCodigoProducto(codigoProductoActualizado)
    setValue('codigoProducto', codigoProductoActualizado)
  }, [getValues, setValue, watch('nombre') ? watch('nombre') : ''])

  // const {values, setFieldValue} = formik
  const { user } = useAuth()

  // CARGA DATOS DE ACTIVIDADES
  const { actividades, actIsError, actError, actLoading } =
    useQueryActividadesPorDocumentoSector()

  // CARGA DE DATOS DE PRODUCTOS SERVICIOS
  const { data: productosServicios, error: prodServError } = useQuery<
    SinProductoServicioProps[],
    Error
  >(
    ['productosServicios', codigoActividadWatch],
    async () => {
      return await fetchSinProductoServicioPorActividad(
        getValues('codigoActividad.codigoActividad'),
      )
    },
    {
      keepPreviousData: false,
    },
  )

  useEffect(() => {
    if (!actLoading && actividades && actividades.length > 0) {
      const actE = actividades.find(
        (act) => act.codigoActividad === user.actividadEconomica.codigoCaeb,
      )
      if (actE) {
        setValue('codigoActividad', actE)
      } else {
        setValue('codigoActividad', null)
      }
    }
  }, [actLoading, actividades])


  return (
    <>
      <SimpleCard title={'HOMOLOGACIÓN'}>
        <Grid container spacing={3}>
          <Grid item lg={12} md={12} xs={12}>
            {actError ? (
              <AlertError mensaje={actError.message} />
            ) : (
              <Controller
                name="codigoActividad"
                control={control}
                render={({ field }) => (
                  <FormControl fullWidth error={Boolean(errors.codigoActividad)}>
                    <MyInputLabel shrink>Actividad Económica</MyInputLabel>
                    <Select<SinActividadesDocumentoSectorProps>
                      {...field}
                      styles={reactSelectStyles}
                      name="codigoActividad"
                      placeholder={'Seleccione la actividad económica'}
                      menuPosition={'fixed'}
                      value={getValues('codigoActividad')}
                      onChange={async (codigoActividad: any) => {
                        field.onChange(codigoActividad)
                        setValue('codigoProductoSin', null)
                      }}
                      onBlur={async (val) => {
                        field.onBlur()
                      }}
                      isSearchable={false}
                      options={actividades}
                      getOptionValue={(item) => item.codigoActividad}
                      getOptionLabel={(item) =>
                        `${item.tipoActividad} - ${item.codigoActividad} - ${item.actividadEconomica}`
                      }
                    />
                  </FormControl>
                )}
              />
            )}
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            {prodServError ? (
              <AlertError mensaje={prodServError.message} />
            ) : (
              <Controller
                name={'codigoProductoSin'}
                control={control}
                render={({ field }) => (
                  <FormControl
                    fullWidth
                    component={'div'}
                    error={Boolean(errors.codigoProductoSin)}
                  >
                    <MyInputLabel shrink>Servicio Homologado</MyInputLabel>
                    <Select<SinProductoServicioProps>
                      {...field}
                      styles={reactSelectStyles}
                      menuPosition={'fixed'}
                      name="codigoProductoSin"
                      placeholder={'Seleccione Servicio para homolgación'}
                      value={field.value || null}
                      onChange={(codigoProductoSin) => {
                        field.onChange(codigoProductoSin)
                      }}
                      options={productosServicios}
                      getOptionValue={(ps) => ps.codigoProducto}
                      getOptionLabel={(ps) =>
                        `${ps.codigoProducto} - ${ps.descripcionProducto}`
                      }
                    />
                    <FormHelperText>{errors.codigoProductoSin?.message}</FormHelperText>
                  </FormControl>
                )}
              />
            )}
          </Grid>
          <Grid item lg={8} md={12} xs={12}>
            <Controller
              control={control}
              name={'nombre'}
              render={({ field }) => (
                <FormTextField
                  name="nombre"
                  label="Nombre Servicio"
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={() => {
                    const nombreProducto = field.value
                    const nuevoCodigoProducto = generarCodigoProducto(nombreProducto)
                    setCodigoProducto(nuevoCodigoProducto)
                    field.onBlur()
                  }}
                  error={Boolean(errors.nombre)}
                  helperText={errors.nombre?.message}
                />
              )}
            />
          </Grid>
          <Grid item lg={4} md={12} xs={12} sm={6}>
            <Controller
              control={control}
              name={'codigoProducto'}
              render={({ field }) => (
                <FormTextField
                  name="codigoProducto"
                  label="Código Servicio (SKU)"
                  value={field.value}
                  onChange={(event) => {
                    const nuevoCodigo = event.target.value.toUpperCase() // Convertir a mayúsculas antes de guardar
                    const esCodigoValido = /^[A-Z0-9-]*$/.test(nuevoCodigo)
                    if (esCodigoValido) {
                      field.onChange(nuevoCodigo)
                      setCodigoProducto(nuevoCodigo)
                    }
                  }}
                  onBlur={(event) => {
                    const nuevoCodigo = event.target.value // Mantener el valor en minúsculas
                    const esCodigoValido = /^[A-Z0-9-]*$/.test(nuevoCodigo)
                    if (esCodigoValido) {
                      field.value = nuevoCodigo.toUpperCase() // Convertir a mayúsculas antes de guardar
                      field.onBlur()
                      setCodigoProducto(nuevoCodigo.toUpperCase()) // Opcional: Actualizar el estado local si es necesario
                    }
                  }}
                  error={
                    Boolean(errors.codigoProducto) ||
                    (field.value !== undefined && !/^[A-Z0-9-]*$/.test(field.value))
                  }
                  helperText={errors.codigoProducto?.message}
                />
              )}
            />
          </Grid>
          <Grid item lg={4} md={12} xs={12} sm={12}>
            <Controller
              control={control}
              name={'tipoOperacion'}
              render={({ field }) => (
                <Autocomplete
                  defaultValue={null}
                  value={getValues('tipoOperacion')?.toString() ?? ''}
                  onChange={(event: any, newValue: string | null) => {
                    setValor(newValue)
                    setValue('tipoOperacion', newValue)
                  }}
                  inputValue={inputValor}
                  onInputChange={(event, newInputValue) => {
                    setInputValor(newInputValue)
                  }}
                  id="tipoOperacion"
                  options={options}
                  sx={{ width: '100%' }}
                  renderInput={(params) => {
                    if (errors.tipoOperacion) {
                      return (
                        <TextField
                          error
                          helperText={errors.tipoOperacion?.message}
                          {...params}
                          label="Seleccione Operación del Producto"
                          variant="outlined"
                        />
                      )
                    } else {
                      return (
                        <TextField
                          {...params}
                          label="Seleccione Operación del Producto"
                          variant="outlined"
                        />
                      )
                    }
                  }}
                />
              )}
            />
          </Grid>

          <Grid item lg={8} md={12} xs={12} sm={12}>
            <Controller
              name={'descripcion'}
              control={control}
              render={({ field }) => (
                <FormTextField
                  name="descripcion"
                  label="Descripcion"
                  multiline
                  minRows={3}
                  maxRows={5}
                  value={field.value}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                />
              )}
            />
          </Grid>
        </Grid>
      </SimpleCard>
    </>
  )
}

export default ProductoHomologacion

