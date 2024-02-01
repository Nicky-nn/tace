import React, { FunctionComponent, useEffect, useState } from 'react'
import { CheckBox, Person } from '@mui/icons-material'
import { Button, Checkbox, Chip, FormControl, Grid, TextField } from '@mui/material'
import SimpleCard from '../../../../base/components/Template/Cards/SimpleCard'
import { H4 } from '../../../../base/components/Template/Typography'
import useAuth from '../../../../base/hooks/useAuth'
import { navigations } from '../../../../navigations'

interface OwnProps {}

type Props = OwnProps

const label = { inputProps: { 'aria-label': 'Checkbox demo' } }

const CuentaPerfil: FunctionComponent<Props> = (props) => {
  const { user } = useAuth()

  const [ventaLibrosChecked, setVentaLibrosChecked] = useState(true)
  const [transporteCargaChecked, setTransporteCargaChecked] = useState(true)

  const toggleVentaLibros = () => setVentaLibrosChecked((prev) => !prev)
  const toggleTransporteCarga = () => setTransporteCargaChecked((prev) => !prev)

  // MOdificamos el valor de la variable navigations

  // Guardamos las variables de Check en Cache

  // const ventaLibrosCheckedCache = localStorage.getItem('ventaLibrosChecked')
  // const transporteCargaCheckedCache = localStorage.getItem('transporteCargaChecked')
  const x = navigations

  useEffect(() => {
    x.map((item) => {
      if (item.name === 'Facturación') {
        item.children?.map((item2) => {
          if (item2.name === 'Registrar Venta Libros') {
            // item2.visible = ventaLibrosChecked
            item2.visible = localStorage.getItem('ventaLibrosChecked') === 'true'
          }
          if (item2.name === 'Registrar T. de Carga') {
            item2.visible = localStorage.getItem('transporteCargaChecked') === 'true'
          }
        })
      }
    })
  }, [ventaLibrosChecked, transporteCargaChecked])

  return (
    <>
      <SimpleCard title={'PERFIL DE USUARIO'} childIcon={<Person />}>
        <Grid container spacing={2}>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Nombres"
                value={user.nombres}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Apellidos"
                value={user.apellidos}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Cargo"
                value={user.cargo}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item lg={6} md={6} xs={12}>
            <FormControl fullWidth>
              <TextField
                label="Rol Operaciones"
                value={user.rol}
                variant="outlined"
                size="small"
              />
            </FormControl>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <H4>Restricción de accesos</H4>
            {user.dominio.map((item) => (
              <Chip key={item} label={item} variant="outlined" />
            ))}
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <H4>Facturación Menú</H4>
            <div>
              <label onClick={toggleVentaLibros} style={{ cursor: 'pointer' }}>
                <Checkbox
                  {...label}
                  // checked={ventaLibrosChecked}
                  checked={JSON.parse(localStorage.getItem('ventaLibrosChecked')!)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  style={{ marginRight: '0px' }}
                  onClick={() => {
                    localStorage.setItem(
                      'ventaLibrosChecked',
                      JSON.stringify(ventaLibrosChecked),
                    )
                    if (ventaLibrosChecked != ventaLibrosChecked) {
                      window.location.reload()
                    }
                  }}
                />
                <span
                  style={{
                    marginLeft: '8px',
                    marginRight: '8px',
                  }}
                >
                  Venta de Libros
                </span>
              </label>

              <label onClick={toggleTransporteCarga} style={{ cursor: 'pointer' }}>
                <Checkbox
                  {...label}
                  checked={JSON.parse(localStorage.getItem('transporteCargaChecked')!)}
                  sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                  style={{ marginRight: '0px' }}
                  onClick={() => {
                    localStorage.setItem(
                      'transporteCargaChecked',
                      JSON.stringify(transporteCargaChecked),
                    )
                    // console.log('transporteCargaChecked', transporteCargaChecked)
                  }}
                />
                <span
                  style={{
                    marginLeft: '8px',
                    marginRight: '8px',
                  }}
                >
                  Transporte de Carga
                </span>
              </label>
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  window.location.reload()
                }}
              >
                Guardar Cambios
              </Button>
            </div>
          </Grid>
        </Grid>
      </SimpleCard>
    </>
  )
}

export default CuentaPerfil

