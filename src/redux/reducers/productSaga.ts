import { call, put, takeEvery } from 'redux-saga/effects';
import { PayloadAction } from '@reduxjs/toolkit';

import { GetFilteredProductPayload, GetProductsPayload, Product } from '../@types';
import { setError, setProducts, setTotal, setTotalPages } from './productSlice';

const TOTAL_PAGES = 1;
const TOTAL_PRODUCTS = 1;
const BASE_URL = 'https://reqres.in/api/products';

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
        let url = `${BASE_URL}?page=${page + 1}&per_page=${perPage}`;

        const response: Response = yield call(fetch, url);
        if (response.ok) {
            const data: FetchProductsResponse = yield response.json();
            yield put(setProducts(data.data));
            yield put(setTotalPages(data.total_pages));
            yield put(setTotal(data.total));
        } else {
            const errorMsg = response.status === 404 ? 'Products not found' : 'Error fetching products';
            yield put(setProducts([]));
            yield put(setError({ show: true, message: errorMsg }))
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
        let url = `${BASE_URL}?id=${id}`;
        const response: Response = yield call(fetch, url);
        yield put(setTotalPages(TOTAL_PAGES));
        yield put(setTotal(TOTAL_PRODUCTS));
        if (response.ok) {
            const data: FetchFilteredProductResponse = yield response.json();
            yield put(setProducts([data.data]));
        } else {
            const errorMsg = response.status === 404 ? 'Product not found' : 'Error fetching product';
            yield put(setError({ show: true, message: errorMsg }))
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