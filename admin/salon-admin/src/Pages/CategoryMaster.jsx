import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import Header from '../Components/Header';
import { Link } from 'react-router-dom';

const CategoryMaster = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
    const openDeleteModal = () => setIsDeleteModalOpen(true);
    const closeDeleteModal = () => setIsDeleteModalOpen(false);

    return (
        <>
            <div className="container-fluid p-0">
                <div className="event-category-master-page">
                    <div className="page__full-wrapper">
                        {/* Sidebar */}
                        <Sidebar />

                        <div className="page__body-wrapper">
                            {/* Header */}
                            <Header />

                            {/* Breadcrumb */}
                            <div className="app__slide-wrapper">
                                <div className="row">
                                    <div className="col-xl-12">
                                        <div className="breadcrumb__wrapper mb-35 d-flex justify-content-between">
                                            <div className="breadcrumb__main">
                                                <div className="breadcrumb__inner">
                                                    <div className="breadcrumb__icon">
                                                        <i className="flaticon-home"></i>
                                                    </div>
                                                    <div className="breadcrumb__menu">
                                                        <nav>
                                                            <ul>
                                                                <li>
                                                                    <span><Link to="/dashboard">Home</Link></span>
                                                                </li>
                                                                <li>
                                                                    <span><Link to="/master">Master</Link></span>
                                                                </li>
                                                                <li className="active"><span>Category</span></li>
                                                            </ul>
                                                        </nav>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="breadcrum__button">
                                                <button className="breadcrum__btn" onClick={openModal}>
                                                    Add New <i className="fa-regular fa-plus"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Table */}
                            <div className="attendant__list-area pb-20 px-4">
                                <div className="attendan__content">
                                    <div className="body__card-wrapper">
                                        <div className="attendant__wrapper mb-35">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>S.No</th>
                                                        <th>Category</th>
                                                        <th>Description</th>
                                                        <th>Status</th>
                                                        <th>Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {/* Static Example Rows */}
                                                    <tr>
                                                        <td><span>1</span></td>
                                                        <td><span>Furniture</span></td>
                                                        <td><span>Chairs, tables, sofas</span></td>
                                                        <td><span>Active</span></td>
                                                        <td>
                                                            <button onClick={openModal} className="btn border-0">
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                            <button onClick={openDeleteModal} className="btn border-0">
                                                                <i className="fa-solid fa-trash-can text-danger"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                    <tr>
                                                        <td><span>2</span></td>
                                                        <td><span>Lighting</span></td>
                                                        <td><span>Stage and decorative lights</span></td>
                                                        <td><span>Inactive</span></td>
                                                        <td>
                                                            <button onClick={openModal} className="btn border-0">
                                                                <i className="fa-solid fa-pen-to-square"></i>
                                                            </button>
                                                            <button onClick={openDeleteModal} className="btn border-0">
                                                                <i className="fa-solid fa-trash-can text-danger"></i>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        {/* Pagination (Static) */}
                                        <div className="basic__pagination d-flex align-items-center justify-content-end">
                                            <div className="pagination">
                                                <nav>
                                                    <ul>
                                                        <li>
                                                            <button disabled>
                                                                <i className="fa-solid fa-arrow-left"></i>
                                                            </button>
                                                        </li>
                                                        <li>
                                                            <button className="active me-1">1</button>
                                                        </li>
                                                        <li>
                                                            <button className="me-1">2</button>
                                                        </li>
                                                        <li>
                                                            <button>
                                                                <i className="fa-solid fa-arrow-right"></i>
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Add/Edit Modal */}
                            {isModalOpen && (
                                <div className="modal show" style={{ display: 'block', background: '#0000008e' }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header popup__title-wrapper py-3">
                                                <h1 className="modal-title fs-5 text-white">Add / Edit Category</h1>
                                                <button type="button" onClick={closeModal} className="btn-close"></button>
                                            </div>
                                            <div className="modal-body">
                                                <form>
                                                    <div className="singel__input-field mb-15">
                                                        <label className="input__field-text">Category</label>
                                                        <input type="text" placeholder="Enter Category" />
                                                    </div>
                                                    <div className="singel__input-field mb-15">
                                                        <label className="input__field-text">Description</label>
                                                        <input type="text" placeholder="Enter Description" />
                                                    </div>
                                                    <div className="singel__input-field mb-15">
                                                        <label className="input__field-text">Status</label>
                                                        <select>
                                                            <option>Select Status</option>
                                                            <option value="1">Active</option>
                                                            <option value="0">Inactive</option>
                                                        </select>
                                                    </div>
                                                    <button type="button" className="input__btn w-100" onClick={closeModal}>
                                                        Save
                                                    </button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Delete Modal */}
                            {isDeleteModalOpen && (
                                <div className="modal show" style={{ display: 'block', background: '#0000008e' }}>
                                    <div className="modal-dialog">
                                        <div className="modal-content">
                                            <div className="modal-header d-flex align-items-center bg-ffe2e5 py-3">
                                                <h4 className="modal-title text-danger">Warning!</h4>
                                                <button type="button" className="close" onClick={closeDeleteModal}>
                                                    <i className="fa-solid fa-xmark fs-3 text-danger"></i>
                                                </button>
                                            </div>
                                            <div className="modal-body p-3 text-center">
                                                <h5 className="text-danger">Do you want to permanently delete?</h5>
                                                <img src="images/deleteWarning.png" alt="Warning" className="w-50 m-auto my-3" />
                                                <div className="d-flex justify-content-center">
                                                    <button type="button" className="btn btn-danger px-4 me-3" onClick={closeDeleteModal}>
                                                        Yes
                                                    </button>
                                                    <button type="button" className="btn btn-outline-danger px-4" onClick={closeDeleteModal}>
                                                        No
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CategoryMaster;
