import Select, { StylesConfig } from 'react-select'

export const ReactSelect = Select

/**
 * @description cuando enviar parametros para cambiar el color del select
 * @param error
 */
export const reactSelectStyle = (
  error: boolean = false,
): StylesConfig<any> | undefined => ({
  // @ts-ignore
  menuPortal: (base) => ({
    ...base,
    zIndex: 9999,
  }),
  // @ts-ignore
  menu: (provided) => ({ ...provided, zIndex: 9999 }),
  // @ts-ignore
  placeholder: (base) => ({
    ...base,
    color: !error ? '#a4a4a4' : '#FF3D57',
  }),
  // @ts-ignore
  control: (baseStyles, state) => ({
    ...baseStyles,
    borderColor: !error ? 'grey' : '#FF3D57',
    ':hover': {
      ...baseStyles[':hover'],
      borderColor: !error ? 'grey' : '#FF3D57',
    },
  }),
})

export const reactSelectStyles: StylesConfig<any> | undefined = {
  // @ts-ignore
  menuPortal: (base) => ({
    ...base,
    zIndex: 99999,
  }),
  // @ts-ignore
  placeholder: (base) => ({
    ...base,
    color: '#a4a4a4',
  }),
}
