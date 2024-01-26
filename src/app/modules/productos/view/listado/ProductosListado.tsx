import { Cached, ConstructionOutlined, Delete, Edit, MenuOpen } from '@mui/icons-material'
import { Box, Button, Chip, IconButton } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import type {
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
} from '@tanstack/react-table'
import { SortingState } from '@tanstack/react-table'
import { sumBy } from 'lodash'
import MaterialReactTable, { MRT_ColumnDef } from 'material-react-table'
import React, { FunctionComponent, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

import AuditIconButton from '../../../../base/components/Auditoria/AuditIconButton'
import { numberWithCommas } from '../../../../base/components/MyInputs/NumberInput'
import SimpleMenu, { StyledMenuItem } from '../../../../base/components/MyMenu/SimpleMenu'
import StackMenuActionTable from '../../../../base/components/MyMenu/StackMenuActionTable'
import { PAGE_DEFAULT, PageProps } from '../../../../interfaces'
import { genApiQuery, genReplaceEmpty, openInNewTab } from '../../../../utils/helper'
import { localization } from '../../../../utils/localization'
import { notSuccess } from '../../../../utils/notification'
import { swalAsyncConfirmDialog, swalException } from '../../../../utils/swal'
import { apiProductos } from '../../api/producto.api'
import { apiProductosEliminar } from '../../api/productoEliminar.api'
import { ProductoProps } from '../../interfaces/producto.interface'
import { productosRouteMap } from '../../ProductosRoutesMap'

interface OwnProps {}

type Props = OwnProps

const tableColumns: MRT_ColumnDef<ProductoProps>[] = [
  {
    id: 'codigoProducto',
    header: 'Código Servicio',
    accessorFn: (row) => genReplaceEmpty(row.codigoProducto, ''),
  },
  {
    accessorKey: 'nombre',
    header: 'Producto',
    id: 'nombre',
    size: 150,
  },
  {
    accessorKey: 'descripcion',
    header: 'Descripción',
    id: 'descripcion',
    size: 200,
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
    size: 150,
  },
  {
    accessorKey: 'proveedor.nombre',
    header: 'Proveedor',
    id: 'proveedor',
    accessorFn: (row) => genReplaceEmpty(row.proveedor?.nombre, '-'),
  },
  {
    accessorKey: 'unidadMedida.descripcion',
    header: 'Unidad Medida',
    id: 'unidadMedida',
    accessorFn: (row) => genReplaceEmpty(row.unidadMedida?.descripcion, ''),
  },
  {
    accessorKey: 'precioComparacion',
    header: 'Precio Comparación',
    id: 'precioComparacion',
    size: 135,
    accessorFn: (row) => genReplaceEmpty(row.precioComparacion, ''),
  },
  {
    accessorFn: (row) => <Chip size={'small'} label={row.state} color={'success'} />,
    id: 'state',
    header: 'Estado',
  },
]

const ProductosListado: FunctionComponent<Props> = (props) => {
  const navigate = useNavigate()

  // ESTADO DATATABLE
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: PAGE_DEFAULT.page,
    pageSize: PAGE_DEFAULT.limit,
  })
  const [rowCount, setRowCount] = useState(0)
  const [isRefetching, setIsRefetching] = useState(false)
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})
  // FIN ESTADO DATATABLE

  const [refreshTable, setRefreshTable] = useState(false)

  const handleRefreshTable = async () => {
    setIsRefetching(true) // Establece el estado de "isRefetching" como verdadero para mostrar el indicador de carga

    try {
      await refetch() // Realiza la recarga de los datos utilizando la función "refetch" proporcionada por react-query
    } catch (error) {
      console.error('Error al recargar los datos:', error)
    }

    setIsRefetching(false) // Establece el estado de "isRefetching" como falso para ocultar el indicador de carga
  }

  const { data, isError, isFetching, isLoading, status, refetch } = useQuery<
    ProductoProps[]
  >(
    ['table-data', columnFilters, pagination.pageIndex, pagination.pageSize, sorting],
    async () => {
      const query = genApiQuery(columnFilters)
      const fetchPagination: PageProps = {
        ...PAGE_DEFAULT,
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
        reverse: sorting.length <= 0,
        query,
      }
      const { pageInfo, docs } = await apiProductos(fetchPagination)
      setRowCount(pageInfo.totalDocs)
      setRefreshTable(false)
      return docs
    },
    {
      refetchOnWindowFocus: true,
      keepPreviousData: true,
    },
  )

  const columns = useMemo(() => tableColumns, [])

  const handleDeleteData = async (data: any) => {
    // console.log(data.flat())
    const selectedRows = data.flat()
    if (selectedRows.length !== 1) {
      toast.error('Solo se puede seleccionar un elemento para eliminar.')
      return
    }

    const product = selectedRows[0].original.codigoProducto
    // console.log(product)
    await swalAsyncConfirmDialog({
      text: 'Confirma que desea eliminar el registro seleccionado y sus respectivas variantes, esta operación no se podrá revertir',
      preConfirm: () => {
        return apiProductosEliminar(product).catch((err) => {
          swalException(err)
          return false
        })
      },
    }).then((resp) => {
      if (resp.isConfirmed) {
        notSuccess()
        setRowSelection({})
        refetch()
      }
    })
  }

  return (
    <>
      <MaterialReactTable
        columns={columns}
        data={data ?? []}
        initialState={{
          showColumnFilters: true,
          columnVisibility: {
            descripcion: false,
            proveedor: false,
            precioComparacion: false,
          },
        }}
        manualFiltering
        manualPagination
        manualSorting
        muiToolbarAlertBannerProps={
          isError ? { color: 'error', children: 'Error loading data' } : undefined
        }
        onColumnFiltersChange={setColumnFilters}
        onPaginationChange={setPagination}
        onSortingChange={setSorting}
        enableDensityToggle={false}
        enableGlobalFilter={false}
        rowCount={rowCount}
        localization={localization}
        state={{
          isLoading,
          columnFilters,
          pagination,
          showAlertBanner: isError,
          showProgressBars: isRefetching,
          density: 'compact',
          sorting,
          rowSelection,
        }}
        muiSearchTextFieldProps={{
          variant: 'outlined',
          placeholder: 'Busqueda',
          InputLabelProps: { shrink: true },
          size: 'small',
        }}
        enableRowActions
        positionActionsColumn={'first'}
        renderRowActions={({ row }) => (
          <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '0.5rem' }}>
            <SimpleMenu
              menuButton={
                <>
                  <IconButton aria-label="delete">
                    <MenuOpen />
                  </IconButton>
                </>
              }
            >
              {/* MODIFICAR  */}
              <IconButton>
                <StyledMenuItem
                  onClick={() =>
                    navigate(
                      `${productosRouteMap.modificar}/${row.original.codigoProducto}`,
                    )
                  }
                >
                  <Edit />
                  Modificar
                </StyledMenuItem>
              </IconButton>
            </SimpleMenu>
            <AuditIconButton row={row.original} />
          </div>
        )}
        muiTableHeadCellFilterTextFieldProps={{
          sx: { m: '0.5rem 0', width: '95%' },
          variant: 'outlined',
          size: 'small',
        }}
        enableRowSelection
        onRowSelectionChange={setRowSelection}
        renderTopToolbarCustomActions={({ table }) => {
          return (
            <Box sx={{ display: 'flex', gap: '1rem', p: '0.5rem', flexWrap: 'wrap' }}>
              <StackMenuActionTable
                refetch={handleRefreshTable}
                sx={{ flexGrow: 1 }}
                // justifyContent={'flex-start'}
              >
                <Button
                  color="error"
                  onClick={() => handleDeleteData(table.getSelectedRowModel().flatRows)}
                  startIcon={<Delete />}
                  variant="contained"
                  size="small"
                  sx={{
                    height: '28px',
                    top: '0.5rem',
                  }}
                  disabled={table.getSelectedRowModel().flatRows.length === 0}
                >
                  Eliminar
                </Button>
              </StackMenuActionTable>
              {/*
              <IconButton onClick={handleRefreshTable} disabled={isFetching}>
                <Cached />
              </IconButton> */}
            </Box>
          )
        }}
        muiTableProps={{
          sx: {
            tableLayout: 'fixed',
          },
        }}
        displayColumnDefOptions={{
          'mrt-row-actions': {
            muiTableHeadCellProps: {
              align: 'center',
            },
            size: 120,
          },
        }}
      />
    </>
  )
}

export default ProductosListado
