import { motion } from "framer-motion";
import { useState } from "react";
import { useAdminAuthStore } from "../../store/adminAuthStore"; // Import adminAuthStore
import Input from "../../Components/Input";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
const AdminForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const { isLoading, forgotPassword } = useAdminAuthStore(); // Use adminAuthStore

	const handleSubmit = async (e) => {
		e.preventDefault();
		const response = await forgotPassword(email);
		if (!response.success) {
			toast.error(response.message, {
			  position: "top-right",
			  autoClose: 3000,
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: true,
			  draggable: true,
			  theme: "dark",
			});
		  } else {
			setIsSubmitted(true);
			toast.success("A reset link has been sent!", {
			  position: "top-right",
			  autoClose: 3000,
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: true,
			  draggable: true,
			  theme: "dark",
			});
		  }
		setIsSubmitted(true);
	};

	return (
		<div className="flex flex-col min-h-screen justify-center items-center p-4">
		  <motion.div
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="w-full max-w-md bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
		  >
			<div className="p-6 sm:p-8">
			  <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text">
				Admin Forgot Password
			  </h2>
	  
			  {!isSubmitted ? (
				<form onSubmit={handleSubmit}>
				  <p className="text-gray-500 mb-6 text-center text-sm sm:text-base">
					Enter your admin email address, and we'll send you a link to reset your password.
				  </p>
				  <Input
					icon={Mail}
					type="email"
					placeholder="Admin Email Address"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				  />
				  <motion.button
					whileHover={{ scale: 1.02 }}
					whileTap={{ scale: 0.98 }}
					className="w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition duration-200"
					type="submit"
					disabled={isLoading}
				  >
					{isLoading ? <Loader className="size-6 animate-spin mx-auto" /> : "Send Reset Link"}
				  </motion.button>
				</form>
			  ) : (
				<div className="text-center">
				  <motion.div
					initial={{ scale: 0 }}
					animate={{ scale: 1 }}
					transition={{ type: "spring", stiffness: 500, damping: 30 }}
					className="w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4"
				  >
					<Mail className="h-8 w-8 text-white" />
				  </motion.div>
				  <p className="text-gray-300 mb-6 text-sm sm:text-base">
					If an admin account exists for {email}, you will receive a password reset link shortly.
				  </p>
				</div>
			  )}
			</div>
	  
			<div className="px-6 sm:px-8 py-4 bg-amber-200 bg-opacity-50 flex justify-center">
			  <Link to={"/admin/login"} className="text-sm text-black hover:underline flex items-center">
				<ArrowLeft className="h-4 w-4 mr-2" /> Back to Admin Login
			  </Link>
			</div>
		  </motion.div>
		</div>
	  );
};

export default AdminForgotPasswordPage;





// import { motion } from "framer-motion";
// import { useState } from "react";
// import { useAdminAuthStore } from "../../store/adminAuthStore"; // Import adminAuthStore
// import Input from "../../Components/Input";
// import { ArrowLeft, Loader, Mail } from "lucide-react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// const AdminForgotPasswordPage = () => {
// 	const [email, setEmail] = useState("");
// 	const [isSubmitted, setIsSubmitted] = useState(false);

// 	const { isLoading, forgotPassword } = useAdminAuthStore(); // Use adminAuthStore

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const response = await forgotPassword(email);
// 		if (!response.success) {
// 			toast.error(response.message, {
// 			  position: "top-right",
// 			  autoClose: 3000,
// 			  hideProgressBar: false,
// 			  closeOnClick: true,
// 			  pauseOnHover: true,
// 			  draggable: true,
// 			  theme: "dark",
// 			});
// 		  } else {
// 			setIsSubmitted(true);
// 			toast.success("A reset link has been sent!", {
// 			  position: "top-right",
// 			  autoClose: 3000,
// 			  hideProgressBar: false,
// 			  closeOnClick: true,
// 			  pauseOnHover: true,
// 			  draggable: true,
// 			  theme: "dark",
// 			});
// 		  }
// 		setIsSubmitted(true);
// 	};

// 	return (
// 		<div className="flex flex-col min-h-screen justify-center items-center">
// 			<motion.div
// 				initial={{ opacity: 0, y: 20 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ duration: 0.5 }}
// 				className='max-w-md w-full bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'
// 			>
// 				<div className='p-8'>
// 					<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text'>
// 						Admin Forgot Password
// 					</h2>

// 					{!isSubmitted ? (
// 						<form onSubmit={handleSubmit}>
// 							<p className='text-gray-500 mb-6 text-center'>
// 								Enter your admin email address, and we'll send you a link to reset your password.
// 							</p>
// 							<Input
// 								icon={Mail}
// 								type='email'
// 								placeholder='Admin Email Address'
// 								value={email}
// 								onChange={(e) => setEmail(e.target.value)}
// 								required
// 							/>
// 							<motion.button
// 								whileHover={{ scale: 1.02 }}
// 								whileTap={{ scale: 0.98 }}
// 								className='w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition duration-200'
// 								type='submit'
// 								disabled={isLoading}
// 							>
// 								{isLoading ? <Loader className='size-6 animate-spin mx-auto' /> : "Send Reset Link"}
// 							</motion.button>
// 						</form>
// 					) : (
// 						<div className='text-center'>
// 							<motion.div
// 								initial={{ scale: 0 }}
// 								animate={{ scale: 1 }}
// 								transition={{ type: "spring", stiffness: 500, damping: 30 }}
// 								className='w-16 h-16 bg-amber-200 rounded-full flex items-center justify-center mx-auto mb-4'
// 							>
// 								<Mail className='h-8 w-8 text-white' />
// 							</motion.div>
// 							<p className='text-gray-300 mb-6'>
// 								If an admin account exists for {email}, you will receive a password reset link shortly.
// 							</p>
// 						</div>
// 					)}
// 				</div>

// 				<div className='px-8 py-4 bg-amber-200 bg-opacity-50 flex justify-center'>
// 					<Link to={"/admin/login"} className='text-sm text-black hover:underline flex items-center'>
// 						<ArrowLeft className='h-4 w-4 mr-2' /> Back to Admin Login
// 					</Link>
// 				</div>
// 			</motion.div>
// 		</div>
// 	);
// };

// export default AdminForgotPasswordPage;
