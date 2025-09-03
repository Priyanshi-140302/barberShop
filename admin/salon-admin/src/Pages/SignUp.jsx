import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add signup logic here (API call, etc.)
        console.log({ username, email, password, confirmPassword });
    };

    return (
        <>
            <div className="container-fluid p-0">
                <div className="signUp-page">
                    <section className="signin__area">
                        <div className="sign__main-wrapper">
                            <div className="sign__left">
                                <div className="sign__header">
                                    <div className="sign__logo">
                                        <Link to="dashboard.html">
                                            <img className="logo-black" src="assets/img/logo/color-logo.svg" alt="" />
                                            <img className="logo-white" src="assets/img/logo/color-logo-white.svg" alt="" />
                                        </Link>
                                    </div>
                                    <div className="sign__link">
                                        <Link className="sign__link-text" to="/">Sign in</Link>
                                        <Link className="sign__link-active" to="#">Sign Up</Link>
                                    </div>
                                </div>
                                <div className="sign__center-wrapper text-center mt-80">
                                    <div className="sign__title-wrapper mb-40">
                                        <h3 className="sign__title">Create An Account</h3>
                                        <p>The faster you fill up. the faster you get a ticket</p>
                                    </div>
                                    <div className="sign__input-form text-center">
                                        <form onSubmit={handleSubmit}>
                                            <div className="sign__input">
                                                <input
                                                    type="text"
                                                    placeholder="User Name"
                                                    value={username}
                                                    onChange={(e) => setUsername(e.target.value)}
                                                />
                                                <span><i className="flaticon-user-2"></i></span>
                                            </div>
                                            <div className="sign__input">
                                                <input
                                                    type="email"
                                                    placeholder="Email Address"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                />
                                                <span><i className="flaticon-user-2"></i></span>
                                            </div>
                                            <div className="sign__input">
                                                <input
                                                    type="password"
                                                    placeholder="Enter Password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                />
                                                <span><i className="flaticon-password"></i></span>
                                            </div>
                                            <div className="sign__input">
                                                <input
                                                    type="password"
                                                    placeholder="Confirm Password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                />
                                                <span><i className="flaticon-password"></i></span>
                                            </div>
                                            <div className="sing__button mb-20">
                                                <button className="input__btn w-100 mb-20" type="submit">Sign Up</button>
                                                <button className="gamil__sign-btn w-100" type="button">
                                                    <span>
                                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <g clipPath="url(#clip0_322_540)">
                                                                <path d="M4.43242 12.0863L3.73625 14.6852L1.19176 14.739C0.431328 13.3286 0 11.7149 0 10C0 8.34179 0.403281 6.77804 1.11812 5.40112H1.11867L3.38398 5.81644L4.37633 8.06815C4.16863 8.67366 4.05543 9.32366 4.05543 10C4.05551 10.7341 4.18848 11.4374 4.43242 12.0863Z" fill="#FBBB00" />
                                                                <path d="M19.8252 8.13184C19.94 8.73676 19.9999 9.36148 19.9999 9.99996C19.9999 10.7159 19.9246 11.4143 19.7812 12.0879C19.2944 14.3802 18.0224 16.3818 16.2604 17.7983L16.2598 17.7978L13.4065 17.6522L13.0027 15.1313C14.1719 14.4456 15.0857 13.3725 15.567 12.0879H10.2197V8.13184H15.645H19.8252Z" fill="#518EF8" />
                                                                <path d="M16.2595 17.7977L16.2601 17.7983C14.5464 19.1757 12.3694 19.9999 9.99965 19.9999C6.19141 19.9999 2.88043 17.8713 1.19141 14.7389L4.43207 12.0862C5.27656 14.34 7.45074 15.9444 9.99965 15.9444C11.0952 15.9444 12.1216 15.6483 13.0024 15.1312L16.2595 17.7977Z" fill="#28B446" />
                                                                <path d="M16.383 2.30219L13.1434 4.95437C12.2319 4.38461 11.1544 4.05547 10 4.05547C7.39344 4.05547 5.17859 5.73348 4.37641 8.06812L1.11871 5.40109H1.11816C2.78246 2.1923 6.1352 0 10 0C12.4264 0 14.6511 0.864297 16.383 2.30219Z" fill="#F14336" />
                                                            </g>
                                                            <defs>
                                                                <clipPath id="clip0_322_540">
                                                                    <rect width="20" height="20" fill="white" />
                                                                </clipPath>
                                                            </defs>
                                                        </svg>
                                                    </span> Sign Up With Google
                                                </button>
                                            </div>
                                        </form>
                                        <div className="if__account mt-90">
                                            <p>Already have an account? <Link to="/">Sign in</Link></p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="sign__right">
                                <div className="sign__input-thumb" style={{ backgroundImage: 'url(assets/img/sign/signin.jpg)' }}></div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </>
    )
}

export default SignUp