import chai from "chai";
import mongoose from "mongoose";
import { productService } from "../src/dao/repositories/index.js";
import { productModel } from "../src/dao/models/Product.model.js";

const expect = chai.expect;

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://juani:${process.env.MONGO_PASS}@cluster0.3wutrwm.mongodb.net/test`)


describe('Products', () => {
    before(async() => {
        mongoose.connection.collections.products.drop()
    })

    it('should get all products', async () => {
        const result = await productService.getProducts()
        expect(result).not.to.be.undefined;
    })

    it("Should get a product by id", async () => {
        const result = await productService.getProductById('646098fd1fea8cf0833d6342')
        expect(result).not.to.be.undefined;
    })

    it("Should create a product", async () => {
        const result = await productService.createProduct({
            id: "888888888aaaaa",
            name: "test",
            description: "test",
            code: "1243",
            price: 123,
            status: false,
            stock: 123,
            category: "Category 1",
        })
        expect(result).not.to.be.undefined;
    })

    it("Should update a product", async () => {
        const product = await productModel.findOne({code: "1243"})
        const result = await productService.updateProduct(product._id, {
            id: "123313",
            name: "test 2",
            description: "test 2",
            code: "12243",
            price: 1232,
            status: false,
            stock: 12323,
            category: "Category 2",
        })
        expect(result).not.to.be.undefined;
    })
})