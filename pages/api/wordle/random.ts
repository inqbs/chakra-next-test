import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  word: string
}

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const wordList: Array<string> = await import('@/assets/words.json')

  const word = wordList[getRandomInt(wordList.length)]

  res.status(200).json({word})
}
