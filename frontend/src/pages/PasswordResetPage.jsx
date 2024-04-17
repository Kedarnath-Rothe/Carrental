import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

const PasswordResetPage = () => {
    const { id, token } = useParams(); // Get userId and token from URL params
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`https://carrental-khaki.vercel.app/api/auth/resetPass/${id}/${token}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage(data.message);
                setPassword('');
                setConfirmPassword('');
                toast.success(data.message);
                navigate('/login');
            } else {
                toast.error(data.message);
                throw new Error(data.message || 'Failed to reset password.');
            }
        } catch (error) {
            toast.error(error);
            console.error('Password reset failed:', error);
            setMessage(error.message || 'Failed to reset password. Please try again.');
        }
    };

    return (
        <div className='reset-pass-section'>
            <h1 className='services_heading'>Reset Password</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>New Password:</label><br/>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <br/> 
                <div>
                    <label>Confirm New Password:</label><br/>
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                    />
                </div>
                <br/>
                <br/>
                <button type="submit">Reset Password</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
};

export default PasswordResetPage;
