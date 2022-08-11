/* This is a database connection function*/
import { Mongoose, connect } from 'mongoose'

const connection = {
    isConnected: false
} /* creating connection object*/

async function dbConnect() {
    /* check if we have connection to our databse*/
    if (connection.isConnected) {
        return
    }
    try {
        const db = await connect(process.env.MONGODB_URI, {
            dbName: process.env.MONGODB_DB
        })

        connection.isConnected = !!db.connections[0].readyState
        console.log('connected to mongodb', !!db.connections[0].readyState)
    } catch (e) {
        console.log('Error connecting to DB: ', e)
    }
}

export default dbConnect
