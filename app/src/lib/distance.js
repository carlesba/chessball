export default function distance (a, b) {
  const d0 = Math.abs(a[0] - b[0])
  const d1 = Math.abs(a[1] - b[1])
  return d0 === 0 || d1 === 0 || d0 === d1
    ? Math.max(d0, d1)
    : -1
}
