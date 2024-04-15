import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const EmailVerify = () => { 
    const { id, token } = useParams();

    console.log(id);

    useEffect(() => {
        const verifyEmailUrl = async () => {
            try {
                const url = `https://carrental-khaki.vercel.app/api/auth/${id}/verify/${token}`;
                const response = await fetch(url);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data); // Log response data
 
            } catch (error) {
                console.error("Fetch error:", error); 
            }
        };

        verifyEmailUrl();
    }, [id, token]); // Include id and token in the dependency array

    return (
        <>
            <div className="verified">
                <h1>Email verified successfully</h1> <br/>
                <img alt="Verified Image" src="/images/Verified.png"/>
                <Link to="/login">
                    <button>Go to Login</button>
                </Link>
            </div>
        </>
    );
};

export default EmailVerify;
