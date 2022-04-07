import { Box, Button, Center, Flex, Heading, HStack, PinInput, PinInputField, Text, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { FormEvent, useRef, useState } from "react";
import { useWordle, WORD_CORRECT_TYPE } from "../utils/wordle/wordle";

const Wordle: NextPage = () => {

  const [isRunning, setIsRunning] = useState<boolean>(true)
  const [input, setInput] = useState<string>('')
  const firstInput = useRef<HTMLInputElement>(null)
  const {count, history, checkWord} = useWordle()

  const getTileStyle = (state: WORD_CORRECT_TYPE) => {
    switch(state){
      case WORD_CORRECT_TYPE.CORRECT:
        return {backgroundColor: 'green.300', textColor: 'white'}
      case WORD_CORRECT_TYPE.PARTITIAL:
        return {backgroundColor: 'yellow.300', textColor: 'white'}
      default:
        return {backgroundColor: 'gray.300', textColor: 'gray.900'}
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

    setInput('')
    firstInput?.current?.focus?.()
  }

  return (
    <VStack gap={4}>
      <Box textAlign="center">
        <Heading>wordle</Heading>
        <Text>count: {count}</Text>
      </Box>
      <VStack spacing={4}>
        {history.map((word, index) => (
            <HStack  key={`history-${index}`}>
              {word.map((char, charIndex) => (
                <Center key={`char-${index}-${charIndex}`} w={10} h={10} {...getTileStyle(char.state)}>
                  {char.word}
                </Center>
            ))}
            </HStack>
        ))}
      </VStack>
      <form onSubmit={submit}>
        <Center>
          <Flex gap={4}>
            <HStack flex="1">
              <PinInput type="alphanumeric" variant="flushed" value={input} onChange={setInput}>
                {Array(5).fill(undefined).map((_,idx) => (<PinInputField key={`input-${idx}`} {...(idx === 0 ? { ref:firstInput} : {})} />))}
              </PinInput>
            </HStack>
            <Button type="submit" colorScheme="blue" disabled={!isRunning}>check</Button>
          </Flex>
        </Center>
      </form>
    </VStack>
  )
}
export default Wordle