import { useMemo, useState } from "react"

export enum WORD_CORRECT_TYPE {
  'NONE',
  'PARTITIAL',
  'CORRECT'
}

type Result = {
  word: string,
  state: WORD_CORRECT_TYPE
}

type WordResult = Array<Result>

type WordleResult = {
  isOver: boolean,
  result: WordResult
}

export const useWordle = () => {

  //  TODO: load random word in word list
  const answer: string = 'audio'

  const [history, setHistory] = useState<Array<WordResult>>([])
  const count = useMemo(() => history.length, [history])

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
  const checkIsOver = (result: WordResult) => result.every(it=>it.state === WORD_CORRECT_TYPE.CORRECT)

  const checkWord = (word: string | Array<string>) => {
    //  TODO: check word in word list

    //  split word and check spell currect
    const target: Array<string> = Array.isArray(word) ? word : word.split('')
    const result: WordResult = check(target)

    //  add history and count
    setHistory(history => [...history, result])

    const isOver: boolean = checkIsOver(result)

    return {
      isOver,
      result
    }
  }

  const reset = () => {
    setHistory([])
  }

  return {
    count,
    history,
    checkWord,
    reset
  }
}
