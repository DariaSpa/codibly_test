import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { GetFilteredProductPayload, GetProductsPayload, Product } from '../@types';
import { setProducts, setTotal, setTotalPages } from './productSlice';

const TOTAL_PAGES = 1;
const TOTAL_PRODUCTS = 1;

type FetchProductsResponse = {
    page: number;
    total_pages: number;
    total: number;
    data: Product[];
}

type FetchFilteredProductResponse = {
    data: Product;
}

function* getProducts(
    action: PayloadAction<GetProductsPayload>
) {


    try {
        const { page, perPage } = action.payload;
        let url = `https://reqres.in/api/products?page=${page + 1}&per_page=${perPage}`;

        const response: Response = yield call(fetch, url);
        if (response.ok) {
            const data: FetchProductsResponse = yield response.json();
            yield put(setProducts(data.data));
            yield put(setTotalPages(data.total_pages));
            yield put(setTotal(data.total));
        } else {
            yield put(setProducts([]));
        }

    } catch (error: any) {
        console.error('Error fetching products:', error);
    }
}

function* getFilteredProduct(
    action: PayloadAction<GetFilteredProductPayload>
) {


    try {
        const { id } = action.payload;
        let url = `https://reqres.in/api/products?id=${id}`;
        const response: Response = yield call(fetch, url);
        yield put(setTotalPages(TOTAL_PAGES));
        yield put(setTotal(TOTAL_PRODUCTS));
        if (response.ok) {
            const data: FetchFilteredProductResponse = yield response.json();
            yield put(setProducts([data.data]));
        } else {
            yield put(setProducts([]));
        }

    } catch (error: any) {
        console.error('Error fetching products:', error);
    }
}

function* productSaga() {
    yield takeEvery('product/getProducts', getProducts);
    yield takeEvery('product/getFilteredProduct', getFilteredProduct);
}

export default productSaga;