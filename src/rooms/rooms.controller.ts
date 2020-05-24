import { Room } from '../models/room';
import { Controller, Get, Req, HttpException, HttpStatus, UseGuards } from '@nestjs/common';
import { CommonResult } from '../models/common-result';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ExtractJwt } from 'passport-jwt';

@Controller('api/rooms')
// @UseGuards(RolesGuard)
export class RoomsController {
    constructor(private readonly roomsService: RoomsService) {
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getAllRooms(@Req() request): Promise<Room[]> {
        try {
            const allRooms: Room[] = await this.roomsService.findAllRooms();
            return allRooms.map(elem => {
                const newElem = {...elem};
                delete newElem.messages;
                let lastMessage = elem.messages[elem.messages.length - 1];
                newElem.lastMessage = lastMessage ? lastMessage.text : null;
                newElem.lastMessageDate = lastMessage ? lastMessage.date : null;
                return newElem;
            }).sort((a, b) => {
                return this.getDateForRoom(b) - this.getDateForRoom(a);
            });
        } catch (err) {
            throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get('/room/:id')
    async findRoom(@Req() request): Promise<Room> {
        try {
            return await this.roomsService.findOneRooms(request.params.id);
        } catch (err) {
            throw new HttpException(new CommonResult(false, 'Server error'), HttpStatus.BAD_REQUEST);
        }
    }

    private getDateForRoom(room: Room) {
        const date = room.lastMessageDate;
        return date ? new Date(date).getTime() : 0;
    }
}

