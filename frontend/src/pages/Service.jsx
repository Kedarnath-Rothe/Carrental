import { useState } from "react";
import { IoMdInformationCircle } from "react-icons/io";
import { IoCall } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { useAuth } from '../store/auth';

const Service = () => {
    const { cars } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');

    if (!Array.isArray(cars)) {
        return <div className='container'>Loading...</div>;
    }

    // Function to handle search input change
    const handleSearchInputChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Filtered cars based on search query and availability
    const filteredCars = cars.filter((car) =>
        car.carname.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Separate booked cars from available cars
    const availableCars = filteredCars.filter((car) => !car.booked);
    const bookedCars = filteredCars.filter((car) => car.booked);

    return (
        <section className="section-services">
            <div className="container service_head">
                <h1 className="service_heading">Services</h1>
            </div>

            <div className="container section_search">
                <input
                    type='text'
                    className="search"
                    placeholder='Search cars...'
                    value={searchQuery}
                    onChange={handleSearchInputChange}
                />
                <p>Total Cars: {filteredCars.length}</p>
            </div>

            <div className="container grid grid-four-cols">
                {/* Display available cars */}
                {availableCars.map((curElem, index) => (
                    <div className="card" key={index}>
                        <div className="card-img">
                            <img src={curElem.image} alt={curElem.carname} />
                        </div>
                        <hr className="hr" />
                        <div className="card-details">
                            <div className="additional-info">
                                <h2>{curElem.carname}</h2>
                                <p>
                                    <Link className="edit2" to={`/user/cardetails/${curElem._id}`}>
                                        <IoMdInformationCircle className="icon" />
                                    </Link>
                                </p>
                            </div>
                            <p className="price">₹ {curElem.price} /Hour</p>
                            <div className="phone-number">
                                <IoCall /> {curElem.owner_phone}
                                <span>
                                    <Link className="book" to={`/user/bookcar/${curElem._id}`}>
                                        Book
                                    </Link>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}

                {/* Display booked cars at the end */}
                {bookedCars.map((curElem, index) => (
                    <div className="card" key={index}>
                        <div className="card-img">
                            <img className="bookk" style={{ width: '200px', marginLeft: "2.5rem" }} src="../../images/book.png" alt="booked" />
                        </div>
                        <hr className="hr" />
                        <div className="card-details">
                            <div className="additional-info">
                                <h2>{curElem.carname}</h2>
                                <p>
                                    <Link className="edit2" to={`/user/cardetails/${curElem._id}`}>
                                        <IoMdInformationCircle className="icon" />
                                    </Link>
                                </p>
                            </div>
                            <p className="price">₹ {curElem.price} /Hour</p>
                            <div className="phone-number">
                                <IoCall /> {curElem.owner_phone}
                                <span>
                                    <p>Rented</p>
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Service;
