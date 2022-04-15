import { ObjectId } from 'mongoose';

export class Cart {
  user_id: ObjectId;
  product_id: ObjectId;
  qty: number;
  price: number;
}
