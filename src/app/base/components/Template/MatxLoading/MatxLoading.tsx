import { Box, CircularProgress } from '@mui/material'
import { fontSize, styled } from '@mui/system'
import React, { useEffect, useState } from 'react'

const StyledLoading = styled('div')(() => ({
  width: '100%',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  '& img': {
    width: 'auto',
    height: '25px',
  },
  '& .circleProgress': {
    position: 'absolute',
    left: -7,
    right: 0,
    top: 'calc(50% - 25px)',
  },
}))

const Loading = () => {
  // Definir una matriz de mensajes
  const messages = [
    'Recuerda mantener segura tu información personal.',
    'No compartas tus contraseñas con nadie.',
    'Mantén tu software y antivirus actualizados.',
    'Navega con precaución en sitios desconocidos.',
    'No abras correos de remitentes desconocidos.',
    'No descargues archivos de fuentes desconocidas.',
    'No ingreses a sitios de dudosa procedencia.',
    'No compartas información personal en redes sociales.',
    // Agrega más mensajes aquí
  ]

  // Estado para almacenar el mensaje actual
  const [currentMessage, setCurrentMessage] = useState('')

  // Función para seleccionar un mensaje aleatorio
  const getRandomMessage = () => {
    const randomIndex = Math.floor(Math.random() * messages.length)
    return messages[randomIndex]
  }
  var x = 0

  // UseEffect para actualizar el mensaje al cargar el componente
  useEffect(() => {
    const randomMessage = getRandomMessage()
    setCurrentMessage(randomMessage)
    x = 1
  }, [x === 0])

  return (
    <StyledLoading>
      <Box position="relative">
        <img src="/assets/images/logo-circle.svg" alt="" />
        <CircularProgress className="circleProgress" />
      </Box>
      <div style={{ fontWeight: 'bold', marginTop: '10px', fontSize: '15px' }}>
        {currentMessage}
      </div>
    </StyledLoading>
  )
}

export default Loading
