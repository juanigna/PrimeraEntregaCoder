export default class ProductRepository{
    constructor(dao){
        this.dao = dao;
    }

    paginate = async(req, res ,page,limit, query, sort) => {
        let result = await this.dao.paginate(req, res ,page,limit, query, sort);
        return result
    }

    getProducts = async () => {
        let result = await this.dao.find();
        return result;
    }
    
    getProductById = async (id) => {
        let result = await this.dao.findById(id);
        return result;
    }

    createProduct = async (product) => {
        let result = await this.dao.create(product);
        return result
    }

    updateProduct = async (id, product) => {
        let result = await this.dao.updateProduct(id, product);
        return result;
    }

    deleteProduct = async (id) => {
        let result = await this.dao.deleteProduct(id);
        return result;
    }
}

