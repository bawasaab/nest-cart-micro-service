import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  Param,
  Body,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ObjectId } from 'mongoose';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @MessagePattern('createCart')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @MessagePattern('findAllCart')
  findAll() {
    return this.cartService.findAll();
  }

  @Get(':id')
  @MessagePattern('findOneCart')
  findOne(@Param('id') id: ObjectId) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  @MessagePattern('updateCart')
  update(@Body() updateCartDto: UpdateCartDto, @Param('id') id: ObjectId) {
    return this.cartService.update(id, updateCartDto);
  }

  @Delete(':id')
  @MessagePattern('removeCart')
  remove(@Param('id') id: ObjectId) {
    console.log('id', id);
    return this.cartService.remove(id);
  }
}
