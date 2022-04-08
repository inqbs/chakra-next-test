import { Center, HStack } from "@chakra-ui/react"
import { WordResult, WORD_CORRECT_TYPE } from "@/utils/wordle/wordle"

type WordleHistoryProps = {
  word: WordResult,
}

const WordleHistory = ({word}: WordleHistoryProps) => {

  const getTileStyle = (state: WORD_CORRECT_TYPE) => {
    switch (state) {
      case WORD_CORRECT_TYPE.CORRECT:
        return { backgroundColor: 'green.300', textColor: 'white' }
      case WORD_CORRECT_TYPE.PARTITIAL:
        return { backgroundColor: 'yellow.300', textColor: 'white' }
      default:
        return { backgroundColor: 'gray.300', textColor: 'gray.900' }
    }
  }

  return (
    <HStack>
      {word.map((char, charIndex) => (
        <Center key={`char-${charIndex}`} w={10} h={10} {...getTileStyle(char.state)}>
          {char.word}
        </Center>
      ))}
    </HStack>
  )
}

export default WordleHistory