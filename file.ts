export const writePokemonFile = (pokemon: string) => {
  // const encoder = new TextEncoder()
  // const data = encoder.encode(pokemon)
  // return Deno.writeFileSync('./solution.txt', data)
  return Deno.writeTextFile('./solution.txt', pokemon)
}
