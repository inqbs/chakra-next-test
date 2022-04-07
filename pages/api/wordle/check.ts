import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  result: boolean
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const wordList: Array<string> = await import('@/assets/words.json')

  const {word} = req.query
  const result = Array.from(wordList).some(it=>it === word)

  res.status(200).json({result})
}
