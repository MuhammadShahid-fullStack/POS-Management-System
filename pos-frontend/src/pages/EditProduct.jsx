import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  Package,
  Barcode,
  DollarSign,
  Boxes,
  Tags,
  Save,
  X,
  LoaderCircle,
} from "lucide-react";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    price: "",
    stock: "",
    category: "",
  });

  // Get Product
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`
        );

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to get product"
          );
        }

        setProduct(data.product);

        setFormData({
          name: data.product.name,
          barcode: data.product.barcode,
          price: data.product.price,
          stock: data.product.stock,
          category: data.product.category,
        });
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProduct();
  }, [id]);

  // Get Categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
         `${import.meta.env.VITE_API_URL}/api/categories`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch categories"
          );
        }

        setCategories(data.categories || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Input Change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Update Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...formData,
            price: Number(formData.price),
            stock: Number(formData.stock),
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product"
        );
      }

      alert("Product updated successfully");

      navigate("/products");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  // Loading
  if (!product) {
    return (
      <main className="p-4 md:p-6">
        <div className="max-w-3xl bg-white/80 border border-gray-200 rounded-2xl p-8 shadow-sm">
          <div className="flex items-center justify-center gap-2 text-gray-500">
            <LoaderCircle
              size={18}
              className="animate-spin"
            />
            <span className="text-sm">
              Loading product...
            </span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3">

          <div
            className="
              w-10 h-10
              rounded-xl
              bg-gray-900
              text-white
              flex items-center justify-center
              shadow-sm
            "
          >
            <Package size={19} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Edit Product
            </h1>

            <p className="mt-0.5 text-sm text-gray-500">
              Update product information
            </p>
          </div>

        </div>
      </div>

      {/* Form Card */}
      <div
        className="
          max-w-3xl
          bg-white/80
          backdrop-blur-xl
          border border-gray-200
          rounded-2xl
          p-5 md:p-7
          shadow-[0_4px_20px_rgba(0,0,0,0.03)]
        "
      >

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name
            </label>

            <div className="relative">

              <Package
                size={17}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter product name"
                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  bg-gray-50/70
                  border border-gray-200
                  rounded-xl
                  outline-none
                  text-sm
                  text-gray-900
                  focus:bg-white
                  focus:border-gray-400
                  focus:ring-2
                  focus:ring-gray-100
                  transition
                "
              />

            </div>
          </div>

          {/* Barcode */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Barcode
            </label>

            <div className="relative">

              <Barcode
                size={17}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                "
              />

              <input
                type="text"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                placeholder="Enter barcode"
                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  bg-gray-50/70
                  border border-gray-200
                  rounded-xl
                  outline-none
                  text-sm
                  text-gray-900
                  focus:bg-white
                  focus:border-gray-400
                  focus:ring-2
                  focus:ring-gray-100
                  transition
                "
              />

            </div>
          </div>

          {/* Price + Stock */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price
              </label>

              <div className="relative">

                <DollarSign
                  size={17}
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  className="
                    w-full
                    pl-10
                    pr-4
                    py-3
                    bg-gray-50/70
                    border border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    text-gray-900
                    focus:bg-white
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>
            </div>

            {/* Stock */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Stock
              </label>

              <div className="relative">

                <Boxes
                  size={17}
                  className="
                    absolute
                    left-3.5
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                  "
                />

                <input
                  type="number"
                  name="stock"
                  value={formData.stock}
                  onChange={handleChange}
                  placeholder="Enter stock"
                  className="
                    w-full
                    pl-10
                    pr-4
                    py-3
                    bg-gray-50/70
                    border border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    text-gray-900
                    focus:bg-white
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>

              {Number(formData.stock) <= 5 && (
                <p className="mt-2 text-xs text-red-500">
                  Low stock: 5 or less
                </p>
              )}
            </div>

          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>

            <div className="relative">

              <Tags
                size={17}
                className="
                  absolute
                  left-3.5
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  pointer-events-none
                "
              />

              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                disabled={loadingCategories}
                className="
                  w-full
                  pl-10
                  pr-4
                  py-3
                  bg-gray-50/70
                  border border-gray-200
                  rounded-xl
                  outline-none
                  text-sm
                  text-gray-700
                  focus:bg-white
                  focus:border-gray-400
                  focus:ring-2
                  focus:ring-gray-100
                  transition
                  disabled:bg-gray-100
                "
              >
                <option value="">
                  {loadingCategories
                    ? "Loading categories..."
                    : "Select category"}
                </option>

                {categories.map((category) => (
                  <option
                    key={category._id}
                    value={category.name}
                  >
                    {category.name}
                  </option>
                ))}
              </select>

            </div>
          </div>

          {/* Product Info */}
          <div
            className="
              p-4
              rounded-xl
              bg-gray-50/70
              border border-gray-200
            "
          >
            <p className="text-xs text-gray-400 mb-1">
              Product ID
            </p>

            <p className="text-xs font-medium text-gray-600 break-all">
              {product._id}
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">

            <button
              type="submit"
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-xl
                bg-gray-900
                text-white
                text-sm
                font-medium
                shadow-sm
                hover:bg-gray-800
                transition
              "
            >
              <Save size={17} />
              Update Product
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="
                inline-flex
                items-center
                justify-center
                gap-2
                px-5
                py-3
                rounded-xl
                border border-gray-200
                bg-white
                text-gray-700
                text-sm
                font-medium
                hover:bg-gray-50
                transition
              "
            >
              <X size={17} />
              Cancel
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}

export default EditProduct;