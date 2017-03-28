export default function parseCurrency(float) {
  if (float === null) return;
  let parsedFloat = parseFloat(float).toFixed(2);

  return parsedFloat.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
