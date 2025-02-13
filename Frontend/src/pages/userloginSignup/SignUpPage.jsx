import { motion } from "framer-motion";
import Input from "../../Components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { useAuthStore } from "../../store/authStore";
import { toast } from "react-toastify";

const SignUpPage = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [phonenumber,setphonenumber]=useState("");
	const navigate = useNavigate();

	const { signup, error, isLoading } = useAuthStore();

	const handleSignUp = async (e) => {
		e.preventDefault();
		console.log("Sending data:", { name, email, password, phonenumber }); // ✅ Debugging log

		
		try {
			const success=await signup(email, password, name, phonenumber );
			if (success) {
				toast.success("Signup successful! Please verify your email.", {
				  position: "top-right",
				  autoClose: 3000,
				  hideProgressBar: false,
				  closeOnClick: true,
				  pauseOnHover: true,
				  draggable: true,
				  progress: undefined,
				  theme: "dark",
				});
			
				navigate("/verify-email");
			  }
			  else {
				toast.error("Signup failed! Please check your details.", {
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
		} catch (error) {
			console.log("signup error",error);
		}
	};
	return (
		<div className="flex min-h-screen justify-center items-center">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='flex flex-row bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl shadow-xl 
				overflow-hidden'
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
							Create Account
						</h2>

						<form onSubmit={handleSignUp}>
							<Input
								icon={User}
								type='text'
								placeholder='Full Name'
								value={name}
								onChange={(e) => setName(e.target.value)}
							/>
							<Input
								icon={Mail}
								type='email'
								placeholder='Email Address'
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							/>
							<Input
							icon={User}  // ✅ Change to correct icon
							type='tel'   // ✅ Use correct input type
							placeholder='Phone Number'
							value={phonenumber}
							onChange={(e) => setphonenumber(e.target.value)}
							/>

							<Input
								icon={Lock}
								type='password'
								placeholder='Password'
								value={password}
								onChange={(e) => setPassword(e.target.value)}
							/>
							
							<PasswordStrengthMeter password={password} />

							<motion.button
								className='mt-5 w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white 
								font-bold rounded-lg shadow-lg hover:from-amber-300
								hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2
								focus:ring-offset-gray-200 transition duration-200'
								whileHover={{ scale: 1.02 }}
								whileTap={{ scale: 0.98 }}
								type='submit'
								disabled={isLoading}
							>
								{isLoading ? <Loader className=' animate-spin mx-auto' size={24} /> : "Sign Up"}
							</motion.button>
						</form>
					</div>
					<div className='px-8 py-4 bg-amber-200 bg-opacity-50 flex justify-center'>
						<p className='text-sm text-black'>
							Already have an account?{" "}
							<Link to={"/login"} className='text-black hover:underline hover:font-bold'>
								Login
							</Link>
						</p>
					</div>
				</div>
			</motion.div>
		</div>
	);
};
export default SignUpPage;