import axios from 'axios'

export const fetcher = (url: string) =>
  axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_FACEIT_API_CLIENT_TOKEN}`,
      },
    })
    .then((res) => res.data)
