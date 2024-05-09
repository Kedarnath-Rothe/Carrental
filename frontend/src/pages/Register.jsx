import axios from 'axios';
import { useState } from "react";
import { Helmet } from 'react-helmet';
import { ThreeDots } from 'react-loader-spinner';
import { toast } from 'react-toastify';

const Register = () => {

    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState("");

    const [user, setUser] = useState({
        username: "",
        email: "",
        phone: "",
        password: "",
    })


    const handleInput = (e) => {
        let name = e.target.name;
        let value = e.target.value;

        // If the input is an image, update the image state
        if (name === "image") {
            value = e.target.files[0];
        }

        setUser({
            ...user,
            [name]: value,
        })
    }

    // Upload
    const uploadFile = async (type) => {
        const data = new FormData();
        data.append("file", img);
        data.append("upload_preset", type === 'image' ? 'images_preset' : 'videos_preset');

        try {
            let cloudName = 'diyw5ilre';
            let resourceType = type === 'image' ? 'image' : 'video';
            let api = `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`;

            const res = await axios.post(api, data);
            const { secure_url } = res.data;
            console.log(secure_url);
            return secure_url;
        } catch (error) {
            console.error(error);
        }
    }

    // Handling the form submission
    // const { storeTokenInLS } = useAuth();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const imgUrl = await uploadFile('image');

            console.log(imgUrl);

            const formData = new FormData();
            formData.append("username", user.username);
            formData.append("email", user.email);
            formData.append("phone", user.phone);
            formData.append("password", user.password);

            const response = await fetch('https://carrental-khaki.vercel.app/api/auth/register', {
                method: "POST",
                headers: {
                    "X-Additional-Info": imgUrl // Custom header with additional info
                },
                body: formData,
            });

            console.log(response);

            const responseData = await response.json();
            console.log(responseData.message);

            if (response.ok) {
                setMsg(responseData.message);
                toast.success("An Email sent to your account please verify...!");
                setLoading(false);
                // storeTokenInLS(responseData.token);
                setUser({
                    username: "",
                    email: "",
                    phone: "",
                    password: "",
                    image: null, // Reset the image field after submission
                });
                console.log(responseData);
            }
            else {
                toast.error(responseData.extraDetails ? responseData.extraDetails : responseData.message);
                console.log("Error inside response");
            }
        } catch (error) {
            console.error("ERROR", error);
        }
    }

    return (
        <>
            <Helmet>
                <title>Register - Car Rental System</title>
                <meta name="description" content="Create a new account to start renting cars with us." />
            </Helmet>
            <section>
                <main>
                    <div className="section-registration">
                        <div className="container grid grid-two-cols">
                            <div className="registration-image">
                                <img className="register_image" src="/images/register.png" alt="Register image" />
                            </div>

                            {/* Tackle registration form */}
                            <div className="registration-form" style={{ minHeight: "70vh" }}>
                                <h1 className="main-heading mb-3"> Registration Form </h1>

                                <div className="form">
                                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                                        <div>
                                            <label htmlFor="username">Username</label>
                                            <input
                                                type="text"
                                                name="username"
                                                placeholder="Username"
                                                id="username"
                                                required
                                                autoComplete="off"
                                                value={user.username}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="email">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                placeholder="Enter your email"
                                                id="email"
                                                required
                                                autoComplete="off"
                                                value={user.email}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="phone">Phone</label>
                                            <input
                                                type="number"
                                                name="phone"
                                                placeholder="Phone"
                                                id="phone"
                                                minLength='10'
                                                maxLength='10'
                                                required
                                                autoComplete="off"
                                                value={user.phone}
                                                onChange={handleInput}
                                            />
                                        </div>

                                        {/* Add image input field */}
                                        <div>
                                            <label htmlFor="image">UserImage</label>
                                            <input
                                                type="file"
                                                name="image"
                                                id="image"
                                                accept="image/*"
                                                onChange={(e) => setImg(() => e.target.files[0])}
                                            />
                                        </div>

                                        <div>
                                            <label htmlFor="password">Password</label>
                                            <input
                                                type="password"
                                                name="password"
                                                placeholder="Password"
                                                id="password"
                                                required
                                                autoComplete="off"
                                                value={user.password}
                                                onChange={handleInput}
                                            />
                                        </div>
                                        <br />

                                        {msg && <p style={{ color: "green", fontWeight: "bold" }}>{msg}</p>}

                                        <button type="submit" className="btn btn-submit">
                                            Register Now
                                        </button>
                                    </form>
                                    {
                                        loading && (<ThreeDots
                                            visible={true}
                                            height="80"
                                            width="80"
                                            color="#4fa94d"
                                            radius="9"
                                            ariaLabel="three-dots-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />)

                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section>
        </>
    )
}

export default Register;