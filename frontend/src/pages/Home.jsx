import { Helmet } from 'react-helmet';
import { NavLink } from "react-router-dom";

import About from './About';
import Contact from './Contact';

const Home = () => {

    return (
        <>
            <Helmet>
                <title>Car Rental System - Home</title>
                <meta name="description" content="Welcome to our car rental system. Find the perfect car for your needs!" />
            </Helmet>
            <section className="section-home">

                <div className="container grid grid-two-cols">

                    <div className="section-content">

                        <div className="content">

                            <h1>Wellcome to Our Car Rental Company ...</h1> <br />
                            <p>We offer a diverse fleet of top-quality vehicles, providing the best cars with unbeatable offers. Elevate your journey with comfort, style, and unparalleled quality.</p>
                            <br />
                            <NavLink to="/register">
                                <img className="register-home" src="/images/register-home.png" alt="Contact Image" />
                            </NavLink>
                            <br /><br />
                            <NavLink to="/contact">
                                <button >Contact</button>
                            </NavLink>
                            <NavLink to="/services">
                                <button >Services</button>
                            </NavLink>

                        </div>

                    </div>

                    <div className="contact-img">
                        <img src="/images/home-image.png" alt="Contact Image" />
                    </div>

                </div>
            </section>
            <About />
            <br />
            <br />
            <br />
            <Contact />
        </>
    );
};

export default Home;
