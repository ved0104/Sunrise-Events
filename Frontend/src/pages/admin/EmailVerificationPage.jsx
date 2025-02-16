import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import { toast } from "react-toastify";

const AdminEmailVerificationPage = () => {
	const [code, setCode] = useState(["", "", "", "", "", ""]);
	const inputRefs = useRef([]);
	const navigate = useNavigate();

	const { error, isLoading, verifyAdminEmail } = useAdminAuthStore();

	const handleChange = (index, value) => {
		const newCode = [...code];

		// Handle pasted content
		if (value.length > 1) {
			const pastedCode = value.slice(0, 6).split("");
			for (let i = 0; i < 6; i++) {
				newCode[i] = pastedCode[i] || "";
			}
			setCode(newCode);

			// Focus on the last non-empty input or the first empty one
			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
			inputRefs.current[focusIndex]?.focus();
		} else {
			newCode[index] = value;
			setCode(newCode);

			// Move focus to the next input field if value is entered
			if (value && index < 5) {
				inputRefs.current[index + 1]?.focus();
			}
		}
	};

	const handleKeyDown = (index, e) => {
		if (e.key === "Backspace" && !code[index] && index > 0) {
			inputRefs.current[index - 1]?.focus();
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		const verificationCode = code.join("");
		if (verificationCode.length < 6) {
			toast.error("Please enter all 6 digits!", {
			  position: "top-right",
			  autoClose: 3000,
			  hideProgressBar: false,
			  closeOnClick: true,
			  pauseOnHover: true,
			  draggable: true,
			  theme: "dark",
			});
			return;
		  }
		try {
			const success=await verifyAdminEmail(verificationCode);
			if(success){
				toast.success("Admin email verified successfully!", {
					position: "top-right",
					autoClose: 2000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "dark",
				  });
			
				  setTimeout(() => {
					navigate("/admin/dashboard");
				  }, 2000);
			}else{
				toast.error("Invalid verification code.", {
					position: "top-right",
					autoClose: 3000,
					hideProgressBar: false,
					closeOnClick: true,
					pauseOnHover: true,
					draggable: true,
					theme: "dark",
				  });
			}
			
		} catch (error) {
			console.log(error);
			toast.error(error || "Verification failed! Try again.", {
				position: "top-right",
				autoClose: 3000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				theme: "dark",
			  });
		}
	};

	// Auto-submit when all fields are filled
	useEffect(() => {
		if (code.every((digit) => digit !== "")) {
			handleSubmit(new Event("submit"));
		}
	}, [code]);

	return (
		<div className="flex flex-col min-h-screen justify-center items-center p-4">
		  <motion.div
			initial={{ opacity: 0, y: -50 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-6 sm:p-8 w-full max-w-md"
		  >
			<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text">
			  Admin Email Verification
			</h2>
			<p className="text-center text-gray-500 mb-6 text-sm sm:text-base">
			  Enter the 6-digit code sent to your admin email.
			</p>
	  
			<form onSubmit={handleSubmit} className="space-y-6">
			  <div className="flex justify-between gap-2 sm:gap-4">
				{code.map((digit, index) => (
				  <input
					key={index}
					ref={(el) => (inputRefs.current[index] = el)}
					type="text"
					maxLength="1"
					value={digit}
					onChange={(e) => handleChange(index, e.target.value)}
					onKeyDown={(e) => handleKeyDown(index, e)}
					className="w-10 h-10 sm:w-12 sm:h-12 text-center text-xl sm:text-2xl font-bold bg-white text-black border-2 border-gray-700 rounded-lg focus:border-amber-500 focus:outline-none"
				  />
				))}
			  </div>
			  <motion.button
				whileHover={{ scale: 1.05 }}
				whileTap={{ scale: 0.95 }}
				type="submit"
				disabled={isLoading || code.some((digit) => !digit)}
				className="w-full bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-50"
			  >
				{isLoading ? "Verifying..." : "Verify Email"}
			  </motion.button>
			</form>
		  </motion.div>
		</div>
	  );
};

export default AdminEmailVerificationPage;





// import { useEffect, useRef, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { useAdminAuthStore } from "../../store/adminAuthStore";
// import { toast } from "react-toastify";

// const AdminEmailVerificationPage = () => {
// 	const [code, setCode] = useState(["", "", "", "", "", ""]);
// 	const inputRefs = useRef([]);
// 	const navigate = useNavigate();

// 	const { error, isLoading, verifyAdminEmail } = useAdminAuthStore();

// 	const handleChange = (index, value) => {
// 		const newCode = [...code];

// 		// Handle pasted content
// 		if (value.length > 1) {
// 			const pastedCode = value.slice(0, 6).split("");
// 			for (let i = 0; i < 6; i++) {
// 				newCode[i] = pastedCode[i] || "";
// 			}
// 			setCode(newCode);

// 			// Focus on the last non-empty input or the first empty one
// 			const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
// 			const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
// 			inputRefs.current[focusIndex]?.focus();
// 		} else {
// 			newCode[index] = value;
// 			setCode(newCode);

// 			// Move focus to the next input field if value is entered
// 			if (value && index < 5) {
// 				inputRefs.current[index + 1]?.focus();
// 			}
// 		}
// 	};

// 	const handleKeyDown = (index, e) => {
// 		if (e.key === "Backspace" && !code[index] && index > 0) {
// 			inputRefs.current[index - 1]?.focus();
// 		}
// 	};

// 	const handleSubmit = async (e) => {
// 		e.preventDefault();
// 		const verificationCode = code.join("");
// 		if (verificationCode.length < 6) {
// 			toast.error("Please enter all 6 digits!", {
// 			  position: "top-right",
// 			  autoClose: 3000,
// 			  hideProgressBar: false,
// 			  closeOnClick: true,
// 			  pauseOnHover: true,
// 			  draggable: true,
// 			  theme: "dark",
// 			});
// 			return;
// 		  }
// 		try {
// 			const success=await verifyAdminEmail(verificationCode);
// 			if(success){
// 				toast.success("Admin email verified successfully!", {
// 					position: "top-right",
// 					autoClose: 2000,
// 					hideProgressBar: false,
// 					closeOnClick: true,
// 					pauseOnHover: true,
// 					draggable: true,
// 					theme: "dark",
// 				  });
			
// 				  setTimeout(() => {
// 					navigate("/admin/dashboard");
// 				  }, 2000);
// 			}else{
// 				toast.error("Invalid verification code.", {
// 					position: "top-right",
// 					autoClose: 3000,
// 					hideProgressBar: false,
// 					closeOnClick: true,
// 					pauseOnHover: true,
// 					draggable: true,
// 					theme: "dark",
// 				  });
// 			}
			
// 		} catch (error) {
// 			console.log(error);
// 			toast.error(error || "Verification failed! Try again.", {
// 				position: "top-right",
// 				autoClose: 3000,
// 				hideProgressBar: false,
// 				closeOnClick: true,
// 				pauseOnHover: true,
// 				draggable: true,
// 				theme: "dark",
// 			  });
// 		}
// 	};

// 	// Auto-submit when all fields are filled
// 	useEffect(() => {
// 		if (code.every((digit) => digit !== "")) {
// 			handleSubmit(new Event("submit"));
// 		}
// 	}, [code]);

// 	return (
// 		<div className="flex flex-col min-h-screen justify-center items-center">
// 			<motion.div
// 				initial={{ opacity: 0, y: -50 }}
// 				animate={{ opacity: 1, y: 0 }}
// 				transition={{ duration: 0.5 }}
// 				className='bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md'
// 			>
// 				<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text'>
// 					Admin Email Verification
// 				</h2>
// 				<p className='text-center text-gray-500 mb-6'>Enter the 6-digit code sent to your admin email.</p>

// 				<form onSubmit={handleSubmit} className='space-y-6'>
// 					<div className='flex justify-between'>
// 						{code.map((digit, index) => (
// 							<input
// 								key={index}
// 								ref={(el) => (inputRefs.current[index] = el)}
// 								type='text'
// 								maxLength='1'
// 								value={digit}
// 								onChange={(e) => handleChange(index, e.target.value)}
// 								onKeyDown={(e) => handleKeyDown(index, e)}
// 								className='w-12 h-12 text-center text-2xl font-bold bg-white text-black border-2 border-gray-700 rounded-lg focus:border-amber-500 focus:outline-none'
// 							/>
// 						))}
// 					</div>
// 					<motion.button
// 						whileHover={{ scale: 1.05 }}
// 						whileTap={{ scale: 0.95 }}
// 						type='submit'
// 						disabled={isLoading || code.some((digit) => !digit)}
// 						className='w-full bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold py-3 px-4 rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 disabled:opacity-50'
// 					>
// 						{isLoading ? "Verifying..." : "Verify Email"}
// 					</motion.button>
// 				</form>
// 			</motion.div>
// 		</div>
// 	);
// };

// export default AdminEmailVerificationPage;
