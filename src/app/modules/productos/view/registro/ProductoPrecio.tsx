import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import InputNumber from 'rc-input-number'
import React, { FunctionComponent } from 'react'
import { Controller, UseFormReturn } from 'react-hook-form'
import Select, { SingleValue } from 'react-select'

import { MyInputLabel } from '../../../../base/components/MyInputs/MyInputLabel'
import { numberWithCommas } from '../../../../base/components/MyInputs/NumberInput'
import { NumeroMask } from '../../../../base/components/MyInputs/NumeroMask'
import { reactSelectStyles } from '../../../../base/components/MySelect/ReactSelect'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import { genReplaceEmpty, handleSelect } from '../../../../utils/helper'
import { apiSinUnidadMedida } from '../../../sin/api/sinUnidadMedida.api'
import { SinUnidadMedidaProps } from '../../../sin/interfaces/sin.interface'
import { ProductoInputProps } from '../../interfaces/producto.interface'
import { MonedaProps } from '../../../base/moneda/interfaces/moneda'
import { apiMonedas } from '../../../base/moneda/api/monedaListado.api'
import useAuth from '../../../../base/hooks/useAuth'

interface OwnProps {
  form: UseFormReturn<ProductoInputProps>
}

type Props = OwnProps

const ProductoPrecio: FunctionComponent<Props> = (props) => {
  const {
    form: {
      control,
      setValue,
      getValues,
      watch,
      formState: { errors },
    },
  } = props

  const {
    user: { moneda },
  } = useAuth()

  // const [variantesWatch, varianteWatch] = watch(['variantes', 'variante'])
  const inputMoneda = getValues('moneda')

  const {
    data: monedas,
    isLoading: monedaLoading,
    isError: monedasIsError,
    error: monedasError,
  } = useQuery<MonedaProps[], Error>(['apiMonedas'], async () => {
    const resp = await apiMonedas()
    if (resp.length > 0) {
      // monedaUsuario

      return resp
    }
    return []
  })

  const { data: unidadesMedida } = useQuery<SinUnidadMedidaProps[], Error>(
    ['unidadesMedida'],
    () => {
      return apiSinUnidadMedida()
    },
  )

  return (
    <SimpleCard title={'PRECIO'}>
      <Grid container columnSpacing={3} rowSpacing={2}>
        <Grid item lg={4} md={4} xs={12}>
          <Controller
            control={control}
            name={'codigoUnidadMedida'}
            render={({ field }) => (
              <FormControl
                fullWidth
                sx={{ mb: 1 }}
                error={Boolean(errors.codigoUnidadMedida)}
              >
                <MyInputLabel shrink>Unidad Medida</MyInputLabel>
                <Select<SinUnidadMedidaProps>
                  {...field}
                  styles={reactSelectStyles}
                  menuPosition={'fixed'}
                  placeholder={'Seleccione la unidad de medida'}
                  value={field.value}
                  onChange={async (unidadMedida: SingleValue<SinUnidadMedidaProps>) => {
                    field.onChange(unidadMedida)
                    setValue('codigoUnidadMedida', unidadMedida)
                  }}
                  options={unidadesMedida}
                  getOptionValue={(item) => item.codigoClasificador.toString()}
                  getOptionLabel={(item) =>
                    `${item.codigoClasificador} - ${item.descripcion}`
                  }
                />
                <FormHelperText>{errors.codigoUnidadMedida?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Controller
            name="moneda"
            control={control}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.moneda)}>
                <MyInputLabel shrink>Moneda de venta</MyInputLabel>
                <Select<MonedaProps>
                  {...field}
                  styles={{
                    ...reactSelectStyles,
                    // @ts-ignore
                    control: (styles) => ({
                      ...styles,
                      fontSize: '1.2em',
                    }),
                    menu: (provided, state) => ({
                      ...provided,
                      backgroundColor: 'white', // Cambia este valor al color que desees
                      zIndex: 1000, // Ajusta el valor según sea necesario
                    }),

                  }}
                  name="moneda"
                  placeholder={'Seleccione la moneda de venta'}
                  //@ts-ignore
                  value={field.value}
                  onChange={async (val: any) => {
                    field.onChange(val)
                    setValue('moneda', val)
                  }}
                  onBlur={async (val) => {
                    field.onBlur()
                  }}
                  isSearchable={false}
                  options={monedas}
                  getOptionValue={(item) => item.codigo.toString()}
                  getOptionLabel={(item) =>
                    `${item.descripcion} (${item.sigla}) - ${numberWithCommas(
                      item.tipoCambio,
                      {},
                    )}`
                  }
                />

                <FormHelperText>{errors.moneda?.message}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item lg={4} md={4} xs={12}>
          <Controller
            control={control}
            name={'precio'}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(errors.precio)}>
                <InputLabel>Precio</InputLabel>
                <OutlinedInput
                  {...field}
                  label={'Precio'}
                  size={'small'}
                  value={field.value !== null ? field.value.toString() : ''}
                  onFocus={handleSelect}
                  onChange={field.onChange}
                  onBlur={field.onBlur}
                  inputComponent={NumeroMask as any}
                  inputProps={{}}
                  error={Boolean(errors.precio)}
                />
                <FormHelperText>{errors.precio?.message || ''}</FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
      </Grid>
    </SimpleCard>
  )
}

export default ProductoPrecio

