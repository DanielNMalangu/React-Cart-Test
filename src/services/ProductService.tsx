import ProductItem from '../types/ProductItem';

class ProductService {
    apiUrl: string;

    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    getAllProducts = async (): Promise<ProductItem[]> => {
        let endpoint = this.apiUrl + "/products/";
        const response = await fetch(endpoint);
        try {
            if (!response.ok) {
                throw new Error("Problem fetching data");
            }

            return response.json();
        }
        catch (err) {
            return response.json();
        }
    }
}

export default ProductService