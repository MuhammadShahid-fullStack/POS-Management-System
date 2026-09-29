import { useEffect, useState } from "react";

import {
  PackagePlus,
  Barcode,
  DollarSign,
  Boxes,
  Tags,
  ImagePlus,
  Plus,
  AlertTriangle,
  Package,
} from "lucide-react";

function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    barcode: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [existingProduct, setExistingProduct] = useState(null);
  const [addStock, setAddStock] = useState("");

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

  // Check Barcode
  const handleBarcodeBlur = async () => {
    const barcode = formData.barcode.trim();

    if (!barcode) {
      setExistingProduct(null);
      return;
    }

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/products/barcode/${barcode}`
      );

      const data = await response.json();

      if (response.ok) {
        setExistingProduct(data.product);
      } else {
        setExistingProduct(null);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  // Add Stock to Existing Product
  const handleAddStock = async () => {
    if (!existingProduct) {
      return;
    }

    if (!addStock || Number(addStock) <= 0) {
      alert("Please enter valid stock quantity");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${existingProduct._id}/stock`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            quantity: Number(addStock),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to add stock"
        );
      }

      alert("Stock added successfully");

      setExistingProduct(data.product);
      setAddStock("");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  // Submit New Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("barcode", formData.barcode);
      data.append("price", formData.price);
      data.append("stock", formData.stock);
      data.append("category", formData.category);

      if (formData.image) {
        data.append("image", formData.image);
      }

      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/products`,
        {
          method: "POST",
          body: data,
        }
      );

      const result = await response.json();

      console.log(result);

      // Existing barcode
      if (response.status === 409) {
        setExistingProduct(result.product);
        return;
      }

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to create product"
        );
      }

      alert("Product added successfully");

      setFormData({
        name: "",
        barcode: "",
        price: "",
        stock: "",
        category: "",
        image: null,
      });

      setExistingProduct(null);
      setAddStock("");

      // Reset file input
      document.getElementById("product-image").value = "";
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <main className="p-4 md:p-6">

      {/* Page Header */}
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
            <PackagePlus size={19} />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Add Product
            </h1>

            <p className="mt-0.5 text-sm text-gray-500">
              Add a new product to your inventory
            </p>
          </div>

        </div>
      </div>

      {/* Existing Product */}
      {existingProduct && (
        <div
          className="
            max-w-3xl
            mb-6
            bg-amber-50/80
            backdrop-blur-xl
            border border-amber-200
            rounded-2xl
            p-5
            shadow-[0_4px_20px_rgba(0,0,0,0.03)]
          "
        >

          <div className="flex items-start gap-3">

            <div
              className="
                w-10 h-10
                rounded-xl
                bg-amber-100
                flex items-center justify-center
                shrink-0
              "
            >
              <AlertTriangle
                size={19}
                className="text-amber-600"
              />
            </div>

            <div>
              <h2 className="text-base font-semibold text-gray-900">
                Product Already Exists
              </h2>

              <p className="mt-1 text-sm text-gray-600">
                This barcode already belongs to an existing
                product.
              </p>
            </div>

          </div>

          {/* Existing Product Info */}
          <div
            className="
              mt-4
              bg-white/70
              border border-amber-200
              rounded-xl
              p-4
            "
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

              <div>
                <p className="text-xs text-gray-500">
                  Product Name
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {existingProduct.name}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Barcode
                </p>

                <p className="mt-1 text-sm font-medium text-gray-900">
                  {existingProduct.barcode}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Current Stock
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  {existingProduct.stock}
                </p>
              </div>

              <div>
                <p className="text-xs text-gray-500">
                  Price
                </p>

                <p className="mt-1 text-sm font-semibold text-gray-900">
                  Rs. {existingProduct.price}
                </p>
              </div>

            </div>
          </div>

          {/* Add Stock */}
          <div className="mt-5">

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Add Stock
            </label>

            <div className="flex flex-col sm:flex-row gap-3">

              <div className="relative flex-1">

                <Plus
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
                  min="1"
                  placeholder="Enter quantity"
                  value={addStock}
                  onChange={(e) =>
                    setAddStock(e.target.value)
                  }
                  className="
                    w-full
                    pl-10
                    pr-4
                    py-3
                    bg-white
                    border border-gray-200
                    rounded-xl
                    outline-none
                    text-sm
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>

              <button
                type="button"
                onClick={handleAddStock}
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
                  hover:bg-gray-800
                  transition
                "
              >
                <Plus size={17} />
                Add Stock
              </button>

            </div>

            <p className="mt-2 text-xs text-gray-500">
              New stock will be:{" "}
              <span className="font-semibold text-gray-900">
                {existingProduct.stock +
                  (Number(addStock) || 0)}
              </span>
            </p>

          </div>
        </div>
      )}

      {/* Form */}
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
                placeholder="Enter product name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
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
                placeholder="Enter barcode"
                value={formData.barcode}
                onChange={(e) => {
                  setFormData({
                    ...formData,
                    barcode: e.target.value,
                  });

                  setExistingProduct(null);
                }}
                onBlur={handleBarcodeBlur}
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
                  focus:bg-white
                  focus:border-gray-400
                  focus:ring-2
                  focus:ring-gray-100
                  transition
                "
              />

            </div>

            <p className="mt-1.5 text-xs text-gray-400">
              Enter barcode and click outside to check
            </p>
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
                  placeholder="Enter price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
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
                  placeholder="Enter stock"
                  value={formData.stock}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      stock: e.target.value,
                    })
                  }
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
                    focus:bg-white
                    focus:border-gray-400
                    focus:ring-2
                    focus:ring-gray-100
                    transition
                  "
                />

              </div>
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
                value={formData.category}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category: e.target.value,
                  })
                }
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

          {/* Product Image */}
          <div>

            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Image
            </label>

            <label
              htmlFor="product-image"
              className="
                flex
                items-center
                gap-4
                w-full
                p-4
                bg-gray-50/70
                border border-dashed border-gray-300
                rounded-xl
                cursor-pointer
                hover:bg-gray-100/70
                hover:border-gray-400
                transition
              "
            >

              <div
                className="
                  w-11 h-11
                  rounded-xl
                  bg-white
                  border border-gray-200
                  flex items-center justify-center
                "
              >
                <ImagePlus
                  size={19}
                  className="text-gray-500"
                />
              </div>

              <div>
                <p className="text-sm font-medium text-gray-700">
                  Choose product image
                </p>

                <p className="text-xs text-gray-400 mt-0.5">
                  JPG, PNG or other image formats
                </p>
              </div>

              <input
                id="product-image"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    image: e.target.files[0],
                  })
                }
                className="hidden"
              />

            </label>

            {formData.image && (
              <p className="mt-2 text-xs text-gray-500">
                Selected:{" "}
                <span className="font-medium text-gray-700">
                  {formData.image.name}
                </span>
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="pt-2">

            <button
              type="submit"
              className="
                w-full sm:w-auto
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
              <Plus size={17} />
              Add Product
            </button>

          </div>

        </form>
      </div>
    </main>
  );
}

export default AddProduct;