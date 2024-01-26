import { AllInclusive } from '@mui/icons-material'
import { useQuery } from '@tanstack/react-query'
import { ColumnFiltersState, PaginationState, SortingState } from '@tanstack/react-table'
import MaterialReactTable, {
  MRT_ColumnDef,
  MRT_RowSelectionState,
} from 'material-react-table'
import React, { FunctionComponent, useEffect, useMemo, useState } from 'react'
import { it } from 'yup-locales'

import { numberWithCommas } from '../../../base/components/MyInputs/NumberInput'
import useAuth from '../../../base/hooks/useAuth'
import { PAGE_DEFAULT, PageProps } from '../../../interfaces'
import { genApiQuery, genReplaceEmpty } from '../../../utils/helper'
import { localization } from '../../../utils/localization'
import { muiTableHeadCellFilterTextFieldProps } from '../../../utils/materialReactTableUtils'
import { apiProductosVariantes } from '../api/productosVariantes.api'
import {
  ProductoInputProps,
  ProductoVarianteProps,
} from '../interfaces/producto.interface'

interface OwnProps {
  codigoActividad: string
  setProductosVariantes: React.Dispatch<React.SetStateAction<ProductoVarianteProps[]>>
}

type Props = OwnProps

const ProductosVariantes: FunctionComponent<Props> = (props) => {
  const {
    user: { sucursal },
  } = useAuth()

  const columns = useMemo<MRT_ColumnDef<ProductoVarianteProps>[]>(
    () => [
      {
        accessorKey: 'codigoProducto',
        header: 'Código Producto',
        size: 100,
      },
      {
        accessorKey: 'nombre',
        header: 'Producto / Servicio',
      },
      {
        accessorKey: 'unidadMedida.descripcion',
        header: 'Unidad Medida',
        enableColumnFilter: false,
        size: 100,
      },
      {
        accessorKey: 'precio',
        header: 'Precio',
        muiTableBodyCellProps: {
          align: 'right',
        },
        accessorFn: (row) => {
          return numberWithCommas(row.precio, {})
        },
        size: 100,
      },
      {
        accessorKey: 'sinProductoServicio.descripcionProducto',
        header: 'Descripción Producto',
        enableColumnFilter: false,
      },
      {
        accessorKey: 'proveedor.nombre',
        header: 'Proveedor',
        enableColumnFilter: false,
        size: 100,
      },
      {
        accessorKey: 'sinProductoServicio.codigoActividad',
        header: 'Código Actividad',
        enableColumnFilter: false,
        size: 100,
      },
    ],
    [],
  )

  const { setProductosVariantes, codigoActividad } = props
  // DATA TABLE
  const [rowCount, setRowCount] = useState(0)
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [sorting, setSorting] = useState<SortingState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGE_DEFAULT.page,
    pageSize: PAGE_DEFAULT.limit,
  })
  // const [rowSelection, setRowSelection] = useState({})
  const [rowSelection, setRowSelection] = useState<MRT_RowSelectionState>({})

  // FIN DATA TABLE
  const { data, isError, isFetching, isLoading } = useQuery<any>(
    [
      'tableProductoVarianteDialog',
      columnFilters,
      pagination.pageIndex,
      pagination.pageSize,
      sorting,
    ],
    async () => {
      const query = genApiQuery(columnFilters, [
        `sinProductoServicio.codigoActividad=${codigoActividad}`,
      ])
      // console.log(query)
      const fetchPagination: PageProps = {
        ...PAGE_DEFAULT,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        reverse: sorting.length <= 0,
        query,
      }
      const { pageInfo, docs } = await apiProductosVariantes(fetchPagination)
      setRowCount(pageInfo.totalDocs)
      return docs
    },
    { keepPreviousData: true },
  )

  useEffect(() => {
    if (rowSelection) {
      const p = Object.keys(rowSelection)
      if (data) {
        const pvs = data!.filter((item: ProductoInputProps) =>
          p.includes(item.codigoProducto),
        )
        setProductosVariantes(pvs)
      }
    }
  }, [rowSelection, data, setProductosVariantes])

  return (
    <>
      <div style={{ maxHeight: '500px', overflowY: 'auto' }}>
        <MaterialReactTable
          columns={columns}
          data={data ?? []}
          initialState={{ showColumnFilters: true }}
          localization={localization}
          manualFiltering
          manualPagination
          manualSorting
          muiToolbarAlertBannerProps={
            isError
              ? {
                  color: 'error',
                  children: 'Error en cargar los datos',
                }
              : undefined
          }
          onColumnFiltersChange={setColumnFilters}
          onPaginationChange={setPagination}
          onSortingChange={setSorting}
          enableDensityToggle={false}
          enableGlobalFilter={false}
          rowCount={rowCount ?? 0}
          state={{
            isLoading,
            columnFilters,
            pagination,
            showAlertBanner: isError,
            showProgressBars: isFetching,
            sorting,
            density: 'compact',
            rowSelection,
          }}
          muiTableHeadCellFilterTextFieldProps={{
            ...muiTableHeadCellFilterTextFieldProps,
          }}
          enableRowSelection
          // enableSelectAll={false}
          onRowSelectionChange={setRowSelection}
          getRowId={(row) => row.codigoProducto}
          muiTableContainerProps={{
            sx: {
              maxHeight: '650px',
            },
          }}
          muiTableBodyRowProps={({ row }) => ({
            onClick: row.getToggleSelectedHandler(),
            sx: { cursor: 'pointer' },
          })}
        />
      </div>
    </>
  )
}

export default ProductosVariantes
