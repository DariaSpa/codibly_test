import { create } from 'apisauce';
import { PER_PAGE } from './../constants';

const API = create({
    baseURL: 'https://reqres.in/api/products',
});

const getProducts = (page: number = 1, id?: number) => {
    let url = `/products?page=${page}&per_page=${PER_PAGE}`;

    if (id !== undefined && !isNaN(id)) {
        url += `&id=${id}`;
    }

    return API.get(url);
};

export default {
    getProducts,
};