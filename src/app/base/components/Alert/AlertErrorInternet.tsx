import { Alert } from '@mui/material'
import React, { Component } from 'react'
import { toast } from 'react-toastify'

if (!navigator.onLine) {
  toast.error('Se ha producido una caída de internet, por favor verifique su conexión')
}

export default class AlertErrorInternet extends Component {
  componentDidMount(): void {
    window.addEventListener('offline', this.handleOffline)
    window.addEventListener('online', this.handleOnline)
  }

  componentWillUnmount(): void {
    window.removeEventListener('offline', this.handleOffline)
    window.removeEventListener('online', this.handleOnline)
  }

  handleOffline = () => {
    toast.error('Se ha producido una caída de internet, por favor verifique su conexión')
  }

  handleOnline = () => {
    toast.success('Se ha restablecido la conexión a internet')
  }

  render(): JSX.Element {
    return <></>
  }
}
