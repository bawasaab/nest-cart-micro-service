import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type CartDocument = Cart & Document;

@Schema()
export class Cart {
  @Prop()
  user_id: string;

  @Prop()
  product_id: string;

  @Prop()
  qty: number;

  @Prop()
  price: number;
}

export const CartSchema = SchemaFactory.createForClass(Cart);
