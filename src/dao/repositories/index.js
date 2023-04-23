import {Products} from "../factory.js"
import ProductRepository from './Products.repositories.js'

export const productService = new ProductRepository(new Products())

