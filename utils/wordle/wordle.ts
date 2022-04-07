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

export const useWordle = () => {

  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [answer, setAnswer] = useState('')
  const [history, setHistory] = useState<Array<WordResult>>([])
  const count = useMemo(() => history.length, [history])

  const init = () => {
    //  TODO: load random word in word list
    setAnswer('audio')

    setHistory(() => [])
    setIsRunning(true)
  }

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
    setIsRunning(!isOver)

    return {
      isOver,
      result
    }
  }

  return {
    isRunning,
    count,
    history,
    checkWord,
    init
  }
}
