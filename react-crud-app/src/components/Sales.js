import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Sales.css'; // You can create a similar CSS file for styling

function Sales({ token }) {
    const [sales, setSales] = useState([]);

    useEffect(() => {
        const fetchSales = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/sales', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSales(response.data);
            } catch (error) {
                alert('Error fetching sales data');
            }
        };
        fetchSales();
    }, [token]);

    return (
        <div className="sales-container">
            <h2>Sales Data</h2>
            <ul>
                {sales.map(sale => (
                    <li key={sale.id}>
                        <span>{sale.item}</span>: ${sale.amount}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Sales;
