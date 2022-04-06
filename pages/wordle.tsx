import { NextPage } from "next";
import { FormEvent, useState } from "react";
import { useWordle, WORD_CORRECT_TYPE } from "../utils/wordle/wordle";

const Wordle: NextPage = () => {

  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [input, setInput] = useState<string>('')
  const {count, history, checkWord} = useWordle()

  const getStyle = (state: WORD_CORRECT_TYPE) => {
    switch(state){
      case WORD_CORRECT_TYPE.CORRECT:
        return {backgroundColor: '#66d134'}
      case WORD_CORRECT_TYPE.PARTITIAL:
        return {backgroundColor: '#d1c134'}
      default:
        return {backgroundColor: '#AAAAAA'}
    }
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()

    if(input.length !== 5){
      alert(`target word's length is 5 letters.`)
      return
    }

    const result = checkWord(input)

    if(!result){
      alert('no word in dictionary')
      return 
    }

    if(result.isOver){
      alert('word is over')
      setIsRunning(false)
    }

    //  clear input
    setInput('')
  }

  return (
    <div>
      <h1>wordle</h1>
      <h3>count: {count}</h3>
      <ul>
        {history.map((word, index) => (
          <li key={`history-${index}`}>
            {word.map((char, charIndex) => (
              <div key={`char-${index}-${charIndex}`} style={getStyle(char.state)}>
                {char.word}
              </div>
           ))}
          </li>
        ))}
      </ul>
      <form onSubmit={submit}>
        <input type="text" value={input} onChange={e => setInput(e.target.value)} />
        <button disabled={!isRunning}>check</button>
      </form>
    </div>
  )
}
export default Wordle