import '../../../../../styles/custom-datepicker.css'

import {
  Autocomplete,
  Button,
  createFilterOptions,
  FormControl,
  Grid,
  Typography,
} from '@mui/material'
import { Box, makeStyles, TextField } from '@mui/material'
import axios from 'axios'
import es from 'date-fns/locale/es'
import React, { createContext, useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import { Controller, SubmitHandler, UseFormReturn } from 'react-hook-form'
import AsyncSelect from 'react-select/async'

import { FormTextField } from '../../../../base/components/Form'
import { FacturaInputProps } from '../../interfaces/factura'
import { ClienteProps } from '../../../clientes/interfaces/cliente'
import { apiClienteBusqueda } from '../../../clientes/api/clienteBusqueda.api'

const filter = createFilterOptions<ClienteType>()

interface DatosAlumnosProps {
  form: UseFormReturn<FacturaInputProps>
}
// const filter = createFilterOptions<PaisesProps>()
const DatosAlumno = (props: DatosAlumnosProps) => {
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

  return (
    <>
      <Grid container spacing={1} rowSpacing={2}>
        <Grid item xs={12} lg={12} sm={12} md={12}>
          <FreeSoloCreateOption />
        </Grid>
        <Grid item xs={12} lg={5} md={6}></Grid>

        <Grid item xs={12} lg={12} sm={12} md={12}></Grid>
      </Grid>
    </>
  )
}

export default DatosAlumno

export function FreeSoloCreateOption() {
  const [value, setValue] = React.useState<ClienteType | null>(null)
  // Funcion asincrona para obtener monedas
  const [clientes, setClientes] = useState<ClienteProps[]>([])

  const getClientes = async () => {
    try {
      // Obtener la lista de clientes
      const resp = await apiClienteBusqueda('')
      setClientes(resp)
    } catch (error) {
      console.error('Error al obtener clientes:', error)
    }
  }
  useEffect(() => {
    getClientes() // Llamar a la función para obtener las monedas al montar el componente
  }, [])

  interface ClienteType {
    title: string
    year?: string
    inputValue?: string
  }

  const listClientes: readonly ClienteType[] = clientes.map((cliente) => ({
    title: cliente.nombres, // Ajusta esto según la propiedad correcta del cliente
    year: cliente.apellidos, // Ajusta esto según la propiedad correcta del cliente
  }))

  return (
    <Autocomplete
      value={value}
      onChange={(event, newValue) => {
        if (typeof newValue === 'string') {
          setValue({
            title: newValue,
          })
        } else if (newValue && newValue.inputValue) {
          // Create a new value from the user input
          setValue({
            title: newValue.inputValue,
          })
        } else {
          setValue(newValue)
        }
      }}
      filterOptions={(options, params) => {
        const filtered = filter(options, params)

        const { inputValue } = params
        // Suggest the creation of a new value
        const isExisting = options.some((option) => inputValue === option.title)
        if (inputValue !== '' && !isExisting) {
          filtered.push({
            inputValue,
            title: `Add "${inputValue}"`,
          })
        }

        return filtered
      }}
      selectOnFocus
      clearOnBlur
      handleHomeEndKeys
      id="free-solo-with-text-demo"
      options={listClientes}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue
        }
        // Regular option
        return option.title
      }}
      renderOption={(props, option) => <li {...props}>{option.title}</li>}
      sx={{ width: 300 }}
      freeSolo
      renderInput={(params) => <TextField {...params} label="Free solo with text demo" />}
    />
  )
}

interface ClienteType {
  title: string
  inputValue?: string
}