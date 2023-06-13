import chai from "chai";
import mongoose from "mongoose";
import { cartService } from "../src/dao/repositories/index.js";


const expect = chai.expect;

mongoose.set('strictQuery', true);
mongoose.connect(`mongodb+srv://juani:${process.env.MONGO_PASS}@cluster0.3wutrwm.mongodb.net/test`)


describe("Carts", () => {
    before(async () => {
        mongoose.connection.collections.carts.drop()
    })

    it("Should get all carts", async () => {
        const result = await cartService.getCarts();
        expect(result).not.to.be.undefined;
    })

    it("Should get a cart by id", async () => {
        const result = await cartService.getCartById("64889e885701c0921323cf70");
        expect(result).not.to.be.undefined;
    })

    it("Should create a cart", async () => {
        const result = await cartService.createCart();
        expect(result).not.to.be.undefined;
    })

    it("Should update a cart", async () => {
        const result = await cartService.updateCartProdById("64889e885701c0921323cf70", {
            id: "6488a0c3d073aaf09196cf8f",
            quantity: 1,
            amount: 200
        })
        expect(result).not.to.be.undefined;

    })

    it("Should pay a cart", async () => {
        const result = await cartService.payCart(
            {
                name:
                    "test prod",
                description:
                    "test prod desc",
                code:
                    String(new Date()),
                price:
                    10000,
                status:
                    false,
                stock:
                    100,
                category:
                    "Category 3",
                amount:
                    10000,
                purchase_datatime:
                    new Date()
            })
        expect(result).not.to.be.undefined;

    })
})