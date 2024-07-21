import { type NextApiRequest, type NextApiResponse } from 'next'
import fetch from 'node-fetch'
import axios from 'axios'

export async function GET(req: NextApiRequest, res: NextApiResponse): Promise<Response> {
  const { query } = req
  console.log('req', req)
  try {
    const response = await fetch('https://de1.api.radio-browser.info/json/stations/byname/?limit=10&offset=0', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (response.status !== 200) {
      throw new Error('Network response was not ok')
    }
    const data = await response.json()
    return Response.json({ status: 200, data })
  } catch (error) {
    console.error('Fetch error:', error)
    return Response.json({ status: 500, error: 'Error fetching data' })
  }
}
