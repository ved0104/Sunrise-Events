import { motion } from "framer-motion";
import { useAdminAuthStore } from "../../store/adminAuthStore";
import { formatDate } from "../../utils/date";
import { useNavigate } from "react-router-dom";

const AdminDashboardPage = () => {
	const { user: admin, logout } = useAdminAuthStore();
	const navigate = useNavigate();

	const handleLogout = () => {
		logout();
		navigate("/admin/login"); 
	};

	const handleManageUsers = () => {
		navigate("/admin/manage-users");
	};

	const handleManageServices = () => {
		navigate("/admin/manage-services");
	};

	const handleManageGallery = () => {
		navigate("/admin/manage-gallery");
	};

	return (
		<motion.div
			initial={{ opacity: 0, scale: 0.9 }}
			animate={{ opacity: 1, scale: 1 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.5 }}
			className='max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
		>
			<h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-indigo-600 text-transparent bg-clip-text'>
				Admin Dashboard
			</h2>

			<div className='space-y-6'>
				<motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.2 }}
				>
					<h3 className='text-xl font-semibold text-blue-400 mb-3'>Admin Information</h3>
					<p className='text-gray-300'>Name: {admin?.name}</p>
					<p className='text-gray-300'>Email: {admin?.email}</p>
					<p className='text-gray-300 font-bold'>Role: Super Admin</p>
				</motion.div>

				<motion.div
					className='p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.4 }}
				>
					<h3 className='text-xl font-semibold text-blue-400 mb-3'>Account Activity</h3>
					<p className='text-gray-300'>
						<span className='font-bold'>Joined: </span>
						{new Date(admin.createdAt).toLocaleDateString("en-US")}
					</p>
					<p className='text-gray-300'>
						<span className='font-bold'>Last Login: </span>
						{formatDate(admin.lastLogin)}
					</p>
				</motion.div>
			</div>

			{/* Buttons Section */}
			<div className='mt-6 space-y-4'>
				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleManageUsers}
					className='w-full py-3 px-4 bg-gradient-to-r from-green-500 to-teal-600 text-white 
					font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-teal-700'
				>
					Manage Users
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleManageServices}
					className='w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-pink-600 text-white 
					font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-pink-700'
				>
					Manage Services
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleManageGallery}
					className='w-full py-3 px-4 bg-gradient-to-r from-yellow-500 to-orange-600 text-white 
					font-bold rounded-lg shadow-lg hover:from-yellow-600 hover:to-orange-700'
				>
					Manage Gallery
				</motion.button>

				<motion.button
					whileHover={{ scale: 1.05 }}
					whileTap={{ scale: 0.95 }}
					onClick={handleLogout}
					className='w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white 
					font-bold rounded-lg shadow-lg hover:from-blue-600 hover:to-indigo-700'
				>
					Logout
				</motion.button>
			</div>
		</motion.div>
	);
};

export default AdminDashboardPage;
