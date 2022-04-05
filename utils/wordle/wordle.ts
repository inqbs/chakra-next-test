import { useState } from "react"

enum WORD_CORRECT_TYPE {
  'NONE',
  'PARTITIAL',
  'CORRECT'
}

type Result = {
  word: string,
  state: WORD_CORRECT_TYPE
}

type WordResult = Array<Result>

export const useWordle = (answer: string) => {
  const [count, setCount] = useState(1)
  const [history, setHistory] = useState<Array<WordResult>>([])

  const checkState = (word:string, idx: number, source:string) => {
    const sourceArray = source.split('')
    switch (true) {
      case word === sourceArray?.[idx]:
        return WORD_CORRECT_TYPE.CORRECT
      case sourceArray.includes(word):
        return WORD_CORRECT_TYPE.PARTITIAL
      default:
        return WORD_CORRECT_TYPE.NONE
    }
  }

  const check = (word: Array<string>) => word.map((it, idx) => ({ word: it, state: checkState(it, idx, answer) }))

  const checkWord = (word: string | Array<string>) => {
    const target: Array<string> = Array.isArray(word) ? word : word.split('')
    const result: WordResult = check(target)

    setHistory(history => (history.push(result), history))
    setCount(count => count + 1)
    return result
  }

  //  TODO: check word is word

  return {
    count,
    history,
    checkWord
  }
}
