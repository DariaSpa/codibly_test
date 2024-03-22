import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { GetFilteredProductPayload, GetProductsPayload, Product } from '../@types';


interface ProductState {
    products: Product[] | null;
    total: number;
    totalPages: number;
    isProductsLoading: boolean;
}

const initialState: ProductState = {
    products: null,
    total: 0,
    totalPages: 0,
    isProductsLoading: false,
};

export const productSlice = createSlice({
    name: 'product',
    initialState,
    reducers: {
        setProductsLoading: (state, action: PayloadAction<boolean>) => {
            state.isProductsLoading = action.payload;
        },
        getProducts: (state, action: PayloadAction<GetProductsPayload>) => { },
        setProducts: (
            state,
            action: PayloadAction<Product[]>
        ) => {
            state.products = action.payload;
        },
        getFilteredProduct: (state, action: PayloadAction<GetFilteredProductPayload>) => { },
        setTotalPages: (state, action: PayloadAction<number>) => {
            state.totalPages = action.payload;
        },
        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
        clearProducts: (state) => {
            state.products = null;
            state.totalPages = 0;
        },
    },
});

export const {
    setProductsLoading,
    getProducts,
    setProducts,
    getFilteredProduct,
    setTotalPages,
    setTotal,
    clearProducts,
} = productSlice.actions;

export const selectProducts = (state: RootState) => state.product.products;
export const selectTotalPages = (state: RootState) => state.product.totalPages;
export const selectTotal = (state: RootState) => state.product.total;
export const selectIsProductsLoading = (state: RootState) => state.product.isProductsLoading;

export default productSlice.reducer;