import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

const UserUpdate = () => {


    const generateTransactionId = () => {
        const segments = [];
    
        // Generate 16 random digits (0-9)
        for (let i = 0; i < 16; i++) {
            const randomDigit = Math.floor(Math.random() * 10); // Generate a random digit (0-9)
            segments.push(randomDigit.toString()); // Add the digit to segments
        }
    
        // Insert dashes at specific positions to match the desired format
        return `T${segments.slice(0, 4).join('')}-${segments.slice(4, 8).join('')}-${segments.slice(8, 12).join('')}-${segments.slice(12).join('')}`;
    };
    

    const { user, isLoggedIn } = useAuth(); 

    const [carData, setCarData] = useState({
        carname: "",
        price: "",
        username: "",
        phone: "",
        start_date: "",
        end_date: "",
        cust_id: user._id,
        cust_name: user.username,
        cust_phone: user.phone,
        total: ""
    });

    
    const params = useParams();
    // const navigate = useNavigate();
    const { authorizationToken } = useAuth();

    useEffect(() => {
        const getSingleCarData = async () => {
            try {
                const response = await fetch(`https://carrental-khaki.vercel.app/api/auth/bookcar/${params.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: authorizationToken,
                    }
                });

                if (response.ok) {
                    const carData = await response.json();
                    setCarData({ ...carData, cust_id: user._id, cust_name: user.username, cust_phone: user.phone });
                } else {
                    // toast.error("Failed to fetch car data");
                }
            } catch (error) {
                console.log(error.message);
                toast.error("Failed to fetch car data");
            }
        };

        getSingleCarData();
    }, [authorizationToken, params.id, user._id, user.username, user.phone]);


    const handleInput = (e) => {
        const { name, value } = e.target;
        setCarData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    if(! isLoggedIn){
        toast.error("Plese, You Have to Login Before Booking...")
        return <Navigate to="/" />
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Calculate total hours
            const startTime = new Date(carData.start_date);
            const endTime = new Date(carData.end_date);
            const timeDiff = Math.abs(endTime - startTime);
            const totalHours = Math.ceil(timeDiff / (1000 * 60 * 60));

            // Calculate total cost
            const totalPrice = totalHours * parseInt(carData.price);
            const updatedCarData = { ...carData, total: totalPrice, booked: true, transaction_id : generateTransactionId() };

            const response = await fetch(`https://carrental-khaki.vercel.app/api/auth/bookcar/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(updatedCarData),
            });

            if (response.ok) {
                toast.success("Updated Successfully...");
                window.location.href = `/user/bookcar/bill/${params.id}`;
            } else {
                toast.error("Not Updated...");
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    return (
        <section className="section-contact section-car-book">
            <div className="contact-content container">
                <h1 className="main-heading"> Book The Car </h1>
            </div>
            <div className="car_container">
                <section className="car_form section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="carname"> Car Name </label>
                            <input
                                className="carname"
                                type="text"
                                name="carname"
                                id="carname"
                                autoComplete="off"
                                value={carData.carname}
                                onChange={handleInput}
                                required
                                disabled
                            />
                        </div>
                        <div>
                            <label htmlFor="price"> Price </label>
                            <p> Rs. {carData.price} /Hour </p> 
                        </div> 

                        <div>
                            <label htmlFor="start_date"> Start Date and Time </label>
                            <input
                                type="datetime-local"
                                name="start_date"
                                id="start_date"
                                autoComplete="off"
                                value={carData.start_date}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="end_date"> End Date and Time </label>
                            <input
                                type="datetime-local"
                                name="end_date"
                                id="end_date"
                                autoComplete="off"
                                value={carData.end_date}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        
                        <div>
                            <button type="submit"> Book </button>
                        </div>
                        <br/>
                    </form> 
                </section>
            </div>
                <br/>
                <br/>
        </section>
    );
}

export default UserUpdate;
