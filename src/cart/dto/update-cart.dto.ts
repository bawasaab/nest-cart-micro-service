import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';
import { ObjectId } from 'mongoose';

export class UpdateCartDto extends PartialType(CreateCartDto) {
  id: ObjectId;
}
