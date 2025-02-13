import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../Components/Input";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";
const LoginPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const { login, isLoading, error } = useAuthStore();

	const handleLogin = async (e) => {
		e.preventDefault();
		const success=await login(email, password);
		//
		 // Notify Navbar and others
		if(!success){
		toast.error("Invalid email or password!", {
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
		else{
			localStorage.setItem("user", JSON.stringify({isLoggedIn: true}));
   	 		window.dispatchEvent(new Event("userAuthenticated"));
		}
	};

	return (
		<div className="flex min-h-screen justify-center items-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex flex-row bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl overflow-hidden'
			>
				<div className="h-[90vh] w-[70vh] bg-[url('assets/images/loginphotos/login.jpg')] bg-no-repeat bg-center bg-cover text-white">
					<h1 className="text-5xl font-medium pt-5 pl-5">Register and Be<br/>part of our circle</h1>
					<ul className="text-lg font-medium pl-10 pt-10">
						<li>- Exclusive decorations</li>
						<li>- Trustable service</li>
					</ul>
				</div>
				<div className="h-[90vh] w-[70vh]">
					<div className='p-8'>
						<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text'>
							Welcome Back
						</h2>

						<form onSubmit={handleLogin}>
							<Input
								icon={Mail}
								type='email'
								placeholder='Email Address'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>

							<Input
								icon={Lock}
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>

							<div className='flex items-center mb-6'>
								<Link to='/forgot-password' className='text-sm text-black hover:underline hover:font-medium'>
									Forgot password?
								</Link>
							</div>

							<motion.button
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								className='w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white font-extrabold rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition duration-200 '
								type='submit'
								disabled={isLoading}
							>
								{isLoading ? <Loader className='w-6 h-6 animate-spin  mx-auto' /> : "Login"}
							</motion.button>
						</form>
					</div>
					<div className='px-8 py-4 bg-amber-200 bg-opacity-50 flex justify-center'>
						<p className='text-sm text-black'>
							Don't have an account?{" "}
							<Link to='/signup' className='text-black hover:underline hover:font-bold'>
								Sign up
							</Link>
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
export default LoginPage;