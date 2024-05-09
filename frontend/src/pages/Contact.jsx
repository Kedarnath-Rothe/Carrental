import axios from 'axios';
import { useState } from "react";
import { Helmet } from 'react-helmet';
import { Comment } from 'react-loader-spinner';
import { toast } from "react-toastify";
import { useAuth } from "../store/auth";

const Contact = () => {

    const [img, setImg] = useState(null);
    const [loading, setLoading] = useState(false);


    const [contact, setContact] = useState({
        username: "",
        email: "",
        message: "",
    });

    const [userData, setUserData] = useState(true);
    const { user } = useAuth();

    if (userData && user) {
        setContact({
            username: user.username,
            email: user.email,
            message: "",
        });

        setUserData(false);
    }

    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        setContact({
            ...contact,
            [name]: value,
        });
    };

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

    // const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);

            const imgUrl = await uploadFile('image');

            console.log(imgUrl);


            const formData = new FormData();
            formData.append("username", contact.username);
            formData.append("email", contact.email);
            formData.append("message", contact.message);
            formData.append("aadhar_card", contact.aadhar_card); // Append the image file

            const response = await fetch("https://carrental-khaki.vercel.app/api/form/contact", {
                method: "POST",
                headers: {
                    "X-Additional-Info": imgUrl // Custom header with additional info
                },
                body: formData,
            });

            if (response.ok) {
                setContact({
                    ...contact,
                    message: "",
                    aadhar_card: null, // Reset the image field after successful submission
                });

                toast.success("Message sent successfully");
                setLoading(false);
            } else {
                toast.error("Fill inputs properly");
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const [showImageField, setShowImageField] = useState(false);

    const handleCheckboxChange = (e) => {
        setShowImageField(e.target.checked);
    };

    return (
        <>
            <Helmet>
                <title>Contact Us - Car Rental System</title>
                <meta name="description" content="Contact us for inquiries about our car rental services." />
            </Helmet>
            <section className="section-contact">
                <br />

                <center><p className="car_provider" >If you have any query or you want to become a Car Provider then Contact us...</p></center>

                <div className="container grid grid-two-cols">
                    <div className="contact-img">
                        <img src="/images/contact.png" alt="Contact Image" />
                        {
                            loading && (<Comment
                                visible={true}
                                height="80"
                                width="80"
                                ariaLabel="comment-loading"
                                wrapperStyle={{}}
                                wrapperClass="comment-wrapper"
                                color="#fff"
                                backgroundColor="#F4442E"
                            />)

                        }
                    </div>

                    <div className="section-form">

                        <h1 className="main-heading">Contact Us</h1>
                        <br />

                        <form onSubmit={handleSubmit}>
                            <div>
                                <label htmlFor="username">Username</label>
                                <input
                                    type="text"
                                    placeholder="Enter your name"
                                    name="username"
                                    id="username"
                                    autoComplete="off"
                                    value={contact.username}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="email">Email</label>
                                <input
                                    type="email"
                                    placeholder="Enter your email"
                                    name="email"
                                    id="email"
                                    autoComplete="off"
                                    value={contact.email}
                                    onChange={handleInput}
                                    required
                                />
                            </div>

                            <div>
                                <label htmlFor="message">Message</label>
                                <textarea
                                    name="message"
                                    id="message"
                                    autoComplete="off"
                                    value={contact.message}
                                    onChange={handleInput}
                                    required
                                    cols="30"
                                    rows="2"
                                ></textarea>
                            </div>

                            {/* Add checkbox for becoming a car provider */}
                            <div>
                                <label htmlFor="become-provider-checkbox" className={`checkbox-label ${showImageField ? 'active' : ''}`}>
                                    Do you want to become a Car Provider ?
                                </label>
                                <input
                                    type="checkbox"
                                    id="become-provider-checkbox"
                                    checked={showImageField}
                                    onChange={handleCheckboxChange}
                                    style={{ marginLeft: '5px' }} // Add some margin between the text and the checkbox
                                />
                            </div>

                            <div>
                                <label htmlFor="aadhar_card">Aadhar Card</label>
                                <input
                                    type="file"
                                    name="aadhar_card"
                                    id="aadhar_card"
                                    accept="image/*"
                                    onChange={(e) => setImg(() => e.target.files[0])}
                                    // Make the input required only if showImageField is true
                                    {...(showImageField && { required: true })}
                                />
                            </div>
                            <div>
                                <button type="submit">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Your map section */}
            </section>
        </>
    );
};

export default Contact;
