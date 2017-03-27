export default function parseCurrency(float) {
  if (float === null) return;

  return float.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
