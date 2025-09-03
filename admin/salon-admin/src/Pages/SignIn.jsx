import React from 'react';
import { Link } from 'react-router-dom';
// import Logo from '../Images/logo/logo.png'
import SignInImg from '../Images/sign/signin.jpg'

const SignIn = () => {
    return (
        <div className="container-fluid p-0">
            <div className="signIn-page">
                <section className="signin__area" style={{ minHeight: '100vh' }}>
                    <div className="sign__main-wrapper my-0">
                        {/* Left Side */}
                        <div className="sign__left">
                            <div className="sign__header text-center justify-content-center">
                                <div className="sign__logo text-center">
                                        {/* <img
                                            className="logo-black"
                                            src={Logo}
                                            style={{ width: '150px', height: '90px', objectFit: 'contain' }}
                                            alt="Logo"
                                        />
                                        <img
                                            className="logo-white"
                                            src={Logo}
                                            style={{ width: '150px', height: '90px', objectFit: 'contain' }}
                                            alt="Logo"
                                        /> */}
                                        <h2 className="">Barber<span className="text-danger">.</span></h2>
                                </div>
                            </div>

                            <div className="sign__center-wrapper text-center mt-50">
                                <div className="sign__title-wrapper mb-40">
                                    <h3 className="sign__title">Welcome</h3>
                                    <p>The faster you fill up, the faster you get a new experience</p>
                                </div>

                                <div className="sign__input-form text-center">
                                    {/* Static Error Message Example */}
                                    {/* <div className="alert alert-danger">Please fill in all fields</div> */}

                                    <form>

                                        {/* Email Input */}
                                        <div className="sign__input">
                                            <input
                                                type="email"
                                                placeholder="Email"
                                                required
                                            />
                                            <span><i className="fa-solid fa-user"></i></span>
                                        </div>

                                        {/* Password Input */}
                                        <div className="sign__input">
                                            <input
                                                type="password"
                                                placeholder="Enter your password"
                                                required
                                            />
                                            <span><i className="fa-solid fa-lock"></i></span>
                                            <button
                                                type="button"
                                                className="position-absolute end-0 top-0 mt-3 me-3"
                                            >
                                                <i className="fa-solid fa-eye text-secondary"></i>
                                            </button>
                                        </div>

                                        {/* Remember Me */}
                                        <div className="sign__action">
                                            <div className="sign__check">
                                                <input
                                                    className="e-check-input"
                                                    type="checkbox"
                                                    id="register"
                                                />
                                                <label className="sign__check-text" htmlFor="register">
                                                    <span>Remember Me</span>
                                                </label>
                                            </div>
                                        </div>

                                        {/* Submit Button */}
                                        <div className="sing_button mb-20">
                                            <Link to="/dashboard" className="input__btn w-100 mb-20">
                                                Sign in
                                            </Link>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>

                        {/* Right Side */}
                        <div className="sign__right">
                            <div
                                className="sign__input-thumb"
                                style={{
                                    backgroundImage: `url(${SignInImg})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            ></div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default SignIn;
