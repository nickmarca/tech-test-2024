import {
  Controller,
  Get,
  NotFoundException,
  BadRequestException,
  Param,
} from '@nestjs/common';
import { z } from 'zod';
import { CommsService } from './comms.service';
import { FREE_GIFT_THRESHOLD } from './constants';

@Controller('comms')
export class CommsController {
  constructor(private readonly comms: CommsService) {}

  @Get('/your-next-delivery/:userId')
  getYourNextDelivery(@Param('userId') userId: string) {
    const validations = z.string().uuid().safeParse(userId);

    if (!validations.success) {
      throw new BadRequestException(`User ID ${userId} is not a valid UUID`);
    }

    const user = this.comms.getUser(userId);

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const { firstName } = user;
    const catNames = this.comms.getUserCatNames(user);
    const nextOrderTotalPrice = this.comms.getNextOrderTotalPrice(user);

    return {
      title: `Your next delivery for ${catNames}`,
      message: `Hey ${firstName}! In two days' time, we'll be charging you for your next order for ${catNames}'s fresh food.`,
      totalPrice: this.comms.formatPrice(nextOrderTotalPrice),
      freeGift: nextOrderTotalPrice >= FREE_GIFT_THRESHOLD,
    };
  }
}
