import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './dashbord.module.css';
import Navbar from '../Navbar/navbar';
import { setDataFetched } from '../../Redux/dataFetchedSlice';
import { setProducts } from '../../Redux/productSlice';
import { useNavigate } from 'react-router-dom'; 
import { useAuthContext } from '../../hooks/useAuthContext';
import {jwtDecode} from 'jwt-decode';

const Dashboard = () => {

  const dispatch = useDispatch();
  const dataFetched = useSelector(state => state.dataFetched.fetched);
  const [editingProduct, setEditingProduct] = useState(null);
  const [originalProductData, setOriginalProductData] = useState({});
  const [totalRecords, setTotalRecords] = useState(0);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');


  const products = useSelector(state => state.products);
  const userInfo = localStorage.getItem('userInfo');
  const userAccess = JSON.parse(userInfo);
  //const userAccess = { accessToken: "invalidToken" }; // Mocking an incorrect access token
  console.log("user info : " , userAccess.accessToken);


useEffect(() => {
  const fetchData = async () => {
    try {
      if (!products.length) { // Check if products are not fetched yet
        const response = await axios.get('http://localhost:4000/api/product', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${userAccess.accessToken}`
          }
        });
        dispatch(setProducts(response.data));
        setTotalRecords(response.data.length)
        console.log('Products fetched from API:', response.data);
      }
      dispatch(setDataFetched(true));
    } catch (error) {
      console.error('Error fetching products: ', error);
    }
  };

  if (!dataFetched) {
    console.log('Fetching data...');
    fetchData();
  } else {
    setTotalRecords(products.length)
    console.log('Data already fetched.');
  }
}, [dataFetched, dispatch, products.length, userAccess, userAccess.accessToken]);

  const handleInputChange = (e, field, id) => {
    const updatedProducts = products.map(product => {
      if (product._id === id) {
        return { ...product, [field]: e.target.value };
      }
      return product;
    });
    dispatch(setProducts(updatedProducts));
  };

  const handleSave = async (id) => {
    try {
      const updatedProduct = products.find(product => product._id === id);
      await axios.put(`http://localhost:4000/api/product/${id}`, updatedProduct);
      setEditingProduct(null);
      Swal.fire('Updated!', 'Your record has been updated.', 'success');
    } catch (error) {
      console.error('Error updating record:', error);
      Swal.fire('Error!', 'An error occurred while updating the record.', 'error');
    }
  };

  const handleEdit = (id) => {
    setEditingProduct(id);
    const productToEdit = products.find(product => product._id === id);
    setOriginalProductData(productToEdit);
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    // Revert the changes made during editing
    setProducts(products.map(product => {
      if (product._id === editingProduct) {
        return originalProductData;
      }
      return product;
    }));
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4000/api/product/${id}`)
          .then(response => {
            console.log('Record deleted successfully');
            dispatch(setProducts(products.filter(product => product._id !== id)));
            setTotalRecords(totalRecords - 1); // Update total records on deletion
            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
          })
          .catch(error => {
            console.error('Error deleting record:', error);
            Swal.fire('Error!', 'An error occurred while deleting the record.', 'error');
          });
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/product',  { name, description, price });
      dispatch(setProducts([...products, response.data]));
      Swal.fire('Success!', 'Product added successfully.', 'success');
      // Clear input fields after successful submission
      setName('');
      setDescription('');
      setPrice('');
      setTotalRecords(totalRecords + 1); // Update total records on insertion
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire('Error!', 'An error occurred while adding the product.', 'error');
    }
  };

  return (
    <>
    <Navbar totalRecords={totalRecords}/>  {/* Pass totalRecords as prop */}
    <h1>Admin's Dashboard</h1>
    <div className={styles.dashboard}> {/* Apply className from CSS module */}
      <div className={styles.formContainer} > {/* Apply className from CSS module */}
      <h2 className={styles.formHeader}>Add a Product</h2>
        <form onSubmit={handleSubmit} className={styles.gridForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Name:</label>
              <input className={styles.formInput} type="text" id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>Description:</label>
              <input className={styles.formInput} type="text" id="description" name="description" value={description} onChange={(e) => setDescription(e.target.value)} required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.formLabel}>Price:</label>
              <input className={styles.formInput} type="number" id="price" name="price" value={price} onChange={(e) => setPrice(e.target.value)} required />
            </div>
            
            <button type="submit" className={styles.submitButton}>Add Product</button>
        </form>

      </div>
      <div className={styles.tableContainer}> {/* Apply className from CSS module */}
      <h2 className={styles.tableHeader}>All Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products && products.map((product, productIndex) => (
              <tr key={productIndex}>
                <td>
                  {editingProduct === product._id ? (
                    <input
                      type="text"
                      value={product.name}
                      onChange={(e) => handleInputChange(e, 'name', product._id)}
                    />
                  ) : (
                    product.name
                  )}
                </td>
               
                <td>
                  {editingProduct === product._id ? (
                    <input
                      type="text"
                      value={product.description}
                      onChange={(e) => handleInputChange(e, 'description', product._id)}
                    />
                  ) : (
                    product.description
                  )}
                </td>
                <td>
                  {editingProduct === product._id ? (
                    <input
                      type="number"
                      value={product.price}
                      onChange={(e) => handleInputChange(e, 'price', product._id)}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td className={styles.actions}> {/* Apply className from CSS module */}
                  {editingProduct === product._id ? (
                    <>

                      <button onClick={() => handleSave(product._id)} className={styles.saveButton}>Save</button>
                      <button onClick={handleCancelEdit} className={styles.cancelButton}>Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => handleEdit(product._id)} className={styles.editButton}>Edit</button>
                  )}
                  <button onClick={() => handleDelete(product._id)} className={styles.deleteButton}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};


export default Dashboard;
