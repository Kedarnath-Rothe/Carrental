import { IoMdLogOut } from "react-icons/io";
import { Circles } from 'react-loader-spinner';
import { NavLink, Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/auth";

import { FaCarSide, FaUsers } from "react-icons/fa";
import { MdContactSupport, MdManageHistory } from "react-icons/md";


export const AdminLayout = () => {

    const { user, isLoading } = useAuth();

    console.log(user);

    if (isLoading) {
        return <>
           <div className="user-spinner">
           <Circles
                height="600"
                width="100"
                color="#4fa94d"
                ariaLabel="circles-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
            />
           </div>
        </>
    }

    if (!user.isAdmin) {
        return <Navigate to="/" />
    }

    return (
        <>
            <section className="admin_section" style={{minHeight:"80vh"}}>
                <div className="conatiner service_head" >
                    <div className="main-heading service_heading"> Admin pannel ... </div>
                </div>
                <center>
                    <div className="admin_container grid" >

                        {/* First  */}
                        <div className="admin_pannel">
                            <div>
                                <img className="admin_image" src={`${user.image}`} alt="User Image" width="300" />
                                <h2> {user.username} </h2>
                                <h2> {user.email} </h2>
                                <h2> <i>+91 {user.phone}</i> </h2>

                                <br />

                                <NavLink className='navlink' to="/logout"><IoMdLogOut className="logout" /></NavLink>
                            </div>
                        </div>

                        {/* Second */}
                        <div className="admin_details">
                            <hr /> <br />
                            <h2> Hello Dear, {user.username} </h2> <br />
                            <p> As the administrator of our car rental system, you hold considerable authority and responsibility. Your pivotal role is essential for guaranteeing the seamless operation of our service. </p>
                            <br />

                            <div className="card-container grid-links">
                                <NavLink to='/admin/users' >
                                    <div className="card">
                                        <FaUsers className="icons" />
                                        <h2>Users</h2>
                                    </div>
                                </NavLink>

                                <NavLink to='/admin/contacts' >
                                    <div className="card">
                                        <MdContactSupport className="icons" />
                                        <h2>Contacts</h2>
                                    </div>
                                </NavLink>

                                <NavLink to="/admin/cars">
                                    <div className="card">
                                        <MdManageHistory className="icons" />
                                        <h2>ManageCars</h2>
                                    </div>
                                </NavLink>

                                <NavLink to="/addcar">
                                    <div className="card">
                                        <FaCarSide className="icons" />
                                        <h2>Add_Cars</h2>
                                    </div>
                                </NavLink>
                            </div>


                        </div>

                    </div>
                </center>
            </section>
            <Outlet />
        </>
    )
}

