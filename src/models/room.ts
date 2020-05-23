export class Room {
    _id: string;
    title: string;
    messages?: Array<{
        user: {
            _id: string;
            username: string;
        },
        text: string;
    }>;
    date: string;
}
