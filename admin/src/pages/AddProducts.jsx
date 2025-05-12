import React, { useState } from 'react';
import uploadArea from '../assets/upload_area.png';
import { backendUrl } from '../App';

const AddProducts = () => {
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("");
  const [frameColour, setFrameColour] = useState("");
  const [frameDimensions, setFrameDimensions] = useState("");
  const [frameWidth, setFrameWidth] = useState("");
  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([]);

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (images.length < 1) {
      alert("Please upload at least one image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append("frameColour", frameColour);
    formData.append("frameDimensions", frameDimensions);
    formData.append("frameWidth", frameWidth);
    formData.append("sizes", JSON.stringify(sizes));

    images.forEach((img, i) => {
      formData.append(`image${i + 1}`, img);
    });

    try {
      const res = await fetch(`${backendUrl}/api/product/add`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Product added successfully!");
        // Optionally reset form
        setName("");
        setBrand("");
        setPrice("");
        setCategory("Men");
        setSubCategory("");
        setFrameColour("");
        setFrameDimensions("");
        setFrameWidth("");
        setSizes([]);
        setImages([]);
      } else {
        alert("❌ Failed to add product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col gap-4 w-full max-w-3xl p-4">
      <div>
        <p className="mb-2">Product Images</p>
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImages(Array.from(e.target.files).slice(0, 4))}
        />
        <div className="flex gap-2 flex-wrap mt-2">
          {images.length === 0 ? (
            <img
              src={uploadArea}
              alt="Upload Placeholder"
              className="w-32 h-32 object-contain border rounded"
            />
          ) : (
            images.map((img, i) => (
              <img
                key={i}
                src={URL.createObjectURL(img)}
                alt={`preview-${i}`}
                className="w-20 h-20 object-cover rounded"
              />
            ))
          )}
        </div>
      </div>

      <div>
        <p className="mb-1">Product Name</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border"
          required
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px]">
          <p className="mb-1">Brand</p>
          <input
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <p className="mb-1">Price</p>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px]">
          <p className="mb-1">Category</p>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>

        <div className="flex-1 min-w-[150px]">
          <p className="mb-1">Sub Category</p>
          <input
            type="text"
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-1">Frame Colour</p>
        <input
          type="text"
          value={frameColour}
          onChange={(e) => setFrameColour(e.target.value)}
          className="w-full px-3 py-2 border"
          required
        />
      </div>

      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[150px]">
          <p className="mb-1">Frame Dimensions</p>
          <input
            type="text"
            value={frameDimensions}
            onChange={(e) => setFrameDimensions(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />
        </div>

        <div className="flex-1 min-w-[150px]">
          <p className="mb-1">Frame Width</p>
          <input
            type="text"
            value={frameWidth}
            onChange={(e) => setFrameWidth(e.target.value)}
            className="w-full px-3 py-2 border"
            required
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Available Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["small", "medium", "large"].map((sz) => (
            <div
              key={sz}
              onClick={() => toggleSize(sz)}
              className={`px-4 py-2 rounded cursor-pointer border ${
                sizes.includes(sz) ? "bg-blue-950 text-white" : "bg-gray-200"
              }`}
            >
              {sz}
            </div>
          ))}
        </div>
      </div>

      <button type="submit" className="mt-4 w-32 py-2 bg-blue-950 text-white rounded">
        Submit
      </button>
    </form>
  );
};

export default AddProducts;
