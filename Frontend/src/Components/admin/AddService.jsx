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
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h2 className="font-bold text-4xl h-[8vh] text-center">Add a service</h2>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label className="font-bold text-xl h-[5vh]">Title</label>
        <input
          type="text"
          placeholder="Enter title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border-2 border-gray-400 h-[6vh] w-[50vh] mb-5 pl-2"
        />

        <label className="font-bold text-xl h-[5vh]">Price</label>
        <input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border-2 border-gray-400 h-[6vh] w-[30vh] mb-5 pl-2"
        />

        <label className="font-bold text-xl h-[5vh]">Description</label>
        <textarea
          placeholder="Write a description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border-2 border-gray-400 h-[20vh] w-[80vh] mb-5 pl-2 pt-2"
        />

        <label className="font-bold text-xl h-[5vh]">Category</label>
        <input
          type="text"
          placeholder="Enter category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border-2 border-gray-400 h-[6vh] w-[50vh] mb-5 pl-2"
        />

        <label className="font-bold text-xl h-[5vh]">Upload image</label>
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="border-2 border-gray-400 mb-5 pl-2 w-[30vh]"
        />

        <div className="flex flex-row justify-center">
          <button
            className="bg-blue-500 text-white font-medium h-[5vh] w-[13vh] rounded-lg hover:bg-blue-600 hover:font-bold cursor-pointer"
            type="submit"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
}
