// import { useEffect, useState } from "react";
import { Navigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const Managecar = () => {

    const { cars } = useAuth();

    const { user, isLoading } = useAuth();

    const { authorizationToken } = useAuth();

    if (isLoading) {
        return <h1>Loading ...</h1>
    }

    if (!user.isAdmin && !user.car_provider) {
        return <Navigate to="/" />
    }

    const deleteCar = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/api/admin/cars/delete/${id}`, {
                method: "DELETE",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            console.log(response);
            toast.success("Car Deleted successfully");
            window.location.reload();

        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <>
            <section className="admin-cars-section">
                <div style={{marginTop:"4rem"}}>
                    <center><h1>My Cars Data</h1></center>
                </div>
                <div className="container admin-cars">
                    <table>
                        <thead>
                            <tr>
                                <th>Car Name</th>
                                <th>Status</th>
                                <th>Paid</th>
                                <th>Image</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((curCar, index) => {
                                // Check if the current car has an associated phone number
                                if (curCar.owner_phone == user.phone) {
                                    return (
                                        <tr key={index}>
                                            <td>{curCar.carname}</td>
                                            <td>
                                                {
                                                    curCar.booked ? (
                                                        <span>Booked by {curCar.cust_name} <br /> <p>{curCar.cust_phone}</p></span>
                                                    ) : (
                                                        <span>Available</span>
                                                    )
                                                }
                                            </td>
                                            <td> Rs.{curCar.total} </td>
                                            <td>
                                                <img src={`${curCar.image}`} alt="Car" width="100" />
                                            </td>
                                            <td className="delete">
                                                <button onClick={() => deleteCar(curCar._id)}>Delete</button>
                                            </td>
                                        </tr>
                                    );
                                } else {
                                    return null; // Skip rendering if the condition isn't met
                                }
                            })}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
}

export default Managecar;