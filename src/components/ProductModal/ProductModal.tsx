import React from 'react';
import { Modal, Paper, Typography } from '@mui/material';

import CloseModalButton from '../CloseModalButton/CloseModalButton';
import { Product } from '../../redux/@types';


interface ProductModalProps {
    open: boolean;
    onClose: () => void;
    product: Product | null;
}

const ProductModal: React.FC<ProductModalProps> = ({ open, onClose, product }) => {
    if (!product) {
        return null;
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Paper sx={{
                padding: 3,
                borderRadius: 5,
                backgroundColor: '#f0f0f0',
                margin: 3,
                '&:focus-visible': {
                    outline: 'none',
                },
            }}>
                <CloseModalButton onClose={onClose} />
                <Typography variant="h4" gutterBottom>
                    {product.name}
                </Typography>
                <Typography>ID: {product.id}</Typography>
                <Typography>Year: {product.year}</Typography>
                <Typography>Color: {product.color}</Typography>
                <Typography>Pantone value: {product.pantone_value}</Typography>
            </Paper>
        </Modal>
    );
};

export default ProductModal;
