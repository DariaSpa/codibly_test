import React, { useState, useEffect, useCallback } from 'react';
import { CircularProgress } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectProducts,
    getProducts,
    selectIsProductsLoading,
    selectTotal,
    getFilteredProduct,
} from '../../redux/reducers/productSlice';

import { PER_PAGE } from '../../utils/constants';
import { Product } from '../../redux/@types';
import debounce from '../../utils/debounce';

import ProductModal from '../ProductModal';
import FilterTextField from '../FilterTextField/FilterTextField';
import ProductTable from '../ProductTable/ProductTable';

import styles from "./ProductList.module.css";

const ProductList: React.FC = () => {
    const products = useSelector(selectProducts);
    const isLoading = useSelector(selectIsProductsLoading);
    const total = useSelector(selectTotal);
    const dispatch = useDispatch();

    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [filterId, setFilterId] = useState<string>('');
    const [page, setPage] = useState<number>(0);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getProducts({ page, perPage: PER_PAGE }));
    }, [dispatch]);

    const handleRowClick = (product: Product) => {
        setSelectedProduct(product);
        setModalOpen(true);
    };

    const handleFilterChange = useCallback(
        (value: string) => {
            setFilterId(value);
        },
        [setFilterId]
    );

    const handleFilterChangeDebounced = useCallback(
        debounce((value: string) => {
            setPage(0);
            if (value) {
                dispatch(getFilteredProduct({ id: parseInt(value) }));
            } else {
                dispatch(getProducts({ page, perPage: PER_PAGE }));
            }
        }, 300),
        []
    );

    const handleChangePage = (event: unknown, newPage: number) => {

        setPage(newPage);
        dispatch(getProducts({ page: newPage, perPage: PER_PAGE }));
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };


    return (
        <div className={styles.container}>
            <FilterTextField
                label='Filter by ID'
                value={filterId}
                onChange={(value) => {
                    handleFilterChange(value);
                    handleFilterChangeDebounced(value);
                }}
            />
            {isLoading && products?.length ? (
                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
                    <CircularProgress />
                </div>
            ) : (
                <ProductTable products={products} handleRowClick={handleRowClick} total={total} page={page} handleChangePage={handleChangePage} />
            )}
            <ProductModal open={modalOpen} onClose={handleCloseModal} product={selectedProduct} />
        </div>
    );
};

export default ProductList;