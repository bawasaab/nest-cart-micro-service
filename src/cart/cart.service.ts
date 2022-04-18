import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart, CartDocument } from './schemas/cart.schema';
import { Model, ObjectId } from 'mongoose';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<CartDocument>) {}

  async create(createCartDto: CreateCartDto) {
    try {
      const createdUser = new this.cartModel(createCartDto);
      return createdUser.save();
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async findAll() {
    try {
      const user = await this.cartModel.find().exec();
      if (!user) {
        throw new NotFoundException('Cart not found');
      }
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async findOne(id: ObjectId) {
    try {
      const user = await this.cartModel.findById(id).exec();
      if (!user) {
        throw new NotFoundException('Cart not found');
      }
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async update(id: ObjectId, updateCartDto: UpdateCartDto) {
    try {
      const updatedUser = await this.cartModel.findById(id).exec();
      if (!updatedUser) {
        throw new NotFoundException('Cart not found');
      }
      if (updateCartDto.user_id) {
        updatedUser.user_id = updateCartDto.user_id;
      }
      if (updateCartDto.product_id) {
        updatedUser.product_id = updateCartDto.product_id;
      }
      if (updateCartDto.qty) {
        updatedUser.qty = +updateCartDto.qty;
      }
      if (updateCartDto.price) {
        updatedUser.price = +updateCartDto.price;
      }
      return updatedUser.save();
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }

  async remove(id) {
    try {
      await this.cartModel.findById(id).exec();
      // await this.cartModel.findOne({ _id: id }).exec();
      const user = await this.cartModel.deleteOne({ _id: id }).exec();
      return user;
    } catch (ex) {
      throw new UnprocessableEntityException(ex.toString());
    }
  }
}
