import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { useAuth } from "../store/auth";

const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const { authorizationToken, user } = useAuth();
  const navigate = useNavigate();

  const getAllCarsData = async () => {
    try {
      const response = await fetch("https://carrental-khaki.vercel.app/api/admin/cars", {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        }
      });

      if (!response.ok) {
        toast.error("Failed to fetch cars");
        navigate('/admin');
        return;
      }

      const data = await response.json();
      setCars(data);

    } catch (error) {
      console.log(error.message);
    }
  }

  useEffect(() => {
    getAllCarsData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }

  const getCategoryCounts = () => {
    const categoryCounts = {};

    cars.forEach(car => {
      const { category, booked } = car;
      if (!categoryCounts[category]) {
        categoryCounts[category] = { booked: 0, unbooked: 0 };
      }

      if (booked) {
        categoryCounts[category].booked++;
      } else {
        categoryCounts[category].unbooked++;
      }
    });

    return categoryCounts;
  };

  const categoryCounts = getCategoryCounts();

  const barChartData = Object.keys(categoryCounts).map(category => ({
    category,
    booked: categoryCounts[category].booked,
    unbooked: categoryCounts[category].unbooked,
  }));

  const deleteCar = async (id) => {
    try {
      const response = await fetch(`https://carrental-khaki.vercel.app/api/admin/cars/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        }
      });

      if (response.ok) {
        getAllCarsData();
        toast.success("Car deleted successfully");
      } else {
        toast.error("Failed to delete car");
      }

    } catch (error) {
      console.log(error.message);
    }
  }

  return (
    <>
      <section className="admin-cars-section">
        <div style={{ marginTop: "4rem" }}>
          <center><h1>Admin Cars Data</h1></center>
        </div>
        <div className="container admin-cars">
          <table>
            <thead>
              <tr>
                <th>Sr no.</th>
                <th>Car Name</th>
                <th>Price</th>
                <th>Owner</th>
                <th>Image</th>
                <th>Status</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {cars.map((curCar, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{curCar.carname}</td>
                  <td>Rs.{curCar.price}/hr</td>
                  <td>{curCar.owner_name}</td>
                  <td>
                    <img src={`${curCar.image}`} alt="Car" width="100" />
                  </td>
                  <td>
                    {curCar.booked ? (
                      <span>Booked by {curCar.cust_name} <br /> <p>{curCar.cust_phone}</p></span>
                    ) : (
                      <span>Available</span>
                    )}
                  </td>
                  <td className="edit">
                    <button>
                      <Link className="edit" style={{ color: "white" }} to={`/admin/cars/${curCar._id}/edit`}>Edit</Link>
                    </button>
                  </td>
                  <td className="delete">
                    <button onClick={() => deleteCar(curCar._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
      <br/>
      <br/>
      <br/>

      {/* Render Bar Chart */}
      <div className="chart" style={{ marginTop: '20px' }}>
        <h2 style={{fontSize:"3rem"}}>Car Category Counts</h2>
        <br/>
        <BarChart width={800} height={400} data={barChartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis  style={{fontSize:"2rem"}} tick={{ fill: "white" }} dataKey="category" />
          <YAxis  style={{fontSize:"2rem"}} tick={{ fill: "white" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="booked" stackId="a" fill="#009900" />
          <Bar dataKey="unbooked" stackId="a" fill="#3399ff" />
        </BarChart>
      </div>
    </>
  );
}

export default AdminCars;
