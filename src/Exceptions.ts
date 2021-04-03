export class InvalidInput extends Error {
  constructor(input: string) {
    super(`Invalid input: ${ input }.`)
  }
}
