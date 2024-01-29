import { yupResolver } from '@hookform/resolvers/yup'
import { ExpandMore } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Alert,
  AlertTitle,
  Divider,
  Grid,
  Tooltip,
  Typography,
} from '@mui/material'
import { Box, padding } from '@mui/system'
import { useForm } from 'react-hook-form'

import AlertLoading from '../../../base/components/Alert/AlertLoading'
import SimpleContainer from '../../../base/components/Container/SimpleContainer'
import Breadcrumb from '../../../base/components/Template/Breadcrumb/Breadcrumb'
import SimpleCard from '../../../base/components/Template/Cards/SimpleCard'
import useAuth from '../../../base/hooks/useAuth'
import usePlantillaDetalleExtra from '../../base/detalleExtra/hook/usePlantillaDetalleExtra'
import MonedaOperaciones from '../components/Registro/MonedaOperaciones'
import RangeDaysContingencia from '../components/Registro/RangeDaysContingencia'
import { FacturaInitialValues, FacturaInputProps } from '../interfaces/factura'
import { VentaRegistroValidator } from '../validator/ventaRegistroValidator'
import DatosActividadEconomica from './registro/DatosActividadEconomica'
import { DatosTransaccionComercial } from './registro/DatosTransaccionComercial'
import { DetalleTransaccionComercial } from './registro/DetalleTransaccionComercial'
import FacturaDetalleExtra from './registro/FacturaDetalleExtra'
import MetodosPago from './registro/MetodosPago'
import VentaTotales from './registro/VentaTotales'

const VentaRegistro = () => {
  const { user } = useAuth()

  const form = useForm<FacturaInputProps>({
    defaultValues: {
      ...FacturaInitialValues,
    },
    // @ts-ignore
    resolver: yupResolver(VentaRegistroValidator),
  })

  const { pdeLoading, plantillaDetalleExtra } = usePlantillaDetalleExtra()

  return (
    <SimpleContainer>
      <div className="breadcrumb">
        <Breadcrumb
          routeSegments={[
            { name: 'Contingencia', path: '/contingencia/registro' },
            { name: 'Registrar Contingencia' },
          ]}
        />
      </div>
      <form noValidate>
        <Grid container spacing={2}>
          <Grid item lg={12} md={12} xs={12}>
            <Accordion sx={{ backgroundColor: '#E5F6FD' }}>
              <Tooltip title={'Click para Abrir / Cerrar'} placement={'top'} arrow>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls="panel1a-content"
                >
                  <Typography variant={'subtitle2'}>Información Importante...</Typography>
                </AccordionSummary>
              </Tooltip>
              <AccordionDetails>
                <Alert severity="info">
                  Esta información es relevante para los siguientes códigos de eventos
                  significativos (5, 6 y 7) al registrar una factura por contingencia:
                  <br></br>
                  <strong>Código 5:</strong> Corte de suministro de energía eléctrica.
                  <br></br>
                  Si experimentaste un corte de energía eléctrica que afectó tu sistema,
                  utiliza este código para indicar la contingencia.<br></br>
                  <strong>Código 6:</strong> Virus informático o falla de software.
                  <br></br>
                  En caso de una infección por virus informáticos o una falla en tu
                  software que impida el registro normal de la factura, usa este código.
                  <br></br>
                  <strong>Código 7:</strong> Cambio de infraestructura de sistema o falla
                  de hardware.<br></br>
                  Si realizaste cambios en la infraestructura de tu sistema o si ocurrió
                  una falla en el hardware que afectó la facturación, este código es el
                  adecuado.
                  <br></br>
                  Recuerda crear el evento significativo.
                </Alert>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <DatosActividadEconomica form={form} />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            <DetalleTransaccionComercial form={form} periodoDate={''} />
          </Grid>
          <Grid item lg={12} md={12} xs={12}>
            {pdeLoading ? (
              <AlertLoading mensaje={'Cargando...'} />
            ) : (
              <FacturaDetalleExtra form={form} detalleExtra={plantillaDetalleExtra} />
            )}
          </Grid>
          <Grid item lg={7} md={12} xs={12}>
            <div style={{ padding: '20px 0' }}>
              <SimpleCard title={'Registro Factura por Contingencia'}>
                <RangeDaysContingencia form={form} />
              </SimpleCard>
            </div>
            <div style={{ padding: '20px 0' }}>
              <SimpleCard title={'Cliente / Método de pago'}>
                <DatosTransaccionComercial form={form} user={user!} />
                <Divider />
                <MetodosPago form={form} />
              </SimpleCard>
            </div>
          </Grid>

          <Grid item lg={5} md={12} xs={12}>
            <div style={{ padding: '20px 0' }}>
              <VentaTotales form={form} />
            </div>
          </Grid>
        </Grid>
      </form>
      <Box py="12px" />
    </SimpleContainer>
  )
}

export default VentaRegistro
