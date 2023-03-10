import {
  bold,
  bgGreen,
  bgYellow,
  bgBrightBlack,
} from 'https://deno.land/std@0.171.0/fmt/colors.ts'

export const colorMethods = {
  green: bgGreen,
  yellow: bgYellow,
  gray: bgBrightBlack,
}

export function colorLetter(
  color: 'green' | 'yellow' | 'gray',
  letter: string
) {
  const bg = colorMethods[color]
  const colorizedLetter = bg(bold(` ${letter} `))
  return ` ${colorizedLetter} `
}
