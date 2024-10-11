'use client';

import { useState } from 'react';

export default function ProductsPage() {
    const [currentSection, setCurrentSection] = useState('home'); // State to manage which section is active

    const [products, setProducts] = useState([
        { id: 1, name: 'Earphone Pro', price: 100, stock: 50, status: 'active', type: 'electronics' },
        { id: 2, name: 'Smartwatch 2000', price: 200, stock: 20, status: 'inactive', type: 'electronics' },
        { id: 3, name: 'Laptop Max 15', price: 1500, stock: 10, status: 'active', type: 'electronics' },
        { id: 4, name: 'Gaming Headset', price: 250, stock: 15, status: 'active', type: 'accessories' },
        { id: 5, name: 'Bluetooth Speaker', price: 300, stock: 8, status: 'inactive', type: 'electronics' },
        { id: 6, name: 'Smartphone Z10', price: 1000, stock: 30, status: 'active', type: 'electronics' },
        { id: 7, name: 'Wireless Mouse', price: 50, stock: 100, status: 'active', type: 'accessories' },
        { id: 8, name: 'Laptop Bag', price: 120, stock: 20, status: 'inactive', type: 'accessories' },
        { id: 9, name: '4K Monitor', price: 190, stock: 25, status: 'active', type: 'electronics' },
        { id: 10, name: 'Wireless Keyboard', price: 220, stock: 10, status: 'inactive', type: 'accessories' },
    ]);

    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');
    const [productTypeFilter, setProductTypeFilter] = useState('');
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        stock: '',
        status: 'active',
        type: '',
    });

    const [showAddProductForm, setShowAddProductForm] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const [contactForm, setContactForm] = useState({
        name: '',
        email: '',
        message: '',
    });

    const validateNewProduct = () => {
        return (
            newProduct.name.trim() !== '' &&
            newProduct.price > 0 &&
            newProduct.stock >= 0 &&
            newProduct.type !== ''
        );
    };

    const handleAddProduct = () => {
        if (!validateNewProduct()) {
            alert('Please fill all fields correctly.');
            return;
        }

        const newProductId = products.length + 1;
        const newProductData = {
            id: newProductId,
            ...newProduct,
            price: parseFloat(newProduct.price),
            stock: parseInt(newProduct.stock),
        };

        setProducts([...products, newProductData]);
        setNewProduct({ name: '', price: '', stock: '', status: 'active', type: '' });
        setShowAddProductForm(false);
        setCurrentSection('dashboard'); // After adding product, go back to dashboard
    };

    const handleSort = (key) => {
        const sorted = [...products].sort((a, b) => {
            if (typeof a[key] === 'string') {
                return sortOrder === 'asc'
                    ? a[key].localeCompare(b[key])
                    : b[key].localeCompare(a[key]);
            }
            return sortOrder === 'asc' ? a[key] - b[key] : b[key] - a[key];
        });
        setProducts(sorted);
        setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    };

    const handleDeleteProduct = (productId) => {
        const updatedProducts = products.filter((product) => product.id !== productId);
        setProducts(updatedProducts);
    };

    const filteredProducts = products.filter((product) => {
        const matchesName = product.name.toLowerCase().includes(filter.toLowerCase());
        const matchesType = productTypeFilter ? product.type === productTypeFilter : true;
        return matchesName && matchesType;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const paginatedProducts = filteredProducts.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (pageNumber) => {
        if (pageNumber > 0 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber);
        }
    };

    const handleContactFormChange = (e) => {
        setContactForm({ ...contactForm, [e.target.name]: e.target.value });
    };

    const handleContactSubmit = () => {
        // Simulate form submission
        alert('Your message has been sent!');
        setContactForm({ name: '', email: '', message: '' });
    };

    return (
        <div className="container mx-auto p-6">
            {/* Sidebar */}
            <aside className="bg-gray-900 text-white p-4 rounded-lg shadow-lg w-1/4 animate__animated animate__fadeIn">
                <h2 className="text-2xl font-bold mb-6">Dashboard</h2>
                <nav>
                    <ul>
                        <li className="mb-4">
                            <a
                                href="#"
                                className="hover:text-yellow-400 transition ease-in-out duration-200"
                                onClick={() => setCurrentSection('home')}
                            >
                                Home
                            </a>
                        </li>
                        <li className="mb-4">
                            <a
                                href="#"
                                className="hover:text-yellow-400 transition ease-in-out duration-200"
                                onClick={() => setCurrentSection('dashboard')}
                            >
                                Dashboard
                            </a>
                        </li>
                        <li className="mb-4">
                            <a
                                href="#"
                                className="hover:text-yellow-400 transition ease-in-out duration-200"
                                onClick={() => setCurrentSection('addProduct')}
                            >
                                Add Product
                            </a>
                        </li>
                        <li className="mb-4">
                            <a
                                href="#"
                                className="hover:text-yellow-400 transition ease-in-out duration-200"
                                onClick={() => setCurrentSection('contact')}
                            >
                                Contact Us
                            </a>
                        </li>
                    </ul>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-5">
                {/* Home Page Section */}
                {currentSection === 'home' && (
                    <div className="text-center bg-blue-900 text-white p-10 rounded-lg shadow-md">
                        <h1 className="text-5xl font-bold mb-6">Welcome to Our Online Store</h1>
                        <p className="text-lg mb-8">
                            Discover amazing products and great deals on electronics and accessories.
                            Find the best gadgets for your needs!
                        </p>
                        <div>
                            <a
                                href="#"
                                className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-500 transition duration-300"
                                onClick={() => setCurrentSection('dashboard')}
                            >
                                Shop Now
                            </a>
                        </div>
                    </div>
                )}

                {/* Dashboard Section */}
                {currentSection === 'dashboard' && (
                    <div>
                        <h1 className="text-4xl font-bold mb-8 text-center text-gray-900">
                            Product Dashboard
                        </h1>

                        {/* Filter and Sort Section */}
                        <div className="flex justify-between mb-6">
                            <div className="flex-1">
                                <input
                                    type="text"
                                    placeholder="Filter by product name"
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md shadow-lg w-full bg-white text-gray-800"
                                />
                            </div>
                            <div className="ml-4">
                                <select
                                    value={productTypeFilter}
                                    onChange={(e) => setProductTypeFilter(e.target.value)}
                                    className="border border-gray-300 p-2 rounded-md shadow-lg w-full max-w-[150px] bg-white text-gray-800"
                                >
                                    <option value="">All Types</option>
                                    <option value="electronics">Electronics</option>
                                    <option value="accessories">Accessories</option>
                                </select>
                            </div>
                        </div>

                        {/* Product Table */}
                        <table className="min-w-full bg-white shadow-lg rounded-lg">
                            <thead>
                                <tr className="bg-gray-800 text-white">
                                    <th className="p-4 cursor-pointer" onClick={() => handleSort('name')}>
                                        Name
                                    </th>
                                    <th className="p-4 cursor-pointer" onClick={() => handleSort('price')}>
                                        Price
                                    </th>
                                    <th className="p-4 cursor-pointer" onClick={() => handleSort('stock')}>
                                        Stock
                                    </th>
                                    <th className="p-4 cursor-pointer" onClick={() => handleSort('status')}>
                                        Status
                                    </th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedProducts.map((product) => (
                                    <tr key={product.id}>
                                        <td className="p-4">{product.name}</td>
                                        <td className="p-4">${product.price}</td>
                                        <td className="p-4">{product.stock}</td>
                                        <td className="p-4">{product.status}</td>
                                        <td className="p-4">
                                            <button
                                                className="bg-red-500 text-white px-3 py-1 rounded-md shadow-md"
                                                onClick={() => handleDeleteProduct(product.id)}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        
                        {/* Pagination */}
                        <div className="flex justify-between mt-6">
                            <button
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                                onClick={() => handlePageChange(currentPage - 1)}
                            >
                                Previous
                            </button>
                            <span>Page {currentPage} of {totalPages}</span>
                            <button
                                className="px-4 py-2 bg-gray-800 text-white rounded-lg"
                                onClick={() => handlePageChange(currentPage + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}

                {/* Add Product Section */}
                {currentSection === 'addProduct' && (
                    <div className="bg-gray-100 p-10 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold mb-6 text-center">Add New Product</h2>
                        <div className="flex flex-col gap-4 max-w-lg mx-auto">
                            <input
                                type="text"
                                placeholder="Product Name"
                                value={newProduct.name}
                                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md shadow-lg w-full bg-white"
                            />
                            <input
                                type="number"
                                placeholder="Price"
                                value={newProduct.price}
                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md shadow-lg w-full bg-white"
                            />
                            <input
                                type="number"
                                placeholder="Stock"
                                value={newProduct.stock}
                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md shadow-lg w-full bg-white"
                            />
                            <select
                                value={newProduct.type}
                                onChange={(e) => setNewProduct({ ...newProduct, type: e.target.value })}
                                className="border border-gray-300 p-2 rounded-md shadow-lg w-full bg-white"
                            >
                                <option value="">Select Product Type</option>
                                <option value="electronics">Electronics</option>
                                <option value="accessories">Accessories</option>
                            </select>
                            <div className="flex justify-between mt-6">
                                <button
                                    className="bg-green-500 text-white px-6 py-2 rounded-lg"
                                    onClick={handleAddProduct}
                                >
                                    Add Product
                                </button>
                                <button
                                    className="bg-gray-500 text-white px-6 py-2 rounded-lg"
                                    onClick={() => setCurrentSection('dashboard')}
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contact Section */}
                {currentSection === 'contact' && (
                    <div className="bg-gray-100 p-10 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold mb-6 text-center">Contact Us</h2>
                        <div className="max-w-lg mx-auto flex flex-col gap-4">
                            <input
                                type="text"
                                placeholder="Name"
                                name="name"
                                value={contactForm.name}
                                onChange={handleContactFormChange}
                                className="border border-gray-300 p-2 rounded-md shadow-lg w-full bg-white"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                name="email"
                                value={contactForm.email}
                                onChange={handleContactFormChange}
                                className="border border-gray-300 p-2 rounded-md shadow-lg w-full bg-white"
                            />
                            <textarea
                                placeholder="Your message"
                                name="message"
                                value={contactForm.message}
                                onChange={handleContactFormChange}
                                className="border border-gray-300 p-2 rounded-md shadow-lg w-full bg-white"
                            />
                            <div className="flex justify-end">
                                <button
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg"
                                    onClick={handleContactSubmit}
                                >
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}









