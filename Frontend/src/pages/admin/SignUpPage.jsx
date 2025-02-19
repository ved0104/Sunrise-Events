import { motion } from "framer-motion";
import Input from "../../Components/Input";
import { Loader, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { useAdminAuthStore } from "../../store/adminAuthStore"; // ✅ Import Admin Auth Store
import { toast } from "react-toastify";
const AdminSignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const navigate = useNavigate();

  const { signup, error, isLoading } = useAdminAuthStore(); // ✅ Use Admin Auth Store

const handleSignUp = async (e) => {
  e.preventDefault();
  
 
  if (!name || !email || !password || !phonenumber) {
    toast.error("All fields are required!", {
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
    const response = await signup(email, password, name, phonenumber);
    
    
    if (response.success) {
      toast.success("Admin account created successfully! Redirecting...", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });

      setTimeout(() => {
        navigate("/admin/verify-email");
      }, 2000);
    }else {
      toast.error(response.message || "Signup failed!", {
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
    console.error("Admin Signup Error:", error.response?.data || error);
    toast.error(error.response?.data?.message || "Error signing up!", {
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

return (
  <div className="flex min-h-screen justify-center items-center p-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
    >
      <div className="p-6 sm:p-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text">
          Create Admin Account
        </h2>

        <form onSubmit={handleSignUp}>
          <Input
            icon={User}
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            icon={Mail}
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            icon={Mail}
            type="text"
            placeholder="Phone Number"
            value={phonenumber}
            onChange={(e) => setPhonenumber(e.target.value)}
          />
          <Input
            icon={Lock}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
          <PasswordStrengthMeter password={password} />

          <motion.button
            className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader className="animate-spin mx-auto" size={24} />
            ) : (
              "Sign Up"
            )}
          </motion.button>
        </form>
      </div>
      <div className="px-6 sm:px-8 py-4 bg-amber-200 bg-opacity-50 flex justify-center">
        <p className="text-sm text-black">
          Already have an account?{" "}
          <Link
            to={"/admin/login"}
            className="text-black hover:underline font-bold"
          >
            Login
          </Link>
        </p>
      </div>
    </motion.div>
  </div>
);
};

export default AdminSignUpPage;





// import { motion } from "framer-motion";
// import Input from "../../Components/Input";
// import { Loader, Lock, Mail, User } from "lucide-react";
// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
// import { useAdminAuthStore } from "../../store/adminAuthStore"; // ✅ Import Admin Auth Store
// import { toast } from "react-toastify";
// const AdminSignUpPage = () => {
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [phonenumber, setPhonenumber] = useState("");
//   const navigate = useNavigate();

//   const { signup, error, isLoading } = useAdminAuthStore(); // ✅ Use Admin Auth Store

// const handleSignUp = async (e) => {
//   e.preventDefault();
  
//   console.log("Signing up admin with:", { email, password, name, phonenumber });
//   if (!name || !email || !password || !phonenumber) {
//     toast.error("All fields are required!", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "dark",
//     });
//     return;
//   }

//   try {
//     const response = await signup(email, password, name, phonenumber);
//     console.log("Signup successful:", response);
    
//     if (response.success) {
//       toast.success("Admin account created successfully! Redirecting...", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });

//       setTimeout(() => {
//         navigate("/admin/verify-email");
//       }, 2000);
//     }else {
//       toast.error(response.message || "Signup failed!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     }
//   } catch (error) {
//     console.error("Admin Signup Error:", error.response?.data || error);
//     toast.error(error.response?.data?.message || "Error signing up!", {
//       position: "top-right",
//       autoClose: 3000,
//       hideProgressBar: false,
//       closeOnClick: true,
//       pauseOnHover: true,
//       draggable: true,
//       theme: "dark",
//     });
//   }
// };


//   return (
//     <div className="flex min-h-screen justify-center items-center">
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="max-w-md w-full bg-amber-50 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden"
//       >
//         <div className="p-8">
//           <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-amber-300 to-amber-500 text-transparent bg-clip-text">
//             Create Admin Account
//           </h2>

//           <form onSubmit={handleSignUp}>
//             <Input
//               icon={User}
//               type="text"
//               placeholder="Full Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//             />
//             <Input
//               icon={Mail}
//               type="email"
//               placeholder="Email Address"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//               icon={Mail}
//               type="text"
//               placeholder="Phone Number"
//               value={phonenumber}
//               onChange={(e) => setPhonenumber(e.target.value)}
//             />
//             <Input
//               icon={Lock}
//               type="password"
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             {error && <p className="text-red-500 font-semibold mt-2">{error}</p>}
//             <PasswordStrengthMeter password={password} />

//             <motion.button
//               className="mt-5 w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition duration-200"
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <Loader className="animate-spin mx-auto" size={24} />
//               ) : (
//                 "Sign Up"
//               )}
//             </motion.button>
//           </form>
//         </div>
//         <div className="px-8 py-4 bg-amber-200 bg-opacity-50 flex justify-center">
//           <p className="text-sm text-black">
//             Already have an account?{" "}
//             <Link to={"/admin/login"} className="text-black hover:underline font-bold">
//               Login
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminSignUpPage;
