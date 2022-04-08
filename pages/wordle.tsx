import { Box, Button, Center, Flex, Heading, HStack, Input, PinInput, PinInputField, Text, useToast, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { FormEvent, useEffect, useRef, useState } from "react";
import { useWordle, WORD_CORRECT_TYPE } from "../utils/wordle/wordle";

const Wordle: NextPage = () => {

  const [input, setInput] = useState<string>('')
  const firstInput = useRef<HTMLInputElement>(null)
  const { count, history, isRunning, checkWord, init } = useWordle()
  const toast = useToast()

  useEffect(() => {
    init()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const submit = async (e: FormEvent) => {
    e.preventDefault()

    if (input.length !== 5) {
      toast({
        description: `Word's length is 5 letters.`,
        status: 'warning',
        duration: 3000,
      })
      return
    }

    const result = await checkWord(input)

    setInput('')
    firstInput?.current?.focus?.()

    if (!result) {
      toast({
        description: `No word in dictionary`,
        status: 'warning',
        duration: 3000,
      })
      return
    }

    if (result.isOver) {
      toast({
        description: `Congraturations! You win in ${count} words.`,
        status: 'success',
        duration: 3000,
      })
    }
  }

  return (
    <VStack gap={4}>
      <Box textAlign="center">
        <Heading>wordle</Heading>
        <Text>count: {count}</Text>
      </Box>
      <VStack spacing={4}>
        {history.map((word, index) => (
          <HStack key={`history-${index}`}>
            {word.map((char, charIndex) => (
              <Center key={`char-${index}-${charIndex}`} w={10} h={10} {...getTileStyle(char.state)}>
                {char.word}
              </Center>
            ))}
          </HStack>
        ))}
      </VStack>
      {
        isRunning ?
          (
            <form onSubmit={submit}>
              <Center>
                <Flex gap={4}>
                  <HStack flex="1">
                    <PinInput type="alphanumeric" variant="flushed" value={input} onChange={setInput}>
                      {Array(5).fill(undefined).map((_, idx) => (<PinInputField key={`input-${idx}`} {...(idx === 0 ? { ref: firstInput } : {})} />))}
                    </PinInput>
                  </HStack>
                  <Button type="submit" colorScheme="blue">check</Button>
                </Flex>
              </Center>
            </form>
          ) :
          (
            <Button colorScheme="red" onClick={() => init()}>Reset</Button>
          )
      }
    </VStack>
  )
}
export default Wordle