import WordleForm from "@/components/wordle/form";
import WordleHistory from "@/components/wordle/history";
import { Box, Button, Heading, Text, useToast, VStack } from "@chakra-ui/react";
import { NextPage } from "next";
import { useEffect, } from "react";
import { useWordle } from "../utils/wordle/wordle";

const Wordle: NextPage = () => {

  const { count, history, isRunning, checkWord, init } = useWordle()
  const toast = useToast()

  useEffect(() => {
    init()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const submit = async ({ input, clearInput }: { input: string, clearInput: Function }) => {
    if (input.length !== 5) {
      toast({
        description: `Word's length is 5 letters.`,
        status: 'warning',
        duration: 3000,
      })
      return
    }

    const result = await checkWord(input)

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

    clearInput()
  }

  return (
    <VStack gap={4}>
      <Box textAlign="center">
        <Heading>wordle</Heading>
        <Text>count: {count}</Text>
      </Box>
      <VStack spacing={4}>
        {history.map((word, index) => (<WordleHistory word={word} key={`history-${index}`} />))}
      </VStack>
      {
        isRunning ?
          (<WordleForm onSubmit={submit} />) :
          (<Button colorScheme="red" onClick={() => init()}>Reset</Button>)
      }
    </VStack>
  )
}
export default Wordle