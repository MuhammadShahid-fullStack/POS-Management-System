import { useEffect, useState } from "react";

import {
  Package,
  Banknote,
  ShoppingBag,
  AlertTriangle,
  Tags,
  ArrowUpRight,
  TrendingUp,
  Boxes,
} from "lucide-react";

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [productsResponse, salesResponse] = await Promise.all([
          fetch(`${import.meta.env.VITE_API_URL}/api/products`),
          fetch(`${import.meta.env.VITE_API_URL}/api/sales`),
        ]);

        const productsData = await productsResponse.json();
        const salesData = await salesResponse.json();

        if (!productsResponse.ok) {
          throw new Error(
            productsData.message || "Failed to fetch products"
          );
        }

        if (!salesResponse.ok) {
          throw new Error(
            salesData.message || "Failed to fetch sales"
          );
        }

        setProducts(productsData.products || []);
        setSales(salesData.sales || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const today = new Date();

  const todaySales = sales.filter((sale) => {
    const saleDate = new Date(sale.createdAt);

    return (
      saleDate.getFullYear() === today.getFullYear() &&
      saleDate.getMonth() === today.getMonth() &&
      saleDate.getDate() === today.getDate()
    );
  });

  const todaySalesAmount = todaySales.reduce(
    (total, sale) => total + sale.totalAmount,
    0
  );

  const lowStockProducts = products.filter(
    (product) => product.stock <= 5
  );

  const categories = [
    ...new Set(products.map((product) => product.category)),
  ];

  const getCategoryProducts = (category) => {
    return products.filter(
      (product) => product.category === category
    );
  };

  // ================= LOADING =================

  if (loading) {
    return (
      <main className="relative min-h-full overflow-hidden bg-[#f7f8fc] p-4 sm:p-5 md:p-6">
        {/* Background Glow */}
        <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-violet-200/50 blur-[100px]" />

        <div className="pointer-events-none absolute right-0 top-1/3 h-80 w-80 rounded-full bg-blue-200/40 blur-[120px]" />

        <div className="relative z-10 animate-pulse space-y-5">
          {/* Header Skeleton */}
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-2xl bg-gray-200" />

            <div className="space-y-2">
              <div className="h-7 w-40 rounded-lg bg-gray-200" />
              <div className="h-4 w-52 rounded-lg bg-gray-100" />
            </div>
          </div>

          {/* Stats Skeleton */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="
                  h-40
                  rounded-3xl
                  border border-gray-200
                  bg-white/70
                "
              />
            ))}
          </div>

          {/* Section Skeleton */}
          <div className="h-64 rounded-3xl border border-gray-200 bg-white/70" />

          <div className="h-72 rounded-3xl border border-gray-200 bg-white/70" />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-full overflow-hidden bg-[#f7f8fc] p-4 sm:p-5 md:p-6">

      {/* =====================================================
          BACKGROUND GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-200/50 blur-[120px]" />

      <div className="pointer-events-none absolute left-1/3 top-20 h-80 w-80 rounded-full bg-fuchsia-100/60 blur-[110px]" />

      <div className="pointer-events-none absolute -right-32 top-1/3 h-96 w-96 rounded-full bg-blue-200/50 blur-[130px]" />

      <div className="pointer-events-none absolute -bottom-32 left-1/4 h-96 w-96 rounded-full bg-indigo-100/50 blur-[120px]" />

      {/* =====================================================
          CONTENT
      ====================================================== */}

      <div className="relative z-10 space-y-6">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <section>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            {/* Title */}
            <div className="flex items-center gap-3">

              <div
                className="
                  group
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl
                  bg-linear-to-br from-violet-500 to-fuchsia-500
                  text-white
                  shadow-[0_10px_35px_rgba(139,92,246,0.25)]
                  transition-all duration-300
                  hover:-translate-y-1
                  hover:scale-105
                  hover:shadow-[0_15px_45px_rgba(217,70,239,0.30)]
                "
              >
                <Boxes
                  size={22}
                  className="transition-transform duration-300 group-hover:rotate-6"
                />
              </div>

             <div>
  <h1
    className="
      bg-linear-to-br
      from-violet-700
      via-purple-600
      to-fuchsia-600
      bg-clip-text
      text-2xl
      font-extrabold
      tracking-tight
      text-transparent
      sm:text-3xl
    "
  >
    Dashboard
  </h1>

  <p className="mt-1 text-sm text-gray-500">
    Overview of your POS system
  </p>
</div>

            </div>

            {/* Business Status */}
            <div
              className="
                flex w-fit items-center gap-2
                rounded-2xl
                border border-white
                bg-white/70
                px-4 py-2.5
                text-sm text-gray-600
                shadow-[0_10px_35px_rgba(15,23,42,0.07)]
                backdrop-blur-xl
              "
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
              </span>

              <TrendingUp
                size={16}
                className="text-violet-500"
              />

              <span>Business Overview</span>
            </div>

          </div>
        </section>

        {/* =====================================================
            STATS
        ====================================================== */}

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">

          {/* TOTAL PRODUCTS */}
          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-white
              bg-white/70
              p-5
              shadow-[0_15px_50px_rgba(15,23,42,0.07)]
              backdrop-blur-2xl
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-white/90
              hover:shadow-[0_20px_60px_rgba(139,92,246,0.14)]
            "
          >
            <div
              className="
                absolute -right-10 -top-10
                h-32 w-32
                rounded-full
                bg-violet-200/50
                blur-3xl
                transition-all duration-500
                group-hover:bg-violet-300/60
              "
            />

            <div className="relative flex items-start justify-between gap-4">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Total Products
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {products.length}
                </h2>
              </div>

              <div
                className="
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl
                  border border-violet-100
                  bg-violet-50
                  text-violet-600
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:bg-violet-600
                  group-hover:text-white
                  group-hover:shadow-[0_10px_30px_rgba(139,92,246,0.25)]
                "
              >
                <Package size={21} />
              </div>

            </div>

            <div className="relative mt-6 flex items-center gap-2 text-xs text-gray-400">
              <ArrowUpRight
                size={14}
                className="text-violet-500"
              />

              <span>Products in inventory</span>
            </div>
          </div>

          {/* TODAY SALES */}
          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-white
              bg-white/70
              p-5
              shadow-[0_15px_50px_rgba(15,23,42,0.07)]
              backdrop-blur-2xl
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-white/90
              hover:shadow-[0_20px_60px_rgba(16,185,129,0.14)]
            "
          >
            <div
              className="
                absolute -right-10 -top-10
                h-32 w-32
                rounded-full
                bg-emerald-100/70
                blur-3xl
                transition-all duration-500
                group-hover:bg-emerald-200/80
              "
            />

            <div className="relative flex items-start justify-between gap-4">

              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-500">
                  Today's Sales
                </p>

                <h2 className="mt-3 truncate text-2xl font-bold text-gray-900 sm:text-3xl">
                  Rs. {todaySalesAmount.toLocaleString()}
                </h2>
              </div>

              <div
                className="
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl
                  border border-emerald-100
                  bg-emerald-50
                  text-emerald-600
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:bg-emerald-500
                  group-hover:text-white
                  group-hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)]
                "
              >
                <Banknote size={21} />
              </div>

            </div>

            <div className="relative mt-6 flex items-center gap-2 text-xs text-gray-400">
              <ArrowUpRight
                size={14}
                className="text-emerald-500"
              />

              <span>Sales generated today</span>
            </div>
          </div>

          {/* TODAY ORDERS */}
          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-white
              bg-white/70
              p-5
              shadow-[0_15px_50px_rgba(15,23,42,0.07)]
              backdrop-blur-2xl
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-white/90
              hover:shadow-[0_20px_60px_rgba(59,130,246,0.14)]
            "
          >
            <div
              className="
                absolute -right-10 -top-10
                h-32 w-32
                rounded-full
                bg-blue-100/70
                blur-3xl
                transition-all duration-500
                group-hover:bg-blue-200/80
              "
            />

            <div className="relative flex items-start justify-between gap-4">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Today's Orders
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {todaySales.length}
                </h2>
              </div>

              <div
                className="
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl
                  border border-blue-100
                  bg-blue-50
                  text-blue-600
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:bg-blue-500
                  group-hover:text-white
                  group-hover:shadow-[0_10px_30px_rgba(59,130,246,0.25)]
                "
              >
                <ShoppingBag size={21} />
              </div>

            </div>

            <div className="relative mt-6 flex items-center gap-2 text-xs text-gray-400">
              <ArrowUpRight
                size={14}
                className="text-blue-500"
              />

              <span>Orders completed today</span>
            </div>
          </div>

          {/* LOW STOCK */}
          <div
            className="
              group relative overflow-hidden
              rounded-3xl
              border border-white
              bg-white/70
              p-5
              shadow-[0_15px_50px_rgba(15,23,42,0.07)]
              backdrop-blur-2xl
              transition-all duration-300
              hover:-translate-y-1
              hover:bg-white/90
              hover:shadow-[0_20px_60px_rgba(244,63,94,0.14)]
            "
          >
            <div
              className="
                absolute -right-10 -top-10
                h-32 w-32
                rounded-full
                bg-rose-100/70
                blur-3xl
                transition-all duration-500
                group-hover:bg-rose-200/80
              "
            />

            <div className="relative flex items-start justify-between gap-4">

              <div>
                <p className="text-sm font-medium text-gray-500">
                  Low Stock
                </p>

                <h2 className="mt-3 text-3xl font-bold text-gray-900">
                  {lowStockProducts.length}
                </h2>
              </div>

              <div
                className="
                  flex h-12 w-12 shrink-0 items-center justify-center
                  rounded-2xl
                  border border-rose-100
                  bg-rose-50
                  text-rose-600
                  transition-all duration-300
                  group-hover:scale-110
                  group-hover:bg-rose-500
                  group-hover:text-white
                  group-hover:shadow-[0_10px_30px_rgba(244,63,94,0.25)]
                "
              >
                <AlertTriangle size={21} />
              </div>

            </div>

            <div className="relative mt-6 flex items-center gap-2 text-xs text-rose-500">
              <AlertTriangle size={14} />

              <span>Products need attention</span>
            </div>
          </div>

        </section>

        {/* =====================================================
            LOW STOCK PRODUCTS
        ====================================================== */}

        <section>

          <div className="mb-4 flex items-center gap-3">

            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-2xl
                border border-rose-100
                bg-rose-50
                text-rose-500
              "
            >
              <AlertTriangle size={18} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Low Stock Products
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                Products with 5 or less stock
              </p>
            </div>

          </div>

          {lowStockProducts.length === 0 ? (
            <div
              className="
                rounded-3xl
                border border-white
                bg-white/70
                p-6
                shadow-[0_15px_50px_rgba(15,23,42,0.06)]
                backdrop-blur-2xl
              "
            >
              <div className="flex items-center gap-3 text-gray-400">
                <Package size={18} />

                <p className="text-sm">
                  No low stock products
                </p>
              </div>
            </div>
          ) : (
            <div
              className="
                rounded-3xl
                border border-white
                bg-white/70
                p-3
                shadow-[0_15px_50px_rgba(15,23,42,0.06)]
                backdrop-blur-2xl
                sm:p-4
              "
            >
              <div className="space-y-2">

                {lowStockProducts.map((product) => (
                  <div
                    key={product._id}
                    className="
                      group
                      flex items-center gap-3
                      rounded-2xl
                      border border-transparent
                      p-3
                      transition-all duration-200
                      hover:border-violet-100
                      hover:bg-violet-50/50
                    "
                  >
                    {/* Product Image */}

                    {product.image ? (
                      <img
                        src={`${import.meta.env.VITE_API_URL}${product.image}`}
                        alt={product.name}
                        className="
                          h-11 w-11 shrink-0
                          rounded-xl
                          border border-gray-100
                          object-cover
                          shadow-sm
                        "
                      />
                    ) : (
                      <div
                        className="
                          flex h-11 w-11 shrink-0
                          items-center justify-center
                          rounded-xl
                          border border-gray-100
                          bg-gray-50
                          text-gray-400
                        "
                      >
                        <Package size={17} />
                      </div>
                    )}

                    {/* Product Info */}

                    <div className="min-w-0 flex-1">

                      <p className="truncate text-sm font-semibold text-gray-900">
                        {product.name}
                      </p>

                      <p className="mt-1 truncate text-xs text-gray-500">
                        {product.category}
                      </p>

                    </div>

                    {/* Stock */}

                    <span
                      className="
                        shrink-0
                        rounded-xl
                        border border-rose-100
                        bg-rose-50
                        px-2.5 py-1.5
                        text-xs font-semibold
                        text-rose-600
                        sm:px-3
                      "
                    >
                      Stock: {product.stock}
                    </span>

                  </div>
                ))}

              </div>
            </div>
          )}

        </section>

        {/* =====================================================
            CATEGORIES
        ====================================================== */}

        <section>

          <div className="mb-4 flex items-center gap-3">

            <div
              className="
                flex h-10 w-10 shrink-0
                items-center justify-center
                rounded-2xl
                border border-violet-100
                bg-violet-50
                text-violet-500
              "
            >
              <Tags size={18} />
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                Categories
              </h2>

              <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                Products grouped by category
              </p>
            </div>

          </div>

          {categories.length === 0 ? (
            <div
              className="
                rounded-3xl
                border border-white
                bg-white/70
                p-6
                shadow-[0_15px_50px_rgba(15,23,42,0.06)]
                backdrop-blur-2xl
              "
            >
              <div className="flex items-center gap-3 text-gray-400">
                <Tags size={18} />

                <p className="text-sm">
                  No categories found
                </p>
              </div>
            </div>
          ) : (
            <div
              className="
                grid
                grid-cols-1
                gap-4
                md:grid-cols-2
                xl:grid-cols-3
              "
            >
              {categories.map((category) => {
                const categoryProducts =
                  getCategoryProducts(category);

                return (
                  <div
                    key={category}
                    className="
                      group
                      relative overflow-hidden
                      rounded-3xl
                      border border-white
                      bg-white/70
                      p-5
                      shadow-[0_15px_50px_rgba(15,23,42,0.06)]
                      backdrop-blur-2xl
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:bg-white/90
                      hover:shadow-[0_20px_60px_rgba(139,92,246,0.12)]
                    "
                  >
                    {/* Card Glow */}

                    <div
                      className="
                        pointer-events-none
                        absolute -right-16 -top-16
                        h-40 w-40
                        rounded-full
                        bg-violet-100
                        blur-3xl
                        opacity-70
                        transition-all duration-500
                        group-hover:bg-violet-200
                      "
                    />

                    {/* Category Header */}

                    <div className="relative mb-5 flex items-center justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-3">

                        <div
                          className="
                            flex h-10 w-10 shrink-0
                            items-center justify-center
                            rounded-2xl
                            border border-violet-100
                            bg-violet-50
                            text-violet-500
                            transition-all duration-300
                            group-hover:bg-violet-600
                            group-hover:text-white
                          "
                        >
                          <Tags size={17} />
                        </div>

                        <div className="min-w-0">

                          <h3 className="truncate text-base font-semibold capitalize text-gray-900">
                            {category}
                          </h3>

                          <p className="mt-0.5 text-xs text-gray-400">
                            Category
                          </p>

                        </div>

                      </div>

                      <span
                        className="
                          shrink-0
                          rounded-xl
                          border border-gray-100
                          bg-gray-50
                          px-2.5 py-1.5
                          text-xs font-semibold
                          text-gray-500
                        "
                      >
                        {categoryProducts.length}
                      </span>

                    </div>

                    {/* Products */}

                    <div className="relative space-y-2">

                      {categoryProducts.map((product) => (
                        <div
                          key={product._id}
                          className="
                            flex items-center gap-3
                            rounded-2xl
                            border border-transparent
                            p-2.5
                            transition-all duration-200
                            hover:border-violet-100
                            hover:bg-violet-50/50
                          "
                        >
                          {/* Product Image */}

                          {product.image ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${product.image}`}
                              alt={product.name}
                              className="
                                h-11 w-11 shrink-0
                                rounded-xl
                                border border-gray-100
                                object-cover
                                shadow-sm
                              "
                            />
                          ) : (
                            <div
                              className="
                                flex h-11 w-11 shrink-0
                                items-center justify-center
                                rounded-xl
                                border border-gray-100
                                bg-gray-50
                                text-gray-400
                              "
                            >
                              <Package size={17} />
                            </div>
                          )}

                          {/* Product Info */}

                          <div className="min-w-0 flex-1">

                            <p className="truncate text-sm font-medium text-gray-900">
                              {product.name}
                            </p>

                            <p
                              className={`mt-0.5 text-xs ${
                                product.stock <= 5
                                  ? "text-rose-500"
                                  : "text-gray-400"
                              }`}
                            >
                              Stock: {product.stock}
                            </p>

                          </div>

                          {/* Price */}

                          <p className="whitespace-nowrap text-sm font-bold text-gray-900">
                            Rs. {product.price}
                          </p>

                        </div>
                      ))}

                    </div>

                  </div>
                );
              })}
            </div>
          )}

        </section>

      </div>
    </main>
  );
}

export default Dashboard;