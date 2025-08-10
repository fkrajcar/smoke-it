// import { NextApiRequest, NextApiResponse } from 'next'

// import dbConnect from '../../util/dbConnect'
// import { Event } from './models/Events'

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { method, body } = req

//   await dbConnect()

//   switch (method) {
//     case 'GET':
//       try {
//         const events = await Event.find({})

//         res.status(200).json({ success: true, data: events })
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     case 'POST':
//       try {
//         const event = new Event(body)

//         const eventExists = await Event.exists({
//           transaction_id: event.transaction_id,
//         })

//         if (eventExists) {
//           res
//             .status(400)
//             .json({ success: false, message: 'Event already exists' })
//         } else {
//           await event.save()

//           res.status(201).json({ success: true, data: event })
//         }
//       } catch (error) {
//         res.status(400).json({ success: false })
//       }
//       break
//     default:
//       res.status(400).json({ success: false })
//       break
//   }
// }
