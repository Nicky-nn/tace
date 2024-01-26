# ⚡SISTEMA DE FACTURACION ISI-INVOICE DOCUMENTO SECTOR ALQUILERES

Sistema desarrollado bajo la estructura de datos [vite](https://www.npmjs.com/package/vite)

Se debe tener instalado las extensiones `eslint` y `pretty` en su editor de codigo (vsCode, WebStorm, etc)

**Obligatoriedad el uso de YARN par la instalación de paquetes**

```bash
# Instalación global
npm i -g eslint
```

Comandos para formateo, dev. build

```bash
## Clonar el repositorio
git clone [repo]

## Instalar depedencias
yarn install

## Ejecuta los formateos y busca de errores en sitaxis
yarn lint

## Ejecución modo developer
yarn dev

## Compilacion
yarn build

## Vista previa del proyecto en produccion
yarn preview
```

#### FLUJO DE LOS SERVICIOS PARA ALQUILERES

https://doc.isipass.net/

```bash
## Listado de datos
## QUERY
query FACTURAS_ALQUILER {
    facturasAlquiler(
        limit: Int! = 10,
        page: Int = 1,
        reverse: Boolean = false
        query: String,
        entidad: EntidadParamsInput
    ):FacturaAlquilerConnection
}

## OBTIENE UN REGISTRO
## QUERY
facturaAlquiler(cuf: String!):FacturaAlquiler

## Registro de una factura
## MUTATION
facturaAlquilerRegistro(
input: FacturaAlquilerInput!
entidad: EntidadParamsInput
)

## Anulación de facturas
## MUTATION
facturaAlquilerAnulacion(
cufs: [String]!
codigoMotivo: Int!
)

## Registro offine
## MUTATION
facturaAlquilerContingenciaRegistro(
input: FacturaAlquilerInput!
contingencia: FacturaContingenciaInput
entidad: EntidadParamsInput
)

## LISTADO DE NOTAS DE CREADITO DEBITO PARA FACTUR
## QUERY
notasCreditoDebitoAlq(
limit: Int! = 10
page: Int = 1
reverse: Boolean = false
query: String
entidad: EntidadParamsInput
):NotaDebitoCreditoConnection

## BUSQUEDA POR CUF
## QUERY
notaCreditoDebitoAlq(cuf: String!)

## REGISTRO NCD
## MUTATION
notaCreditoDebitoAlqRegistro(
input: NotaDebitoCreditoAlqInput!
entidad: EntidadParamsInput
): NotaCreditoDebito

## ANULACION DE LA NOTA DE CREDITO DEBITO
## MUTATION
notaCreditoDebitoAlqAnular(
cufs: [String]!
codigoMotivo: Int!
entidad: EntidadParamsInput
)
```
