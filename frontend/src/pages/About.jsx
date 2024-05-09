import { Helmet } from 'react-helmet';
import { NavLink } from "react-router-dom";

const Home = () => {

    return (
        <>
            <Helmet>
                <title>About Us - Car Rental System</title>
                <meta name="description" content="Learn more about our car rental system and our company." />
            </Helmet>
            <section className="section-home">

                <div className="container grid grid-two-cols" style={{ minHeight: "80vh" }}>


                    <div className="contact-img">
                        <img src="/images/about.png" alt="Contact Image" />
                    </div>

                    <div className="section-content">

                        <div className="content">

                            <h2 className="about_heading" >About Our Comapany...</h2> <br />
                            <p>Welcome to Your Car Rental System Name, where we redefine your travel experience with top-quality and reliable car rentals. Our mission is to provide you with a diverse fleet of vehicles, exceptional service, and a seamless booking process.</p>
                            <br />
                            <h2>Why Choose Us?</h2>
                            <br />

                            <p className="about_p">1)Choose us for top-notch quality and outstanding service that is all about you. </p>
                            <p className="about_p">2)We are your reliable partner, dedicated to making your experience exceptional. </p>

                            <br /><br />
                            <NavLink to="/contact">
                                <button >Contact</button>
                            </NavLink>
                            <NavLink to="/services">
                                <button >Services</button>
                            </NavLink>

                        </div>

                    </div>

                </div>
            </section>
        </>
    );
};

export default Home;
