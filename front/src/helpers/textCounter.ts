export default function textCounter(text: string, max: number): string {
  return `${(text || '').toString().length}/${max} caracteres`;
}
