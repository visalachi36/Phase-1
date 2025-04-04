import { Link } from "react-router-dom";

const products = [
    { id: 1, name: "Laptop", price: "$1000" },
    { id: 2, name: "Smartphone", price: "$600" },
    { id: 3, name: "Headphones", price: "$200" }
];

const ProductList = () => {
    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Link to={`/products/${product.id}`}>{product.name} - {product.price}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
