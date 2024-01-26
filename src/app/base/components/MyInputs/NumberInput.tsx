export const numberWithCommas = (
  x: number | undefined,
  { userTyping, input }: any,
  maximumFractionDigits: number = 2,
) => {
  if (userTyping) {
    return input
  }
  const options = {
    minimumFractionDigits: 2, // Cambiado a 2 para redondear a dos decimales
    maximumFractionDigits: maximumFractionDigits,
  }
  return Number(x).toLocaleString('en', options)
}
