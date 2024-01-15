import { Request, Response } from 'express';

import { Order } from '../../models/Order';
import { io } from '../../..';

export async function createOrder(req: Request, res: Response){
  try {
    const { table, products } = req.body;

    const orders = await Order.create({ table, products });
    const orderDetails = await orders.populate('products.product');

    io.emit('orders@new', orderDetails);
    res.status(201).json(orders);

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: 'Internal server error',
    });
  }
}
