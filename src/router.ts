import { Router } from 'express';
import multer from 'multer';

import { listCategories } from './app/useCases/categories/listCategories';
import { createCategory } from './app/useCases/categories/createCategory';
import { createProduct } from './app/useCases/products/createProduct';
import { listProducts } from './app/useCases/products/listProducts';
import { listProductsByCategory } from './app/useCases/categories/listProductsByCategory';
import { deleteProducts } from './app/useCases/products/deleteProducts';
import { listOrders } from './app/useCases/orders/listOrders';
import { createOrder } from './app/useCases/orders/createOrder';
import { changeOrderStatus } from './app/useCases/orders/changeOrderStatus';
import { cancelOrder } from './app/useCases/orders/cancelOrder';
import { deleteCategory } from './app/useCases/categories/deleteCategory';

export const router = Router();

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, callback) {
      callback(null, '../api/uploads');
    },
    filename(req, file, callback){
      callback(null, `${Date.now()}-${file.originalname}`);
    }
  })
});

router.get('/' , (req, res) => res.send('FUNCIONA'));

//List categories
router.get('/categories', listCategories);

//Create category
router.post('/categories', createCategory);

//delete categories
router.delete('/categories/:categoryId', deleteCategory);

//List Products
router.get('/products', listProducts);

//Create Products
router.post('/products', upload.single('image'), createProduct);

//edit products
router.patch('/products/:productId', deleteProducts);

//delete Products
router.delete('/products/:productId', deleteProducts);

//Get Products by Category
router.get('/categories/:categoryId/products', listProductsByCategory);

//list orders
router.get('/orders', listOrders);

//Create order
router.post('/orders', createOrder);

//Change order status
router.patch('/orders/:orderId', changeOrderStatus);

//Delete/cancel order
router.delete('/orders/:orderId', cancelOrder);
