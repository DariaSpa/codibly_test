export type GetProductsPayload = {
    page: number;
    perPage: number;
}

export type GetFilteredProductPayload = {
    id: number;
}

export type Product = {
    id: number;
    name: string;
    year: number;
    color: string;
    pantone_value: string;
}