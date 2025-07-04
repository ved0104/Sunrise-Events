import { useState } from "react";
import { motion } from "framer-motion";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../../Components/Input";
import { Lock } from "lucide-react";
import toast from "react-hot-toast";

const AdminResetPasswordPage = () => {
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const { resetPassword, error, isLoading, message } = useAdminAuthStore();

	const { token } = useParams();
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (password !== confirmPassword) {
			toast.error("Passwords do not match!", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			return;
		}
		try {
			await resetPassword(token, password);

			toast.success("Password reset successfully! Redirecting...", {
				position: "top-right",
				autoClose: 2000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
			setTimeout(() => {
				navigate("/login");
			}, 2000);
		} catch (error) {
			console.error(error);
			toast.error(error.response?.data?.message || "Error resetting password", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "dark",
			});
		}
	};
	return (
		<div className="min-h-screen flex flex-col justify-center items-center p-4">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='w-full max-w-md bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
			>
				<div className='p-6 sm:p-8'>
					<h2 className='text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text'>
						Admin Reset Password
					</h2>
					{error && <p className='text-red-500 text-sm mb-4'>{error}</p>}
					{message && <p className='text-green-500 text-sm mb-4'>{message}</p>}
	
					<form onSubmit={handleSubmit}>
						<Input
							icon={Lock}
							type='password'
							placeholder='New Password'
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							required
						/>
	
						<Input
							icon={Lock}
							type='password'
							placeholder='Confirm New Password'
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							required
						/>
	
						<motion.button
							whileHover={{ scale: 1.02 }}
							whileTap={{ scale: 0.98 }}
							className='w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition duration-200'
							type='submit'
							disabled={isLoading}
						>
							{isLoading ? "Resetting..." : "Set New Password"}
						</motion.button>
					</form>
				</div>
			</motion.div>
		</div>
	);
};

export default AdminResetPasswordPage;