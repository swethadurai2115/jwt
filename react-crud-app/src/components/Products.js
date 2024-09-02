import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Products.css'; // You can create a similar CSS file for styling

function Products({ token }) {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setProducts(response.data);
            } catch (error) {
                alert('Error fetching products data');
            }
        };
        fetchProducts();
    }, [token]);

    return (
        <div className="products-container">
            <h2>Products Data</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <span>{product.name}</span>: ${product.price}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Products;
