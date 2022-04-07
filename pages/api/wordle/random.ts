import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  word: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  res.status(200).json({word: 'audio'})
}
