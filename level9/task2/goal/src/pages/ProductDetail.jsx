import { useParams } from "react-router-dom";

const products = [
    { id: 1, name: "Laptop", price: "$1000", description: "A high-performance laptop with SSD storage." },
    { id: 2, name: "Smartphone", price: "$600", description: "A latest-gen smartphone with a stunning camera." },
    { id: 3, name: "Headphones", price: "$200", description: "Noise-cancelling wireless headphones with deep bass." }
];

const ProductDetail = () => {
    const { id } = useParams();
    const product = products.find(p => p.id === parseInt(id));

    if (!product) {
        return <h2>Product not found!</h2>;
    }

    return (
        <div>
            <h1>{product.name}</h1>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
        </div>
    );
};

export default ProductDetail;
