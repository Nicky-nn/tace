import 'react-datepicker/dist/react-datepicker.css'
import '../../../../../styles/custom-datepicker.css'
import 'dayjs/locale/es' // Importa el idioma español

import { FormControl, FormHelperText, Grid } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { esES } from '@mui/x-date-pickers/locales'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker'
// import es from 'date-fns/locale/es'
import dayjs from 'dayjs'
import esLocale from 'dayjs/locale/es'
import { Controller, UseFormReturn } from 'react-hook-form'

import { FormTextField } from '../../../../base/components/Form'
import { FacturaInputProps } from '../../interfaces/factura'

interface RangeDaysProps {
  form: UseFormReturn<FacturaInputProps>
}

const RangeDaysContingencia = (props: RangeDaysProps) => {
  const { form } = props


  return (
    <div>
      <Grid container spacing={1} rowSpacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Controller
            name="fechaEmision"
            control={form.control}
            render={({ field }) => (
              <FormControl fullWidth error={Boolean(form.formState.errors.fechaEmision)}>
                <LocalizationProvider
                  dateAdapter={AdapterDayjs}
                  localeText={
                    esES.components.MuiLocalizationProvider.defaultProps.localeText
                  }
                  adapterLocale={'es'}
                >
                  <MobileDateTimePicker
                    defaultValue={dayjs()}
                    loading={false}
                    label="Fecha y hora de emisión"
                    sx={{ width: '100%' }}
                    views={['year', 'month', 'day', 'hours', 'minutes', 'seconds']}
                    onChange={(date) => {
                      form.setValue('fechaEmision', date?.format('DD/MM/YYYY HH:mm:ss'))
                    }}
                  />
                </LocalizationProvider>
                <FormHelperText>
                  {form.formState.errors.fechaEmision?.message}
                </FormHelperText>
              </FormControl>
            )}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <Controller
            name="numeroFactura"
            control={form.control}
            render={({ field }) => (
              <FormTextField
                {...field}
                id="numeroFactura"
                label="Número de factura"
                name="numeroFactura"
                type="number"
                fullWidth
                onChange={(e) => {
                  form.setValue('numeroFactura', parseInt(e.target.value))
                }}
                error={Boolean(form.formState.errors.numeroFactura)}
                helperText={form.formState.errors.numeroFactura?.message}
              />
            )}
          />
        </Grid>
      </Grid>
    </div>
  )
}

export default RangeDaysContingencia
