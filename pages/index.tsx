import { Box, Container, Heading, LinkBox, LinkOverlay, SimpleGrid, Text, } from "@chakra-ui/react"
import type { NextPage } from "next"
import Head from "next/head"

const Home: NextPage = () => (
  <>
    <Head>
      <title>Chakra UI With Next.js Test</title>
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <Container as="main" maxW="container.xl" centerContent>
      <Heading>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </Heading>

      <Box borderWidth="1px" borderRadius="lg" overflow="hidden" m={4} p={4}>
        Get started by editing{" "}
        <code>pages/index.tsx</code>
      </Box>

      <SimpleGrid columns={4} spacing={8} >
        <LinkBox p="4" borderWidth="1px" rounded="md">
          <LinkOverlay href="https://nextjs.org/docs" >
            Documentation &rarr;
          </LinkOverlay>
          <Text>Find in-depth information about Next.js features and API.</Text>
        </LinkBox>

        <LinkBox p="4" borderWidth="1px" rounded="md">
          <LinkOverlay href="https://nextjs.org/learn" >
            Learn &rarr;
          </LinkOverlay>
          <Text>Learn about Next.js in an interactive course with quizzes!</Text>
        </LinkBox>

        <LinkBox p="4" borderWidth="1px" rounded="md">
          <LinkOverlay href="https://github.com/vercel/next.js/tree/canary/examples" >
            Examples &rarr;
          </LinkOverlay>
          <Text>Discover and deploy boilerplate example Next.js projects.</Text>
        </LinkBox>

        <LinkBox p="4" borderWidth="1px" rounded="md">
          <LinkOverlay href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app" >
            Deploy &rarr;
          </LinkOverlay>
          <Text>
            Instantly deploy your Next.js site to a public URL with Vercel.
          </Text>
        </LinkBox>
      </SimpleGrid>
    </Container>
  </>
)


export default Home
