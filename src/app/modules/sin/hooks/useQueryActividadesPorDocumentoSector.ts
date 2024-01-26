import { QueryKey } from '@tanstack/query-core'
import { useQuery } from '@tanstack/react-query'

import { fetchSinActividadesPorDocumentoSector } from '../api/sinActividadesPorDocumentoSector'
import {
  SinActividadesDocumentoSectorProps,
  SinActividadesProps,
} from '../interfaces/sin.interface'

/**
 * Hook para listado básico de tipos de producto
 * limit 1000
 */
const useQueryActividadesPorDocumentoSector = (queryKey: QueryKey = []) => {
  const {
    data: actividades,
    isLoading: actLoading,
    isError: actIsError,
    error: actError,
  } = useQuery<SinActividadesDocumentoSectorProps[], Error>(
    ['sinActividadesPorDocumentoSector', ...queryKey],
    async () => {
      const resp = await fetchSinActividadesPorDocumentoSector()
      if (resp.length > 0) {
        return resp
      }
      return []
    },
  )

  return { actividades, actLoading, actIsError, actError }
}

export default useQueryActividadesPorDocumentoSector
