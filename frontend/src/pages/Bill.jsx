
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../store/auth";


const Bill = () => {

    const { user, cars } = useAuth();
    const params = useParams();
    const [selectedCar, setSelectedCar] = useState(null);



    // Helper function to format date
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString();
    };

    // Function to handle printing
    const handlePrint = () => {
        window.print(); // Trigger browser's print dialog
    };

    useEffect(() => {
        // Find the car that matches the params.id
        const foundCar = cars.find((car) => car._id === params.id);
        setSelectedCar(foundCar); // Update selectedCar state with the found car
    }, [params.id, cars]);

    //Here add one variable--> curCar._id === params.id

    return (

        <section>
            <br />
            <br />
            <center><button className="print" onClick={handlePrint}>Print</button></center>
            <div className="bill_section">
                <div className="bill_container">
                    <div className="bill">

                        <div className="header" >
                            <div className="logo">
                                <img src="/images/bill_logo.png" />
                            </div>
                            <div className="invoice">
                                <img src="/images/invoice.png" />
                            </div>
                        </div>
                        <hr /><br />

                        <div className="date"><strong>Date:</strong> {formatDate(Date.now())}</div>
                        <div className="date">
                            <strong>Transaction ID:</strong> {selectedCar ? selectedCar.transaction_id : ''}
                        </div>
                        <hr /><br />
                        <div className="bill_details">

                            <div className="car_details">
                                {cars.map((curCar) => {
                                    if (curCar._id === params.id) {
                                        return (
                                            <div key={curCar._id}>

                                                <div className="from">
                                                    <div className="from_to">
                                                        <div>
                                                            <strong>Bill from:</strong> Puna_Cars
                                                            <br />
                                                            <strong>Mobile:</strong> 91+ (749) 848-9467
                                                        </div><br />
                                                        <div>
                                                            <strong>Bill to:</strong> {user.username}
                                                            <br />
                                                            <strong>Mobile:</strong> {user.phone}
                                                        </div>
                                                    </div>
                                                    <div className="user">
                                                        <img src={`${user.image}`} />
                                                    </div>
                                                </div>
                                                <hr />

                                                <div className="data">
                                                    <div>
                                                        <div><strong>Car Name:</strong> {curCar.carname}</div>
                                                        <div> <strong>Price:</strong> Rs.{curCar.price}/Hr</div>
                                                        <div><strong>Booked from:</strong> {curCar.start_date}</div>
                                                        <div><strong>Booked to:</strong> {curCar.end_date}</div>
                                                        {/* <div>Total Hours: {hours}</div> */}
                                                        <div><strong>Total Amount:</strong> Rs.{curCar.total}</div>
                                                    </div>
                                                    <div className="carimage">
                                                        <img src={`${curCar.image}`} />
                                                    </div>
                                                </div>

                                                <hr />

                                                <div className="terms">
                                                    <div className="terms"> <strong>Terms and Conditions:</strong> </div>
                                                    <div>
                                                        <pre>Subtotal:     Rs {curCar.total}</pre>
                                                        <pre>Discount:    Rs 0 </pre>
                                                        <pre>Tax:             Rs 0 </pre> <hr />
                                                        <pre className="total">Total:           Rs {curCar.total}</pre>
                                                    </div>
                                                </div>

                                            </div>
                                        );
                                    } else {
                                        return null;
                                    }
                                })}
                            </div>
                            <hr />
                            <br/>

                            <center>
                                <div className="date">
                                    <strong>Transaction ID:</strong> {selectedCar ? selectedCar.transaction_id : ''}
                                </div>
                                <div className="stamp">
                                    <img className="paid" src="/images/paid.png" />
                                </div>
                            </center>
                        </div>
                    </div>
                </div>
            </div>


        </section>

    )
}

export default Bill
