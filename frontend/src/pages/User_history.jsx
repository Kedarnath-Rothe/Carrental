import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    Tooltip,
    XAxis,
    YAxis
} from "recharts";
import { useAuth } from '../store/auth';

const User_history = () => {
    const { cars, user } = useAuth();

    // Filter cars based on the user's ID
    const userCars = cars.filter(car => car.cust_id === user._id);


    const categoryCounts = userCars.reduce((acc, product) => {
        if (product.category) {
            // Increment count for existing category or initialize with count of 1
            acc[product.category] = (acc[product.category] || 0) + 1;
        }
        return acc;
    }, {});

    // Prepare data for displaying category counts
    const data = [
        { Category: "Maruti", count: categoryCounts["Maruti"] || 0 },
        { Category: "Tata", count: categoryCounts["Tata"] || 0 },
        { Category: "Mahindra", count: categoryCounts["Mahindra"] || 0 },
        { Category: "Hyundai", count: categoryCounts["Hyundai"] || 0 },
        { Category: "Kia", count: categoryCounts["Kia"] || 0 },
        { Category: "Toyota", count: categoryCounts["Toyota"] || 0 },
        { Category: "BMW", count: categoryCounts["BMW"] || 0 },
        { Category: "Mercedes-Benz", count: categoryCounts["Mercedes-Benz"] || 0 },
    ];

    return (
        <>
            <section className="user_history_section">
               <div style={{marginTop:"4rem"}}><center><h1>User Booked History...!</h1></center></div>
                <div style={{minHeight:"70vh"}} className='container admin-users'>
                    {userCars.length > 0 ? (
                        <table>
                            <thead>
                                <tr>
                                    <th>Serial No</th>
                                    <th>Car Name</th>
                                    <th>Image</th>
                                    <th>Transaction Id</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userCars.map((car, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td> {/* Autoincrement serial number */}
                                        <td>{car.carname}</td>
                                        <td>
                                            <img src={`${car.image}`} alt={car.carname} style={{ width: '100px' }} />
                                        </td>
                                        <td>{car.transaction_id}</td>
                                        <td>{car.booked ? 'Booked' : 'Available'}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <h2 style={{margin:"auto",color:"red", fontSize:"3rem"}}>No cars found for this user.</h2>
                    )}
                </div>
                <div>
                <div style={{ textAlign: "center", color: "white" }}> {/* Centered content with white text */}
                    <h1>Graphical Analysis</h1>
                    <div className="chart">
                        <div>
                            <h2 style={{ fontSize: "3rem", color: "blueviolet" }}><i>chart-1: LineChart</i></h2>
                            <LineChart
                                width={800}
                                height={300}
                                data={data}
                                margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="Category"
                                    scale="point"
                                    style={{fontSize:"1.5rem"}}
                                    padding={{ left: 20, right: 20 }}
                                    tick={{ fill: "white" }} />
                                <YAxis style={{fontSize:"1.5rem"}} tick={{ fill: "white" }}/>
                                <Tooltip />
                                <Legend />
                                <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
                            </LineChart>
                        </div>
                        <div>
                            <h2 style={{ fontSize: "3rem", color: "blueviolet" }}><i>chart-1: BarChart</i></h2>
                            <BarChart
                                width={800}
                                height={300}
                                data={data}
                                margin={{
                                    top: 20,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                                barSize={30}
                            >
                                <XAxis
                                    dataKey="Category"
                                    scale="point"
                                    padding={{ left: 20, right: 20 }}
                                    tick={{ fill: "white" }} // White-colored ticks on X-axis
                                    style={{fontSize:"1.5rem"}}
                                />
                                <YAxis style={{fontSize:"1.5rem"}} tick={{ fill: "white" }} /> {/* White-colored ticks on Y-axis */}
                                <Tooltip />
                                <Legend />
                                <CartesianGrid strokeDasharray="3 3" stroke="#666" /> {/* Dashed grid lines */}
                                <Bar dataKey="count" fill="#8884d8" background={{ fill: "#eee" }} />
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
            </section>
        </>
    );
};

export default User_history;
