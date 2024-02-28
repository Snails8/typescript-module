
// console.log(0 * 0)
// console.log(null * null)
// console.log(undefined * undefined)
// console.log(1 / 0)

const s = 10 * 10;
const a = 0 * 0; // 0
const b = null * null; // 0
const c = undefined * undefined; // NaN
const d = 1 / 0; // Infinity

function round(value, precision) {
  if (typeof value === "string" || isNaN(value) || !isFinite(value)) return null;
  if (value === 0) return 0;
  const safePrecision = Math.max(0, precision);

  const factor = Math.pow(10, safePrecision);
  return Math.round(value * factor) / factor;
}


console.log(round("test", 2)) // 0
console.log(round(b, 2)) // 0
console.log(round(c, 2)) // NaN
console.log(round(d, 2)) // Infinity
console.log(round(s, 2)) // 100
