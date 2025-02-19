import React, { useState } from "react";
import axios from "axios";

export default function AddService() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("description", description);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:5000/admin/services/add",
        formData,
        {
          withCredentials: true, // This is required to send cookies
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      console.log(response.data);
      alert("Service Added Successfully!");
    } catch (error) {
      console.error("Failed to add service", error.response?.data);
      alert("Failed to add service");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-8 lg:p-10 pt-12">
      <h2 className="font-bold text-2xl sm:text-3xl md:text-4xl w-full max-w-4xl py-6 text-center bg-amber-50 rounded-t-3xl">
        Add a service
      </h2>
      <form
        className="flex flex-col items-center w-full max-w-4xl py-6 bg-amber-50 rounded-b-3xl shadow-2xl shadow-gray-300 px-6 sm:px-8 md:px-10 lg:px-12"
        onSubmit={handleSubmit}
      >
        <label className="font-bold text-lg sm:text-xl md:text-2xl mb-2">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 sm:border-4 border-gray-400 h-8 sm:h-10 w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 pl-2 bg-white shadow-lg shadow-gray-200"
        />

        <label className="font-bold text-lg sm:text-xl md:text-2xl mb-2">
          Price
        </label>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-2 sm:border-4 border-gray-400 h-8 sm:h-10 w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 pl-2 bg-white shadow-lg shadow-gray-200"
        />

        <label className="font-bold text-lg sm:text-xl md:text-2xl mb-2">
          Description
        </label>
        <textarea
          placeholder="Write a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 sm:border-4 border-gray-400 h-20 sm:h-24 w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 pl-2 pt-2 bg-white shadow-lg shadow-gray-200"
        />

        <label className="font-bold text-lg sm:text-xl md:text-2xl mb-2">
          Category
        </label>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 sm:border-4 border-gray-400 h-8 sm:h-10 w-full max-w-xs sm:max-w-sm md:max-w-md mb-4 pl-2 bg-white shadow-lg shadow-gray-200"
        />

        <label className="font-bold text-lg sm:text-xl md:text-2xl mb-2">
          Upload image
        </label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border-2 sm:border-4 border-gray-400 mb-4 pl-2 w-full max-w-xs sm:max-w-sm md:max-w-md bg-white shadow-lg shadow-gray-200"
        />

        <div className="flex flex-row justify-center">
          <button
            className="bg-blue-500 text-white font-medium h-8 sm:h-10 w-20 sm:w-24 mt-4 rounded-lg hover:bg-amber-400 hover:font-bold cursor-pointer"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}




// import React, { useState } from "react";
// import axios from "axios";

// export default function AddService() {
//   const [title, setTitle] = useState("");
//   const [price, setPrice] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [image, setImage] = useState(null);

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("title", title);
//     formData.append("price", price);
//     formData.append("description", description);
//     formData.append("category", category);
//     formData.append("image", image);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/admin/services/add",
//         formData,
//         {
//             withCredentials: true, // This is required to send cookies
//             headers: { "Content-Type": "multipart/form-data" },
//         }
//       );

//       console.log(response.data);
//       alert("Service Added Successfully!");
//     } catch (error) {
//       console.error("Failed to add service", error.response?.data);
//       alert("Failed to add service");
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col justify-center items-center">
//       <h2 className="font-bold text-4xl h-[8vh] w-[90vh] py-[5vh] text-center bg-amber-50 rounded-t-4xl">Add a service</h2>
//       <form className="flex flex-col items-center w-[90vh] py-[5vh] bg-amber-50 rounded-b-4xl shadow-2xl shadow-gray-300" onSubmit={handleSubmit}>
//         <label className="font-bold text-xl h-[5vh]">Title</label>
//         <input
//           type="text"
//           placeholder="Enter title"
//           value={title}
//           onChange={(e) => setTitle(e.target.value)}
//           className="border-4 border-gray-400 h-[6vh] w-[50vh] mb-5 pl-2 bg-white shadow-2xl shadow-gray-200"
//         />

//         <label className="font-bold text-xl h-[5vh]">Price</label>
//         <input
//           type="number"
//           placeholder="Enter price"
//           value={price}
//           onChange={(e) => setPrice(e.target.value)}
//           className="border-4 border-gray-400 h-[6vh] w-[30vh] mb-5 pl-2 bg-white shadow-2xl shadow-gray-200"
//         />

//         <label className="font-bold text-xl h-[5vh]">Description</label>
//         <textarea
//           placeholder="Write a description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           className="border-4 border-gray-400 h-[20vh] w-[80vh] mb-5 pl-2 pt-2 bg-white shadow-2xl shadow-gray-200"
//         />

//         <label className="font-bold text-xl h-[5vh]">Category</label>
//         <input
//           type="text"
//           placeholder="Enter category"
//           value={category}
//           onChange={(e) => setCategory(e.target.value)}
//           className="border-4 border-gray-400 h-[6vh] w-[50vh] mb-5 pl-2 bg-white shadow-2xl  shadow-gray-200"
//         />

//         <label className="font-bold text-xl h-[5vh]">Upload image</label>
//         <input
//           type="file"
//           onChange={(e) => setImage(e.target.files[0])}
//           className="border-4 border-gray-400 mb-5 pl-2 w-[30vh] bg-white shadow-2xl  shadow-gray-200"
//         />

//         <div className="flex flex-row justify-center">
//           <button
//             className="bg-blue-500 text-white font-medium h-[5vh] w-[13vh] mt-[2vh] rounded-lg hover:bg-amber-400 hover:font-bold cursor-pointer"
//             type="submit"
//           >
//             Upload
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }
