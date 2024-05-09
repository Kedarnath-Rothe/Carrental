import { useState } from "react";
import { Helmet } from "react-helmet";
import { DNA } from "react-loader-spinner";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from "../store/auth";

const Login = () => {

    const [loading, setLoading] = useState(false);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [forgotEmail, setForgotEmail] = useState("");

    const [user, setUser] = useState({
        email: "",
        password: "",
    })

    // Handling the input value
    const handleInput = (e) => {                 //e --> event
        console.log(e);
        let name = e.target.name;
        let value = e.target.value;

        setUser({
            ...user,
            [name]: value,                       //username : "kedar", email : "-----"
        })
    }

    // Handling the form submission
    const { storeTokenInLS } = useAuth();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user);

        try {
            setLoading(true);
            const response = await fetch('https://carrental-khaki.vercel.app/api/auth/login', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(user),
            })

            console.log(response);

            const res_data = await response.json();

            if (response.ok) {
                toast.success("LOGIN SUCCESSFUL");

                storeTokenInLS(res_data.token);
                setUser({ email: "", password: "" });

                setLoading(false);

                navigate('/userhome');
                window.location.reload();
            }
            else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
                console.log("INVALID CREDENTIALS");
                setUser({ email: "", password: "" });
            }


        }
        catch (error) {
            console.error(error);
        }
    }

    const handleForgotPassword = (e) => {
        e.preventDefault();
        setShowForgotPassword(true);
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            const response = await fetch("https://carrental-khaki.vercel.app/api/auth/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: forgotEmail }),
            });

            const res_data = await response.json();

            if (response.ok) {
                toast.success("Password reset email sent successfully.");
            } else {
                toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return <>
        <Helmet>
            <title>Login - Car Rental System</title>
            <meta name="description" content="Login to access your account and manage car rentals." />
        </Helmet>
        <section>
            <main>
                <div className="section-registration">
                    <div className="container grid grid-two-cols" style={{ minHeight: "90vh" }}>
                        <div className="registration-image">
                            <img src="/images/register.png" width="500" height="500" alt="Login image" />
                        </div>

                        {/* Tackel registration form */}
                        <div className="registration-form" >
                            <h1 className="main-heading mb-3" > Login Form </h1>
                            <br />

                            <form onSubmit={handleSubmit} >

                                <div>
                                    <label htmlFor="email" >email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="enter your email"
                                        id="email"
                                        required
                                        autoComplete="off"
                                        value={user.email}
                                        onChange={handleInput}
                                    />
                                </div>

                                <div>
                                    <label htmlFor="password" >password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="password"
                                        id="password"
                                        required
                                        autoComplete="off"
                                        value={user.password}
                                        onChange={handleInput}
                                    />
                                </div>

                                <br />
                                <button type="submit" className="btn btn-submit" >
                                    Login
                                </button>
                                <a style={{ color: "red", cursor: 'pointer' }} onClick={handleForgotPassword} className="btn btn-link">
                                    Forgot Password?
                                </a>
                            </form>
                            {
                                loading && (<DNA
                                    visible={true}
                                    height="80"
                                    width="80"
                                    ariaLabel="dna-loading"
                                    wrapperStyle={{}}
                                    wrapperClass="dna-wrapper"
                                />)

                            }

                            {showForgotPassword && (
                                <form onSubmit={handleResetPassword}>
                                    <div>
                                        <label htmlFor="forgotEmail">Email</label>
                                        <input
                                            type="email"
                                            name="forgotEmail"
                                            placeholder="Enter your email"
                                            id="forgotEmail"
                                            required
                                            autoComplete="off"
                                            value={forgotEmail}
                                            onChange={(e) => setForgotEmail(e.target.value)}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-submit">
                                        Reset Password
                                    </button>
                                </form>
                            )}

                        </div>
                    </div>
                </div>
            </main>
        </section>
    </>
}

export default Login;