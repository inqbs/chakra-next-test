import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  result: boolean
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {word} = req.query
  res.status(200).json({result: true})
}
