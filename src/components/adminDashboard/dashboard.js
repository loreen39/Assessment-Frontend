import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  // State to store records
  const [records, setRecords] = useState([]);
  const [products, setProducts] = useState([]);

  // Fetch records from an API endpoint
  useEffect(() => {
    const fetchAllProducts = async () => {
        try{
            const response = await axios.get('http://localhost:4000/api/product');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products: ', error);
        }
    };
    fetchAllProducts();
  }, []);

  // Function to handle edit button click
  const handleEdit = (id) => {
    // Implement edit functionality here
    console.log('Edit record with ID:', id);
  };

  // Function to handle delete button click
  const handleDelete = (id) => {
    // Implement delete functionality here
    console.log('Delete record with ID:', id);
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Image</th>
            <th>Description</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, productIndex) => (
            <tr key={productIndex}>
              <td>{product.name}</td>
              <td>{product.image}</td>
              <td>{product.description}</td>
              <td>{product.price}</td>
              <td>
                <button onClick={() => handleEdit(product._id)}>Edit</button>
                <button onClick={() => handleDelete(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
