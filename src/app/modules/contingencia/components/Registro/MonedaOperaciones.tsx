import '../../../../../styles/custom-datepicker.css'

import { MonetizationOn } from '@mui/icons-material'
import {
  Autocomplete,
  Button,
  createFilterOptions,
  FormControl,
  FormHelperText,
  Grid,
  Typography,
} from '@mui/material'
import { Box, makeStyles, TextField } from '@mui/material'
import axios from 'axios'
import es from 'date-fns/locale/es'
import React, { createContext, useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

import AlertLoading from '../../../../base/components/Alert/AlertLoading'
import { FormTextField } from '../../../../base/components/Form'
import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { reactSelectStyles } from '../../../../base/components/MySelect/ReactSelect'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import { apiMonedas } from '../../../base/moneda/api/monedaListado.api'
import { MonedaProps } from '../../../base/moneda/interfaces/moneda'
import { FacturaInputProps } from '../../interfaces/factura'

interface OperacionesProps {
  form: UseFormReturn<FacturaInputProps>
}
const MonedaOperaciones = (props: OperacionesProps) => {
  // const { form } = props
  const {
    form: {
      control,
      watch,
      setValue,
      getValues,
      formState: { errors },
    },
  } = props

  // const [monedas, setMonedas] = useState([])
  const [monedas, setMonedas] = useState<MonedaProps[]>([])

  // Fucnion asincrona para obtener monedas
  const getMonedas = async () => {
    const resp = await apiMonedas()
    setMonedas(resp)
  }

  useEffect(() => {
    getMonedas() // Llamar a la función para obtener las monedas al montar el componente
  }, [])

  const options = [
    { value: 1, label: 'Venta' },
    { value: 2, label: 'Compra' },
  ]

  return (
    <>
      <Grid container spacing={1} rowSpacing={2}>
        <Grid item xs={12} lg={6} sm={12} md={12}>
          <Controller
            name="moneda"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.moneda)}>
                <MyInputLabel shrink>Tipo Moneda</MyInputLabel>
                <Select<MonedaProps>
                  {...field}
                  styles={{
                    ...reactSelectStyles,
                    // @ts-ignore
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      fontWeight: 'bold',
                    }),
                    // @ts-ignore
                    menu: (provided, state) => ({
                      ...provided,
                      backgroundColor: 'white', // Cambia este valor al color que desees
                      zIndex: 1000, // Ajusta el valor según sea necesario
                    }),
                  }}
                  name="moneda"
                  placeholder={'Seleccione la moneda de venta'}
                  value={field.value}
                  onChange={async (val: any) => {
                    if (!val) {
                      field.onChange(val)
                      return
                    }
                    field.onChange(val)
                    // Aquí actualizamos el valor del campo "tipoCambio" al valor correspondiente de la moneda seleccionada
                    const selectedMoneda = monedas.find(
                      (moneda) => moneda.sigla === val.sigla,
                    )
                    if (selectedMoneda) {
                      setValue('tipoCambio', selectedMoneda.tipoCambio)
                    }
                  }}
                  onBlur={async (val) => {
                    field.onBlur()
                  }}
                  isSearchable={false}
                  options={monedas}
                  getOptionValue={(item) => item.codigo.toString()}
                  getOptionLabel={(item) => `${item.descripcion} (${item.sigla})`}
                />
                {errors.moneda && (
                  <FormHelperText>{errors.moneda?.message}</FormHelperText>
                )}
              </FormControl>
            )}
          />
        </Grid>
        <Controller
          name="codigoTipoOperacion"
          control={control}
          render={({ field }) => (
            <Grid item xs={12} lg={6} sm={12} md={12}>
              <FormControl fullWidth error={Boolean(errors.codigoTipoOperacion)}>
                <MyInputLabel shrink>Tipo Moneda</MyInputLabel>
                <Select
                  {...field}
                  styles={{
                    ...reactSelectStyles,
                    // @ts-ignore
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      fontWeight: 'bold',
                    }),
                    // @ts-ignore
                    menu: (provided, state) => ({
                      ...provided,
                      backgroundColor: 'white', // Cambia este valor al color que desees
                      zIndex: 1000, // Ajusta el valor según sea necesario
                    }),
                  }}
                  options={[
                    { value: 1, label: 'Venta' },
                    { value: 2, label: 'Compra' },
                  ]}
                  placeholder={'Seleccione el tipo de operación'}
                  onChange={(selectedOption) => {
                    if (selectedOption) {
                      // @ts-ignore
                      const selectedMoneda = parseInt(selectedOption.value)
                      setValue('codigoTipoOperacion', selectedMoneda)
                    } else {
                      setValue('codigoTipoOperacion', 1)
                    }
                  }}
                  value={options.find(
                    (option) => option.value === getValues('codigoTipoOperacion'),
                  )}
                />
              </FormControl>
            </Grid>
          )}
        />
        <Grid item xs={12} lg={6} sm={12} md={12}>
          <Controller
            name="tipoCambio"
            control={control}
            render={({ field }) => (
              <FormTextField
                {...field}
                id="tipoCambio"
                label="Tipo de Cambio"
                type="number" // Cambiar a tipo número
                size="small"
                fullWidth
                onChange={(e) => {
                  let inputValue = e.target.value.trim()
                  inputValue = inputValue.replace(/,/g, '.')

                  if (inputValue === '') {
                    field.onChange('') // Mantener el campo vacío como cadena
                    setValue('tipoCambio', Number.NaN) // Mantener el estado vacío como cadena
                  } else if (/^\d+(\.\d{0,5})?$/.test(inputValue)) {
                    const numericValue = parseFloat(inputValue)
                    if (numericValue >= 0 && numericValue <= 99999999.99999) {
                      field.onChange(numericValue)
                      setValue('tipoCambio', numericValue)
                    }
                  }
                }}
                error={Boolean(errors.tipoCambio)}
                helperText={errors.tipoCambio?.message}
              />
            )}
          />
        </Grid>

        <Grid item xs={12} lg={6} sm={12} md={12}>
          <Controller
            name="tipoCambioOficial"
            control={control}
            render={({ field }) => (
              <FormTextField
                {...field}
                type="number"
                id="tipoCambioOficial"
                label="Tipo Cambio Oficial"
                fullWidth
                inputProps={{ step: '0.00001' }} // Establecer el paso para hasta 5 decimales
                error={Boolean(errors.tipoCambioOficial)}
                helperText={errors.tipoCambioOficial?.message}
                onChange={(e) => {
                  const inputValue = e.target.value.trim()

                  if (inputValue === '') {
                    field.onChange('') // Establecer el campo vacío
                  } else if (/^\d+(\.\d{0,5})?$/.test(inputValue)) {
                    const numericValue = parseFloat(inputValue)
                    if (numericValue >= 0 && numericValue <= 99999999.99999) {
                      field.onChange(numericValue)
                      setValue('tipoCambioOficial', numericValue)
                    }
                  }
                }}
              />
            )}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default MonedaOperaciones
