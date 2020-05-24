import * as mongoose from 'mongoose';

export const RoomSchema = new mongoose.Schema({
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
