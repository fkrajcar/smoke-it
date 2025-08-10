import { connect, Mongoose } from 'mongoose'

let isConnected = false

async function dbConnect() {
  console.log('Connecting to mongoDB...')

  if (isConnected) {
    console.log('Already connected to mongoDB.')

    return
  }

  try {
    if (process?.env?.MONGODB_URI) {
      const db: Mongoose = await connect(process.env.MONGODB_URI, {
        dbName: process?.env?.MONGODB_DB,
      })

      isConnected = !!db.connections[0].readyState

      console.log('Connected to mongoDB: ', !!db.connections[0].readyState)
    } else {
      console.error('.env file not found!')
    }
  } catch (e) {
    console.error('Error connecting to mongoDB: ', e)
  }
}

export default dbConnect
