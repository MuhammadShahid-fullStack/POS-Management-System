import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import {
  Package,
  Plus,
  Search,
  Pencil,
  Trash2,
  Barcode,
  Tags,
  AlertTriangle,
} from "lucide-react";

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/products`
        );

        const data = await response.json();

        console.log(data);

        setProducts(data.products);
      } catch (error) {
        console.error(error.message);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete product");
      }

      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== id)
      );

      alert("Product deleted successfully");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-7">

        {/* Title */}
        <div className="flex items-center gap-3">

          <div
            className="
              w-11 h-11
              rounded-2xl
              bg-gray-900
              text-white
              flex items-center justify-center
              shadow-[0_8px_25px_rgba(0,0,0,0.15)]
              transition-all duration-300
              hover:scale-105
              hover:shadow-[0_12px_30px_rgba(0,0,0,0.20)]
            "
          >
            <Package size={20} />
          </div>

          <div>
            <h1 className="   bg-linear-to-r
      from-violet-700
      via-purple-600
      to-fuchsia-600
      bg-clip-text
      text-2xl
      font-extrabold
      tracking-tight
      text-transparent
      sm:text-3xl">
              Products
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Manage your products and stock
            </p>
          </div>
        </div>

        {/* Add Product */}
        <Link
          to="/products/add"
          className="
            w-full sm:w-auto
            inline-flex items-center justify-center gap-2
            px-5 py-3
            rounded-xl
            bg-gray-900
            text-white
            text-sm
            font-semibold
            shadow-[0_8px_20px_rgba(0,0,0,0.12)]
            hover:bg-gray-800
            hover:-translate-y-0.5
            hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)]
            active:translate-y-0
            transition-all duration-300
          "
        >
          <Plus
            size={18}
            className="transition-transform duration-300 group-hover:rotate-90"
          />

          Add Product
        </Link>
      </div>

      {/* Search + Product Count */}
      <div
        className="
          flex flex-col md:flex-row
          md:items-center
          md:justify-between
          gap-4
          mb-6
        "
      >

        {/* Search */}
        <div className="relative w-full md:max-w-md">

          <Search
            size={18}
            className="
              absolute
              left-4
              top-1/2
              -translate-y-1/2
              text-gray-400
              transition-colors duration-300
              peer-focus:text-gray-700
            "
          />

          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              peer
              w-full
              pl-11
              pr-4
              py-3.5
              bg-white/70
              backdrop-blur-xl
              border border-white/80
              rounded-2xl
              outline-none
              text-sm
              text-gray-900
              placeholder:text-gray-400

              shadow-[0_8px_25px_rgba(0,0,0,0.05)]

              focus:bg-white/90
              focus:border-gray-300
              focus:ring-4
              focus:ring-gray-100
              focus:shadow-[0_10px_30px_rgba(0,0,0,0.08)]

              hover:border-gray-300

              transition-all duration-300
            "
          />
        </div>

        {/* Product Count */}
        <div
          className="
            self-start md:self-auto
            inline-flex items-center gap-2
            px-4 py-2.5
            rounded-xl
            bg-white/60
            backdrop-blur-xl
            border border-white/80
            shadow-[0_6px_20px_rgba(0,0,0,0.04)]
            text-sm text-gray-500
          "
        >
          <Package size={16} className="text-gray-400" />

          <span>
            {filteredProducts.length}{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
          </span>
        </div>
      </div>

      {/* Product Table */}
      <div
        className="
          bg-white/70
          backdrop-blur-2xl
          border border-white/80
          rounded-2xl
          overflow-hidden

          shadow-[0_10px_40px_rgba(0,0,0,0.07)]

          hover:shadow-[0_15px_45px_rgba(0,0,0,0.09)]

          transition-shadow duration-300
        "
      >
        <div className="overflow-x-auto">

          <table className="w-full text-sm">

            {/* Table Header */}
            <thead>
              <tr
                className="
                  border-b border-gray-200/80
                  bg-gray-50/60
                  backdrop-blur-xl
                "
              >
                <th className="px-5 py-4 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Product
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Barcode
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Price
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Stock
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Category
                </th>

                <th className="px-5 py-4 text-left font-semibold text-gray-600 whitespace-nowrap">
                  Action
                </th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="
                    border-b border-gray-100/80
                    last:border-b-0

                    hover:bg-white/80
                    hover:shadow-[inset_4px_0_0_rgba(17,24,39,0.8)]

                    transition-all duration-300
                    group
                  "
                >

                  {/* Product */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      {/* Product Image */}
                      {product.image ? (
                        <div
                          className="
                            w-11 h-11
                            rounded-xl
                            overflow-hidden
                            border border-gray-200
                            bg-white
                            shadow-sm
                            transition-all duration-300

                            group-hover:scale-105
                            group-hover:shadow-md
                          "
                        >
                          <img
                            src={`${import.meta.env.VITE_API_URL}${product.image}`}
                            alt={product.name}
                            className="
                              w-full h-full
                              object-cover
                              transition-transform duration-500
                              group-hover:scale-110
                            "
                          />
                        </div>
                      ) : (
                        <div
                          className="
                            w-11 h-11
                            rounded-xl
                            bg-gray-100/80
                            border border-gray-200
                            flex items-center justify-center
                            shadow-sm
                            transition-all duration-300
                            group-hover:scale-105
                            group-hover:bg-gray-200/80
                          "
                        >
                          <Package
                            size={17}
                            className="text-gray-400"
                          />
                        </div>
                      )}

                      <div>
                        <p
                          className="
                            font-semibold
                            text-gray-900
                            group-hover:text-gray-950
                            transition-colors
                          "
                        >
                          {product.name}
                        </p>

                        <p className="text-xs text-gray-400 mt-0.5">
                          Product
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Barcode */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-gray-600">

                      <div
                        className="
                          w-7 h-7
                          rounded-lg
                          bg-gray-100
                          flex items-center justify-center
                          transition-all duration-300
                          group-hover:bg-gray-200
                        "
                      >
                        <Barcode
                          size={15}
                          className="text-gray-400"
                        />
                      </div>

                      <span className="whitespace-nowrap">
                        {product.barcode}
                      </span>
                    </div>
                  </td>

                  {/* Price */}
                  <td className="px-5 py-4">

                    <span
                      className="
                        font-bold
                        text-gray-900
                        whitespace-nowrap
                      "
                    >
                      Rs. {product.price}
                    </span>
                  </td>

                  {/* Stock */}
                  <td className="px-5 py-4">

                    {product.stock <= 5 ? (
                      <span
                        className="
                          inline-flex items-center gap-1.5
                          px-3 py-1.5
                          rounded-xl

                          bg-red-50/80
                          border border-red-100
                          text-red-600

                          text-xs
                          font-semibold

                          shadow-[0_4px_12px_rgba(239,68,68,0.08)]

                          transition-all duration-300
                          hover:shadow-[0_6px_18px_rgba(239,68,68,0.14)]
                          hover:-translate-y-0.5
                        "
                      >
                        <AlertTriangle size={13} />

                        Low Stock ({product.stock})
                      </span>
                    ) : (
                      <span
                        className="
                          inline-flex items-center
                          px-3 py-1.5
                          rounded-xl

                          bg-gray-100/80
                          border border-gray-200/70
                          text-gray-600

                          text-xs
                          font-medium

                          transition-all duration-300
                          hover:bg-gray-200/80
                          hover:-translate-y-0.5
                        "
                      >
                        {product.stock} in stock
                      </span>
                    )}
                  </td>

                  {/* Category */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2 text-gray-600">

                      <div
                        className="
                          w-7 h-7
                          rounded-lg
                          bg-gray-100
                          flex items-center justify-center
                          transition-all duration-300
                          group-hover:bg-gray-200
                        "
                      >
                        <Tags
                          size={14}
                          className="text-gray-400"
                        />
                      </div>

                      <span className="capitalize whitespace-nowrap">
                        {product.category}
                      </span>
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-5 py-4">

                    <div className="flex items-center gap-2">

                      {/* Edit */}
                      <Link
                        to={`/products/edit/${product._id}`}
                        className="
                          inline-flex items-center gap-1.5

                          px-3 py-2
                          rounded-xl

                          bg-gray-100/80
                          border border-gray-200/70
                          text-gray-700

                          text-xs
                          font-semibold

                          shadow-sm

                          hover:bg-gray-900
                          hover:text-white
                          hover:border-gray-900

                          hover:-translate-y-0.5
                          hover:shadow-[0_6px_16px_rgba(0,0,0,0.15)]

                          active:translate-y-0

                          transition-all duration-300
                        "
                      >
                        <Pencil size={14} />

                        Edit
                      </Link>

                      {/* Delete */}
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="
                          inline-flex items-center gap-1.5

                          px-3 py-2
                          rounded-xl

                          bg-red-50/80
                          border border-red-100
                          text-red-600

                          text-xs
                          font-semibold

                          shadow-sm

                          hover:bg-red-600
                          hover:text-white
                          hover:border-red-600

                          hover:-translate-y-0.5
                          hover:shadow-[0_6px_16px_rgba(239,68,68,0.20)]

                          active:translate-y-0

                          transition-all duration-300
                        "
                      >
                        <Trash2 size={14} />

                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* No Products */}
        {filteredProducts.length === 0 && (
          <div className="p-12 text-center">

            <div
              className="
                mx-auto
                w-14 h-14
                rounded-2xl

                bg-white/80
                border border-gray-200

                flex items-center justify-center

                shadow-[0_8px_25px_rgba(0,0,0,0.06)]

                transition-all duration-300
                hover:scale-105
              "
            >
              <Package
                size={22}
                className="text-gray-400"
              />
            </div>

            <p className="mt-4 text-sm font-semibold text-gray-900">
              No products found
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Try a different search term.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}

export default Products;