import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";


const AdminUpdate = () => {
    const params = useParams();
    const { cars } = useAuth();
    const [carData, setCarData] = useState(null);

    useEffect(() => {
        // Check if cars is an array and has length greater than 0
        if (Array.isArray(cars) && cars.length > 0) {
            // Find the car object with matching ID
            const foundCar = cars.find(car => car._id === params.id);
            if (foundCar) {
                setCarData(foundCar);
            } else {
                // If no matching car found, show error message
                toast.error("Car not found");
            }
        } else {
            // If cars is not an array or empty, show error message 
        }
    }, [cars, params.id]);

    return (
        <>
            <section className="section-car-details">
                <center><h1> Car Details </h1></center>
                <br /><br /><br />

                <div className="container ">
                    <section className="section-form">
                        {carData && (
                            <>
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>Car Image</td>
                                            <td><img src={`${carData.image}`} alt={carData.carname} /></td>
                                        </tr>
                                        <tr>
                                            <td>Carname</td>
                                            <td>{carData.carname}</td>
                                        </tr>
                                        <tr>
                                            <td>Price</td>
                                            <td>₹ {carData.price} /Hour</td>
                                        </tr>
                                        <tr>
                                            <td>Booking Status</td>
                                            <td>{carData.booked ? 'Booked' : 'Unbooked'}</td>
                                        </tr>
                                        <tr>
                                            <td>Owner</td>
                                            <td>{carData.owner_name} </td>
                                        </tr>
                                        <tr>
                                            <td>Contact</td>
                                            <td>{carData.owner_phone}</td>
                                        </tr>
                                        <tr>
                                            <td>Details</td>
                                            <td>{carData.details}</td>
                                        </tr>
                                        {/* Add more fields as needed */}
                                    </tbody>
                                </table>
                                <br />
                                <div className="btn">
                                    {!carData.booked && (
                                        <Link className="book book2" to={`/user/bookcar/${carData._id}`}>
                                            Book
                                        </Link>
                                    )}
                                </div>
                            </>
                        )}
                    </section>

                </div>
            </section>
        </>
    );
};

export default AdminUpdate;
