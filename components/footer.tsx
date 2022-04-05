import Image from 'next/image'
import NextLink from 'next/link'
import { Box, Container, Link } from "@chakra-ui/react"

const Footer = () => (
  <Container as="footer">
    <Box p={5} textAlign="center">
      <NextLink
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        passHref
      >
        <Link >
          Powered by{" "}
          <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
        </Link>
      </NextLink>
    </Box>
  </Container>
)

export default Footer