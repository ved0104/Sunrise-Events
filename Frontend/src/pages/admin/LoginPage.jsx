import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import Input from "../../Components/Input";
import { useAdminAuthStore } from "../../store/adminAuthStore"; // Admin-specific store
import { toast } from "react-toastify";

const AdminLoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Destructure login, isLoading, error, user, and isAuthenticated from admin auth store
  const { login, isLoading, error, user, isAuthenticated } = useAdminAuthStore();
  const navigate = useNavigate();

  // useEffect to redirect once admin is authenticated
  useEffect(() => {
    if (isAuthenticated && user && user.role === "admin") {
      toast.success("Login successful! Redirecting...", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
      setTimeout(() => {
        navigate("/admin/dashboard", { replace: true });
      }, 2000);
    }
  }, [isAuthenticated, user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and Password are required!", {
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
    const success = await login(email, password); // Ensure `login` returns a success flag
    if (!success) {
      toast.error("Invalid email or password!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
    // No manual navigate call here; redirection is handled by useEffect based on auth state.
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
            Admin Portal
          </h2>
          <form onSubmit={handleLogin}>
            <Input
              icon={Mail}
              type="email"
              placeholder="Admin Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              icon={Lock}
              type="password"
              placeholder="Admin Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center mb-6">
              <Link
                to="/admin/forgot-password"
                className="text-sm text-black hover:underline hover:font-medium"
              >
                Forgot password?
              </Link>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition duration-200"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <Loader className="w-6 h-6 animate-spin mx-auto" />
              ) : (
                "Admin Login"
              )}
            </motion.button>
          </form>
        </div>
        <div className="px-6 sm:px-8 py-4 bg-amber-200 bg-opacity-50 flex justify-center">
          <p className="text-sm text-black">
            Not an admin?{" "}
            <Link
              to="/login"
              className="text-black hover:underline hover:font-bold"
            >
              User Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLoginPage;




// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import { Mail, Lock, Loader } from "lucide-react";
// import { Link } from "react-router-dom";
// import Input from "../../Components/Input";
// import { useAdminAuthStore } from "../../store/adminAuthStore"; // Admin-specific store
// import { toast } from "react-toastify";

// const AdminLoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // Destructure login, isLoading, error, user, and isAuthenticated from admin auth store
//   const { login, isLoading, error, user, isAuthenticated } = useAdminAuthStore();
//   const navigate = useNavigate();

//   // useEffect to redirect once admin is authenticated
//   useEffect(() => {
//     if (isAuthenticated && user && user.role === "admin") {
//       toast.success("Login successful! Redirecting...", {
//         position: "top-right",
//         autoClose: 2000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//       setTimeout(() => {
//         navigate("/admin/dashboard", { replace: true });
//       }, 2000);
//     }
//   }, [isAuthenticated, user, navigate]);

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     if (!email || !password) {
//       toast.error("Email and Password are required!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//       return;
//     }
//     const success = await login(email, password); // Ensure `login` returns a success flag
//     if (!success) {
//       toast.error("Invalid email or password!", {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//         draggable: true,
//         theme: "dark",
//       });
//     }
//     // No manual navigate call here; redirection is handled by useEffect based on auth state.
//   };

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
//             Admin Portal
//           </h2>
//           <form onSubmit={handleLogin}>
//             <Input
//               icon={Mail}
//               type="email"
//               placeholder="Admin Email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//             <Input
//               icon={Lock}
//               type="password"
//               placeholder="Admin Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />
//             <div className="flex items-center mb-6">
//               <Link
//                 to="/admin/forgot-password"
//                 className="text-sm text-black hover:underline hover:font-medium"
//               >
//                 Forgot password?
//               </Link>
//             </div>
//             <motion.button
//               whileHover={{ scale: 1.02 }}
//               whileTap={{ scale: 0.98 }}
//               className="w-full py-3 px-4 bg-gradient-to-r from-amber-200 to-amber-400 text-white font-bold rounded-lg shadow-lg hover:from-amber-300 hover:to-amber-500 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-gray-200 transition duration-200"
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading ? (
//                 <Loader className="w-6 h-6 animate-spin mx-auto" />
//               ) : (
//                 "Admin Login"
//               )}
//             </motion.button>
//           </form>
//         </div>
//         <div className="px-8 py-4 bg-amber-200 bg-opacity-50 flex justify-center">
//           <p className="text-sm text-black">
//             Not an admin?{" "}
//             <Link
//               to="/login"
//               className="text-black hover:underline hover:font-bold"
//             >
//               User Login
//             </Link>
//           </p>
//         </div>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminLoginPage;
