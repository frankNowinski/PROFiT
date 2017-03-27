export default function parseCurrency(float) {
  return float.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
