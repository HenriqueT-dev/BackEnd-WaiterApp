import { Request, Response } from 'express';

import { Product } from '../../models/Product';

export async function deleteProducts(req: Request, res: Response){
  // try {
  //   const { productId } = req.params;
  //   await Product.findByIdAndDelete(productId);

  //   res.sendStatus(204);

  // } catch(error) {
  //   console.log(error);
  //   res.sendStatus(500);
  // }

  try {
    const { productId } = req.params;
    console.log('Product ID to delete:', productId);

    // Verifique se o produto existe antes de excluí-lo
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).send('Produto não encontrado');
    }

    // Se o produto existe, exclua-o
    await Product.findByIdAndDelete(productId);
    res.sendStatus(204);

  } catch(error) {
    console.log(error);
    res.sendStatus(500);
  }
}
