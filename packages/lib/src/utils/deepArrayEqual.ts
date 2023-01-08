
export default function deepArrayEqual<T>(current: Array<T>, another: Array<T>): boolean {
  return current.length === another.length && current.every((n, i) => n === another[i]);
}