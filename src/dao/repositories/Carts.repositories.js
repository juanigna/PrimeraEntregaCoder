export default class ProductRepository {
    constructor(dao) {
        this.dao = dao;
    }

    getCarts = async () => {
        let result = await this.dao.getCarts();
        return result;
    }

    getCartById = async (id) => {
        let result = await this.dao.getCartById(id);
        return result;
    }

    createCart = async () => {
        let result = await this.dao.createCart();
        return result
    }

    updateCartProdById = async (id, productAdded) => {
        let result = await this.dao.updateCartProdById(id, productAdded);
        return result;
    }

    payCart = async (data) => {
        let result = await this.dao.payCart(data);
        return result;
    }
}