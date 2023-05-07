import {faker} from "@faker-js/faker";

faker.locale = "es";

export const runProductMock = (quantity) => {
    const prods = [];

    for(let i=0; i<quantity; i++){
        const product = {
            id: i+1,
            title: faker.commerce.product(),
            description: faker.commerce.productDescription(),
            price: faker.commerce.price(),
            thumbail: faker.image.abstract(),
            code: faker.datatype.number(),
            stock: faker.datatype.number(),
            status: true,
            category: faker.commerce.product()
        }

        prods.push(product);
    };

    return prods;
}