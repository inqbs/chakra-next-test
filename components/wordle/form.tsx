import { Button, Center, Flex, HStack, PinInput, PinInputField } from "@chakra-ui/react"
import { FormEvent, useRef, useState } from "react"

type WordleFormProps = {
  onSubmit: Function,
}

const WordleForm = ({onSubmit}: WordleFormProps) => {

  const [input, setInput] = useState<string>('')
  const firstInput = useRef<HTMLInputElement>(null)

  const clearInput = () => {
    setInput('')
    firstInput.current?.focus()
  }

  const submit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit({input, clearInput})
  }

  return (
    <form onSubmit={submit}>
      <Center>
        <Flex gap={4}>
          <HStack flex="1">
            <PinInput type="alphanumeric" variant="flushed" value={input} onChange={setInput}>
              {Array(5).fill(undefined).map((_, idx) => (
                <PinInputField 
                  key={`input-${idx}`} 
                  {...(idx === 0 ? { ref: firstInput } : {})}
                />)
              )}
            </PinInput>
          </HStack>
          <Button type="submit" colorScheme="blue">check</Button>
        </Flex>
      </Center>
    </form>
  )
}

export default WordleForm