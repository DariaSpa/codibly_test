import React from "react";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from "@mui/material";
import { Product } from "../../redux/@types";
import { PER_PAGE } from "../../utils/constants";

type ProductTableProps = {
    products: Product[] | null;
    handleRowClick: (product: Product) => void;
    total: number;
    page: number;
    handleChangePage: (event: unknown, newPage: number) => void;
}


const ProductTable: React.FC<ProductTableProps> = ({ products, handleRowClick, total, page, handleChangePage }) => {
    return (
        <Box sx={{ width: '100%' }}>
            <Paper sx={{ width: '100%', mb: 2 }}>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Year</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {products && products.map((product) => (
                                <TableRow key={product.id} onClick={() => handleRowClick(product)} style={{ backgroundColor: product.color }}>
                                    <TableCell>{product.id}</TableCell>
                                    <TableCell>{product.name}</TableCell>
                                    <TableCell>{product.year}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={total}
                    rowsPerPage={PER_PAGE}
                    page={page}
                    onPageChange={handleChangePage}
                    rowsPerPageOptions={[]}
                />
            </Paper>
        </Box>
    )
}

export default ProductTable;