import { Controller, Delete, Get, Patch, Post, Body } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { ObjectId } from 'mongoose';

@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @EventPattern('createCart')
  create(@Body() createCartDto: CreateCartDto) {
    return this.cartService.create(createCartDto);
  }

  @Get()
  @MessagePattern('findAllCart')
  findAll() {
    console.log('findAll cart controller microservice');
    return this.cartService.findAll();
  }

  @Get(':id')
  @MessagePattern('findOneCart')
  findOne(@Body('id') id: ObjectId) {
    return this.cartService.findOne(id);
  }

  @Patch(':id')
  @EventPattern('updateCart')
  update(@Body() updateCartDto: UpdateCartDto) {
    return this.cartService.update(updateCartDto.id, updateCartDto);
  }

  @Delete(':id')
  @EventPattern('removeCart')
  remove(@Body('id') id: ObjectId) {
    console.log('id', id);
    return this.cartService.remove(id);
  }
}
