import { Products, Carts } from "../factory.js"
import ProductRepository from './Products.repositories.js'
import CartRepository from './Carts.repositories.js'

export const productService = new ProductRepository(new Products())
export const cartService = new CartRepository(new Carts())