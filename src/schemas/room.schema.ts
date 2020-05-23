import * as mongoose from 'mongoose';
import { v4 as uuid } from 'uuid';

export const RoomSchema = new mongoose.Schema({
    uuid: {type: String, default: uuid},
    title: String,
    connections: String,
    messages: [ {
        user: {
            username: String,
            _id: String
        },
        text: String,
        date: Date
    } ],
    date: {type: Date, default: Date.now}
});
