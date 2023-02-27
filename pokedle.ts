import { colorLetter } from './colors.ts'
import { writePokemonFile } from './file.ts'
import { isGodMode } from './env.ts'

const MAX_TRIES = 6
const AVAILABLE_POKEDEX = 898

const previousGuesses: Array<string>= []
const randomId = Math.ceil(Math.random() * (AVAILABLE_POKEDEX - 1))

const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${randomId}`)
const responseJSON = await response.json()
const pokemon = responseJSON.name.toUpperCase()

if (isGodMode) {
  writePokemonFile(pokemon)
}

let globalResults = ''

const askWord = () => {
  const response = prompt('Guess the pokemon')
  if (response === null || response === '' || response === undefined) {
    return { error: 'You must enter a possible pokemon name' }
  } else if (response.length !== pokemon.length) {
    return { error: 'You must enter a possible pokemon name with ' + pokemon.length + ' letters' }
  } else if (previousGuesses.includes(response.toUpperCase())) {
    return { error: 'You already tried this pokemon name!' }
  } else if (!/^[a-zA-Z]+$/.test(response)) {
    return { error: 'You must enter only letters' }
  }
  
  return { response: response.toUpperCase() }
}

function print (guess: string) {
  console.clear()

  let results = ''

  const letters: Array<string> = [...guess]

  letters.forEach((letter, index) => {
    if (letter === pokemon[index]) {
      results += colorLetter('green', letter)
    } else if (pokemon.includes(letter)) {
      results += colorLetter('yellow', letter)
    } else {
      results += colorLetter('gray', letter)
    }
  })

  globalResults += `${results} \n\n`
  console.log(globalResults)
}

const tries = 0

const start = (tries: number) => {
  const { _length } = pokemon
  console.log(tries)
  if (tries >= MAX_TRIES) {
    console.error('You lost!')
    console.log('The pokemon was: ' + pokemon)
    return
  }

  let guess = ''
  while (guess === '') {
    const {error, response} = askWord()
    if (error) {
      console.error(error)
      continue
    }
  
    if (response) guess = response
  }

  if (guess === pokemon) {
    // check if guess is correct
    print(guess)
    console.log('🎉 You won! 🎉')
  } else {
    // check if guess is incorrect
    print(guess)
    console.log('🤔 Try again! 🤔')
    tries++
    start(tries)
  }

}

let timesPlayed = Number(localStorage.getItem('timesPlayed')) || 0
timesPlayed++
localStorage.setItem('timesPlayed', timesPlayed.toString())
console.log('🎮 Welcome to Pokedle! 🎮')
console.log('You have played ' + timesPlayed + ' times')
console.log('You have ' + MAX_TRIES + ' tries to guess the pokemon')
console.log('The pokemon has ' + pokemon.length + ' letters')
console.log('Good luck! 🍀')
start(tries)