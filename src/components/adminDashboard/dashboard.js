import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import styles from './dashbord.module.css';

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [originalProductData, setOriginalProductData] = useState({});
  const [formData, setFormData] = useState({
    name: '',
    image: '',
    description: '',
    price: ''
  });

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products: ', error);
      }
    };
    fetchAllProducts();
  }, []);

  const handleInputChange = (e, field, id) => {
    const updatedProducts = products.map(product => {
      if (product._id === id) {
        return { ...product, [field]: e.target.value };
      }
      return product;
    });
    setProducts(updatedProducts);
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
            setProducts(products.filter(product => product._id !== id));
            Swal.fire('Deleted!', 'Your record has been deleted.', 'success');
          })
          .catch(error => {
            console.error('Error deleting record:', error);
            Swal.fire('Error!', 'An error occurred while deleting the record.', 'error');
          });
      }
    });
  };

  const handleFormInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, image: file });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('image', formData.image);

      const response = await axios.post('http://localhost:4000/api/product', formDataToSend);
      setProducts([...products, response.data]);
      Swal.fire('Success!', 'Product added successfully.', 'success');
      setFormData({ name: '', image: '', description: '', price: '' });
    } catch (error) {
      console.error('Error adding product:', error);
      Swal.fire('Error!', 'An error occurred while adding the product.', 'error');
    }
  };

  return (
    <>
    <h1>Admin's Dashboard</h1>
    <div className={styles.dashboard}> {/* Apply className from CSS module */}
      <div className={styles.formContainer} > {/* Apply className from CSS module */}
      <h2 className={styles.formHeader}>Add a Product</h2>
        <form onSubmit={handleSubmit} className={styles.gridForm}>
            <div className={styles.formGroup}>
              <label htmlFor="name" className={styles.formLabel}>Name:</label>
              <input className={styles.formInput} type="text" id="name" name="name" value={formData.name} onChange={handleFormInputChange} required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="image" className={styles.formLabel}>Image:</label>
              <input className={styles.formInput} type="file" id="image" name="image" onChange={handleImageChange} required />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="description" className={styles.formLabel}>Description:</label>
              <input className={styles.formInput} type="text" id="description" name="description" value={formData.description} onChange={handleFormInputChange} required />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="price" className={styles.formLabel}>Price:</label>
              <input className={styles.formInput} type="number" id="price" name="price" value={formData.price} onChange={handleFormInputChange} required />
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
              <th>Image</th>
              <th>Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, productIndex) => (
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
                        value={product.image}
                        onChange={(e) => handleInputChange(e, 'image', product._id)}
                      />
                    ) : (
                      <img src={`http://localhost:4000/uploads/${product.image}`} alt="Product Image" style={{ width: '100px', height: '100px' }} />
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
