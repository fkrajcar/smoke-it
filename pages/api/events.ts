import dbConnect from '../../util/dbConnect'
import { Event } from './models/Events'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req

  await dbConnect()

  switch (method) {
    case 'GET':
      try {
        const events = await Event.find({}) /* find all the data in our database */

        // const event = new Event({
        //   transaction_id: 'test',

        //   payload: {
        //     id: 'test2',

        //     entity: {
        //       id: 'test3',
        //     },
        //   },
        // });

        // await event.save();


        console.log('get', events)
        res.status(200).json({ success: true, data: events })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      try {
        // const event = await Event.create(
        //   req.body
        // ) /* create a new model in the database */
        const event = new Event(req.body);

        await event.save();
        console.log('post', event, req.body);

        res.status(201).json({ success: true, data: event })
      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}
