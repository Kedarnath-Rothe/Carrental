import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";
 
const CarUpdate = () => {
    const [data, setData] = useState({
        carname: "",
        price: "",
        owner_name: "",
        owner_phone: "",  
    });

    const params = useParams();
    const { authorizationToken } = useAuth();
    const navigate = useNavigate();

    const getSingleCarData = async () => {
        try {
            const response = await fetch(`https://carrental-khaki.vercel.app/api/admin/cars/${params.id}`, {
                method: "GET",
                headers: {
                    Authorization: authorizationToken,
                }
            });

            const carData = await response.json();
            setData(carData);
        } catch (error) {
            console.log(error.message);
        }   
    };
    
    useEffect(() => {
        getSingleCarData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleInput = (e) => {
        const { name, value } = e.target;
        setData(prevData => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await fetch(`https://carrental-khaki.vercel.app/api/admin/cars/update/${params.id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: authorizationToken
                },
                body: JSON.stringify(data),
            });

            if (response.ok) {
                toast.success("Updated Successfully...");
                navigate('/admin/cars');
            } else {
                toast.error("Not Updated...");
            }
        } catch(error) {
            console.log(error.message);
        }
    };

    return (
        <section className="section-contact">
            <div className="contact-content container">
                <h1 className="container"> Update Car Data </h1>
            </div>
            <div className="car_container grid grid-two-cols">

                <section>
                    <img className="car-update"  width="400" src="/images/car-update.png" alt="Register image" />
                </section>

                <section className=" car_form section-form">
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="carname"> Car Name </label>
                            <input
                                type="text"
                                name="carname"
                                id="carname"
                                autoComplete="off"
                                value={data.carname}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="price"> Price </label>
                            <input
                                type="number"
                                name="price"
                                id="price"
                                autoComplete="off"
                                value={data.price}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="username"> User Name </label>
                            <input
                                type="text"
                                name="username"
                                id="username"
                                autoComplete="off"
                                value={data.owner_name}
                                onChange={handleInput}
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="phone"> Phone </label>
                            <input
                                type="number"
                                name="phone"
                                id="phone"
                                maxLength='10'
                                minLength='10'
                                autoComplete="off"
                                value={data.owner_phone}
                                onChange={handleInput}
                                required
                            />
                        </div>
                        <div>
                            <button type="submit"> Update </button>
                        </div>
                        <br/>
                    </form>
                </section> 
            </div>
        </section>
    );
}

export default CarUpdate;
