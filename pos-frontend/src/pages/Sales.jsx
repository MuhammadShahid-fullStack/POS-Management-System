import { useEffect, useState } from "react";

import {
  ReceiptText,
  CalendarDays,
  CreditCard,
  Banknote,
  Eye,
  Trash2,
  X,
  Package,
  Hash,
  ShoppingBag,
  LoaderCircle,
} from "lucide-react";

function Sales() {
  const [sales, setSales] = useState([]);
  const [selectedSale, setSelectedSale] = useState(null);
  const [loading, setLoading] = useState(true);

  // Delete Sale
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this sale?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sales/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete sale");
      }

      setSales((prevSales) =>
        prevSales.filter((sale) => sale._id !== id)
      );

      setSelectedSale(null);

      alert("Sale deleted successfully");
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  // Get Sales
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/sales`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch sales"
          );
        }

        setSales(data.sales || []);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSales();
  }, []);

  return (
    <main className="relative min-h-full overflow-hidden bg-[#f7f8fc] p-4 sm:p-5 md:p-6">
      {/* ================= BACKGROUND BLOBS ================= */}

      <div
        className="
          pointer-events-none absolute
          -left-24 -top-24
          h-72 w-72
          rounded-full
          bg-violet-300/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          -right-24 top-1/3
          h-80 w-80
          rounded-full
          bg-fuchsia-300/15
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          bottom-0 left-1/3
          h-72 w-72
          rounded-full
          bg-blue-300/10
          blur-3xl
        "
      />

      <div className="relative z-10">
        {/* ================= HEADER ================= */}

        <div
          className="
            mb-6
            flex flex-col gap-4
            sm:mb-7
            sm:flex-row sm:items-center sm:justify-between
          "
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            {/* Header Icon */}
            <div
              className="
                flex h-11 w-11 shrink-0
                items-center justify-center
                rounded-2xl
                bg-linear-to-br from-violet-600 to-fuchsia-600
                text-white
                shadow-[0_12px_30px_rgba(139,92,246,0.25)]
                transition-all duration-300
                hover:-translate-y-1
                hover:scale-105
                hover:shadow-[0_18px_40px_rgba(217,70,239,0.30)]
                sm:h-12 sm:w-12
              "
            >
              <ReceiptText size={22} />
            </div>

            <div className="min-w-0">
              <h1 className=" bg-linear-to-br
      from-violet-700
      via-purple-600
      to-fuchsia-600
      bg-clip-text
      text-2xl
      font-extrabold
      tracking-tight
      text-transparent
      sm:text-3xl">
                Sales
              </h1>

              <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                View and manage all sales
              </p>
            </div>
          </div>

          {/* Sales Count */}
          <div
            className="
              inline-flex w-fit
              items-center gap-2
              rounded-xl
              border border-violet-100
              bg-white/70
              px-4 py-2.5
              text-sm font-medium
              text-slate-700
              shadow-[0_8px_25px_rgba(15,23,42,0.06)]
              backdrop-blur-xl
              transition-all duration-300
              hover:-translate-y-0.5
              hover:border-violet-200
              hover:bg-white
              hover:shadow-[0_12px_30px_rgba(139,92,246,0.10)]
            "
          >
            <ShoppingBag
              size={16}
              className="text-violet-600"
            />

            <span>
              {sales.length}{" "}
              {sales.length === 1 ? "Sale" : "Sales"}
            </span>
          </div>
        </div>

        {/* ================= LOADING ================= */}

        {loading ? (
          <div
            className="
              rounded-3xl
              border border-white/80
              bg-white/65
              p-10
              shadow-[0_20px_60px_rgba(15,23,42,0.08)]
              backdrop-blur-2xl
              sm:p-12
            "
          >
            <div className="flex items-center justify-center gap-3 text-slate-500">
              <LoaderCircle
                size={20}
                className="animate-spin text-violet-600"
              />

              <span className="text-sm">
                Loading sales...
              </span>
            </div>
          </div>
        ) : (
          <>
            {/* ================= SALE DETAILS ================= */}

            {selectedSale && (
              <div
                className="
                  mb-6
                  overflow-hidden
                  rounded-3xl
                  border border-white/80
                  bg-white/65
                  p-4
                  shadow-[0_25px_70px_rgba(15,23,42,0.10)]
                  backdrop-blur-2xl
                  sm:p-5
                  md:mb-7
                  md:p-7
                "
              >
                {/* Details Header */}

                <div className="mb-5 flex items-center justify-between gap-3 sm:mb-6">
                  <div className="flex min-w-0 items-center gap-3">
                    <div
                      className="
                        flex h-10 w-10 shrink-0
                        items-center justify-center
                        rounded-xl
                        border border-violet-100
                        bg-violet-50
                        text-violet-600
                        shadow-sm
                      "
                    >
                      <ReceiptText size={18} />
                    </div>

                    <div className="min-w-0">
                      <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                        Sale Details
                      </h2>

                      <p className="mt-0.5 text-xs text-slate-500">
                        Complete sale information
                      </p>
                    </div>
                  </div>

                  {/* Close */}

                  <button
                    type="button"
                    onClick={() => setSelectedSale(null)}
                    className="
                      inline-flex shrink-0
                      items-center gap-1.5
                      rounded-xl
                      border border-slate-200
                      bg-white/80
                      px-2.5 py-2
                      text-xs font-medium
                      text-slate-600
                      shadow-sm
                      backdrop-blur-xl
                      transition-all duration-200
                      hover:-translate-y-0.5
                      hover:border-violet-200
                      hover:bg-violet-50
                      hover:text-violet-600
                      hover:shadow-md
                      active:scale-95
                      sm:px-3
                    "
                  >
                    <X size={14} />
                    Close
                  </button>
                </div>

                {/* Sale Information */}

                <div
                  className="
                    mb-6
                    grid grid-cols-1 gap-3
                    sm:grid-cols-2
                    lg:grid-cols-4
                    md:mb-7 md:gap-4
                  "
                >
                  {/* Receipt Number */}

                  <div
                    className="
                      rounded-2xl
                      border border-white/80
                      bg-white/60
                      p-4
                      shadow-[0_8px_25px_rgba(15,23,42,0.06)]
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-violet-100
                      hover:bg-white/80
                      hover:shadow-[0_15px_35px_rgba(139,92,246,0.10)]
                    "
                  >
                    <div className="flex items-center gap-2">
                      <Hash
                        size={15}
                        className="text-violet-600"
                      />

                      <p className="text-xs text-slate-500">
                        Receipt Number
                      </p>
                    </div>

                    <p className="mt-2 break-all text-sm font-semibold text-slate-900">
                      {selectedSale.receiptNumber || "N/A"}
                    </p>
                  </div>

                  {/* Date */}

                  <div
                    className="
                      rounded-2xl
                      border border-white/80
                      bg-white/60
                      p-4
                      shadow-[0_8px_25px_rgba(15,23,42,0.06)]
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-violet-100
                      hover:bg-white/80
                      hover:shadow-[0_15px_35px_rgba(139,92,246,0.10)]
                    "
                  >
                    <div className="flex items-center gap-2">
                      <CalendarDays
                        size={15}
                        className="text-violet-600"
                      />

                      <p className="text-xs text-slate-500">
                        Date
                      </p>
                    </div>

                    <p className="mt-2 wrap-break-word text-sm font-semibold text-slate-900">
                      {new Date(
                        selectedSale.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>

                  {/* Payment */}

                  <div
                    className="
                      rounded-2xl
                      border border-white/80
                      bg-white/60
                      p-4
                      shadow-[0_8px_25px_rgba(15,23,42,0.06)]
                      backdrop-blur-xl
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:border-violet-100
                      hover:bg-white/80
                      hover:shadow-[0_15px_35px_rgba(139,92,246,0.10)]
                    "
                  >
                    <div className="flex items-center gap-2">
                      {selectedSale.paymentMethod === "cash" ? (
                        <Banknote
                          size={15}
                          className="text-violet-600"
                        />
                      ) : (
                        <CreditCard
                          size={15}
                          className="text-violet-600"
                        />
                      )}

                      <p className="text-xs text-slate-500">
                        Payment
                      </p>
                    </div>

                    <p className="mt-2 text-sm font-semibold capitalize text-slate-900">
                      {selectedSale.paymentMethod}
                    </p>
                  </div>

                  {/* Total */}

                  <div
                    className="
                      rounded-2xl
                      bg-linear-to-br
                      from-violet-600
                      to-fuchsia-600
                      p-4
                      text-white
                      shadow-[0_15px_35px_rgba(139,92,246,0.25)]
                      transition-all duration-300
                      hover:-translate-y-1
                      hover:shadow-[0_20px_45px_rgba(217,70,239,0.30)]
                    "
                  >
                    <div className="flex items-center gap-2">
                      <ShoppingBag size={15} />

                      <p className="text-xs text-white/75">
                        Total Amount
                      </p>
                    </div>

                    <p className="mt-2 text-lg font-bold">
                      Rs. {selectedSale.totalAmount}
                    </p>
                  </div>
                </div>

                {/* Products */}

                <div>
                  <div className="mb-4 flex items-center gap-2">
                    <Package
                      size={18}
                      className="text-violet-600"
                    />

                    <h3 className="font-semibold text-slate-900">
                      Products
                    </h3>
                  </div>

                  <div
                    className="
                      overflow-hidden
                      rounded-2xl
                      border border-white/80
                      bg-white/50
                      shadow-sm
                      backdrop-blur-xl
                    "
                  >
                    {selectedSale.items.map((item, index) => (
                      <div
                        key={item.product?._id || index}
                        className="
                          flex items-center justify-between
                          gap-3
                          border-b border-slate-100
                          p-3.5
                          last:border-b-0
                          transition-all duration-200
                          hover:bg-violet-50/50
                          sm:gap-4 sm:p-4
                        "
                      >
                        {/* Product Info */}

                        <div className="flex min-w-0 items-center gap-3">
                          {item.product?.image ? (
                            <img
                              src={`${import.meta.env.VITE_API_URL}${item.product.image}`}
                              alt={item.product.name}
                              className="
                                h-11 w-11 shrink-0
                                rounded-xl
                                border border-white
                                object-cover
                                shadow-md
                                transition-transform duration-300
                                hover:scale-110
                                sm:h-12 sm:w-12
                              "
                            />
                          ) : (
                            <div
                              className="
                                flex h-11 w-11 shrink-0
                                items-center justify-center
                                rounded-xl
                                border border-violet-100
                                bg-violet-50
                                text-violet-600
                                sm:h-12 sm:w-12
                              "
                            >
                              <Package size={18} />
                            </div>
                          )}

                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-900">
                              {item.product
                                ? item.product.name
                                : "Product deleted"}
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                              Rs. {item.price} ×{" "}
                              {item.quantity}
                            </p>
                          </div>
                        </div>

                        {/* Item Total */}

                        <p className="shrink-0 text-xs font-bold text-violet-600 sm:text-sm">
                          Rs. {item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Total */}

                <div
                  className="
                    mt-5
                    flex items-center justify-between
                    gap-3
                    border-t border-slate-200
                    pt-4
                    sm:mt-6 sm:pt-5
                  "
                >
                  <span className="text-sm font-medium text-slate-500">
                    Total
                  </span>

                  <span className="text-xl font-bold text-violet-600 sm:text-2xl">
                    Rs. {selectedSale.totalAmount}
                  </span>
                </div>
              </div>
            )}

            {/* ================= SALES CONTAINER ================= */}

            <div
              className="
                overflow-hidden
                rounded-3xl
                border border-white/80
                bg-white/60
                shadow-[0_25px_70px_rgba(15,23,42,0.09)]
                backdrop-blur-2xl
              "
            >
              {/* ================= EMPTY STATE ================= */}

              {sales.length === 0 ? (
                <div className="p-10 text-center sm:p-12">
                  <div
                    className="
                      mx-auto flex h-14 w-14
                      items-center justify-center
                      rounded-2xl
                      border border-violet-100
                      bg-violet-50
                      text-violet-600
                      shadow-sm
                    "
                  >
                    <ReceiptText size={22} />
                  </div>

                  <p className="mt-4 text-sm font-semibold text-slate-900">
                    No sales found
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Completed sales will appear here.
                  </p>
                </div>
              ) : (
                <>
                  {/* =====================================================
                      DESKTOP TABLE
                  ====================================================== */}

                  <div className="hidden overflow-x-auto md:block">
                    <table className="w-full min-w-212.5 text-sm">
                      {/* Header */}

                      <thead>
                        <tr className="border-b border-slate-200 bg-slate-50/80">
                          <th className="px-5 py-4 text-left font-semibold text-slate-700">
                            Date
                          </th>

                          <th className="px-5 py-4 text-left font-semibold text-slate-700">
                            Items
                          </th>

                          <th className="px-5 py-4 text-left font-semibold text-slate-700">
                            Payment
                          </th>

                          <th className="px-5 py-4 text-left font-semibold text-slate-700">
                            Total
                          </th>

                          <th className="px-5 py-4 text-left font-semibold text-slate-700">
                            Action
                          </th>
                        </tr>
                      </thead>

                      {/* Body */}

                      <tbody>
                        {sales.map((sale) => (
                          <tr
                            key={sale._id}
                            className="
                              border-b border-slate-100
                              last:border-b-0
                              transition-all duration-300
                              hover:bg-violet-50/40
                              hover:shadow-[inset_3px_0_0_#7C3AED]
                            "
                          >
                            {/* Date */}

                            <td className="px-5 py-4 align-top">
                              <div className="flex items-center gap-2">
                                <CalendarDays
                                  size={15}
                                  className="shrink-0 text-violet-600"
                                />

                                <div>
                                  <p className="text-sm text-slate-700">
                                    {new Date(
                                      sale.createdAt
                                    ).toLocaleDateString()}
                                  </p>

                                  <p className="mt-0.5 text-xs text-slate-400">
                                    {new Date(
                                      sale.createdAt
                                    ).toLocaleTimeString()}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Items */}

                            <td className="px-5 py-4 align-top">
                              <div className="space-y-2">
                                {sale.items.map((item, index) => (
                                  <div
                                    key={
                                      item.product?._id || index
                                    }
                                    className="flex items-center gap-2.5"
                                  >
                                    {item.product?.image ? (
                                      <img
                                        src={`${import.meta.env.VITE_API_URL}${item.product.image}`}
                                        alt={item.product.name}
                                        className="
                                          h-9 w-9
                                          rounded-lg
                                          border border-white
                                          object-cover
                                          shadow-sm
                                          transition-transform duration-200
                                          hover:scale-110
                                        "
                                      />
                                    ) : (
                                      <div
                                        className="
                                          flex h-9 w-9
                                          items-center justify-center
                                          rounded-lg
                                          border border-violet-100
                                          bg-violet-50
                                          text-violet-600
                                        "
                                      >
                                        <Package size={13} />
                                      </div>
                                    )}

                                    <div>
                                      <p className="text-sm font-medium text-slate-700">
                                        {item.product
                                          ? item.product.name
                                          : "Product deleted"}
                                      </p>

                                      <p className="text-xs text-slate-400">
                                        Qty: {item.quantity}
                                      </p>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </td>

                            {/* Payment */}

                            <td className="px-5 py-4 align-top">
                              <span
                                className={`
                                  inline-flex items-center gap-1.5
                                  rounded-xl
                                  border
                                  px-3 py-1.5
                                  text-xs font-semibold capitalize
                                  shadow-sm
                                  backdrop-blur-xl
                                  ${
                                    sale.paymentMethod === "cash"
                                      ? "border-violet-100 bg-violet-50 text-violet-700"
                                      : "border-slate-200 bg-slate-50 text-slate-600"
                                  }
                                `}
                              >
                                {sale.paymentMethod === "cash" ? (
                                  <Banknote size={13} />
                                ) : (
                                  <CreditCard size={13} />
                                )}

                                {sale.paymentMethod}
                              </span>
                            </td>

                            {/* Total */}

                            <td className="px-5 py-4 align-top">
                              <span className="font-bold text-violet-600">
                                Rs. {sale.totalAmount}
                              </span>
                            </td>

                            {/* Actions */}

                            <td className="px-5 py-4 align-top">
                              <div className="flex items-center gap-2">
                                {/* View */}

                                <button
                                  type="button"
                                  onClick={() => {
                                    setSelectedSale(sale);
                                  }}
                                  className="
                                    inline-flex items-center gap-1.5
                                    rounded-xl
                                    border border-violet-100
                                    bg-violet-50
                                    px-3 py-2
                                    text-xs font-semibold
                                    text-violet-700
                                    shadow-sm
                                    backdrop-blur-xl
                                    transition-all duration-200
                                    hover:-translate-y-0.5
                                    hover:border-violet-200
                                    hover:bg-violet-100
                                    hover:shadow-[0_8px_20px_rgba(139,92,246,0.14)]
                                    active:scale-95
                                  "
                                >
                                  <Eye size={14} />
                                  View
                                </button>

                                {/* Delete */}

                                <button
                                  type="button"
                                  onClick={() =>
                                    handleDelete(sale._id)
                                  }
                                  className="
                                    inline-flex items-center gap-1.5
                                    rounded-xl
                                    border border-red-200
                                    bg-red-50
                                    px-3 py-2
                                    text-xs font-semibold
                                    text-red-600
                                    shadow-sm
                                    backdrop-blur-xl
                                    transition-all duration-200
                                    hover:-translate-y-0.5
                                    hover:bg-red-100
                                    hover:shadow-[0_8px_20px_rgba(239,68,68,0.12)]
                                    active:scale-95
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

                  {/* =====================================================
                      MOBILE SALES CARDS
                  ====================================================== */}

                  <div className="space-y-3 p-3 md:hidden">
                    {sales.map((sale) => (
                      <div
                        key={sale._id}
                        className="
                          rounded-2xl
                          border border-white/80
                          bg-white/70
                          p-4
                          shadow-[0_10px_30px_rgba(15,23,42,0.07)]
                          backdrop-blur-xl
                          transition-all duration-300
                          hover:-translate-y-0.5
                          hover:border-violet-100
                          hover:bg-white
                          hover:shadow-[0_15px_35px_rgba(139,92,246,0.10)]
                        "
                      >
                        {/* Card Header */}

                        <div className="flex items-start justify-between gap-3">
                          <div className="flex min-w-0 items-center gap-3">
                            <div
                              className="
                                flex h-10 w-10 shrink-0
                                items-center justify-center
                                rounded-xl
                                border border-violet-100
                                bg-violet-50
                                text-violet-600
                              "
                            >
                              <ReceiptText size={17} />
                            </div>

                            <div className="min-w-0">
                              <p className="text-xs font-medium text-slate-400">
                                Sale
                              </p>

                              <p className="truncate text-sm font-semibold text-slate-900">
                                {sale.receiptNumber || sale._id}
                              </p>
                            </div>
                          </div>

                          {/* Total */}

                          <div className="shrink-0 text-right">
                            <p className="text-[10px] uppercase tracking-wide text-slate-400">
                              Total
                            </p>

                            <p className="text-sm font-bold text-violet-600">
                              Rs. {sale.totalAmount}
                            </p>
                          </div>
                        </div>

                        {/* Date + Payment */}

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {/* Date */}

                          <div
                            className="
                              rounded-xl
                              border border-slate-100
                              bg-slate-50/70
                              p-3
                            "
                          >
                            <div className="flex items-center gap-1.5">
                              <CalendarDays
                                size={13}
                                className="text-violet-600"
                              />

                              <span className="text-[10px] font-medium text-slate-400">
                                Date
                              </span>
                            </div>

                            <p className="mt-1.5 text-xs font-medium text-slate-700">
                              {new Date(
                                sale.createdAt
                              ).toLocaleDateString()}
                            </p>

                            <p className="mt-0.5 text-[10px] text-slate-400">
                              {new Date(
                                sale.createdAt
                              ).toLocaleTimeString()}
                            </p>
                          </div>

                          {/* Payment */}

                          <div
                            className="
                              rounded-xl
                              border border-slate-100
                              bg-slate-50/70
                              p-3
                            "
                          >
                            <div className="flex items-center gap-1.5">
                              {sale.paymentMethod === "cash" ? (
                                <Banknote
                                  size={13}
                                  className="text-violet-600"
                                />
                              ) : (
                                <CreditCard
                                  size={13}
                                  className="text-violet-600"
                                />
                              )}

                              <span className="text-[10px] font-medium text-slate-400">
                                Payment
                              </span>
                            </div>

                            <p className="mt-1.5 text-xs font-semibold capitalize text-slate-700">
                              {sale.paymentMethod}
                            </p>
                          </div>
                        </div>

                        {/* Items */}

                        <div className="mt-4">
                          <div className="mb-2 flex items-center gap-1.5">
                            <Package
                              size={14}
                              className="text-violet-600"
                            />

                            <span className="text-xs font-semibold text-slate-700">
                              Items
                            </span>
                          </div>

                          <div
                            className="
                              overflow-hidden
                              rounded-xl
                              border border-slate-100
                              bg-slate-50/50
                            "
                          >
                            {sale.items.map((item, index) => (
                              <div
                                key={
                                  item.product?._id || index
                                }
                                className="
                                  flex items-center justify-between
                                  gap-2
                                  border-b border-slate-100
                                  p-2.5
                                  last:border-b-0
                                "
                              >
                                <div className="flex min-w-0 items-center gap-2.5">
                                  {item.product?.image ? (
                                    <img
                                      src={`${import.meta.env.VITE_API_URL}${item.product.image}`}
                                      alt={item.product.name}
                                      className="
                                        h-9 w-9 shrink-0
                                        rounded-lg
                                        border border-white
                                        object-cover
                                        shadow-sm
                                      "
                                    />
                                  ) : (
                                    <div
                                      className="
                                        flex h-9 w-9 shrink-0
                                        items-center justify-center
                                        rounded-lg
                                        border border-violet-100
                                        bg-violet-50
                                        text-violet-600
                                      "
                                    >
                                      <Package size={13} />
                                    </div>
                                  )}

                                  <div className="min-w-0">
                                    <p className="truncate text-xs font-semibold text-slate-700">
                                      {item.product
                                        ? item.product.name
                                        : "Product deleted"}
                                    </p>

                                    <p className="mt-0.5 text-[10px] text-slate-400">
                                      Qty: {item.quantity}
                                    </p>
                                  </div>
                                </div>

                                <p className="shrink-0 text-xs font-bold text-violet-600">
                                  Rs.{" "}
                                  {item.price *
                                    item.quantity}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Actions */}

                        <div className="mt-4 grid grid-cols-2 gap-2">
                          {/* View */}

                          <button
                            type="button"
                            onClick={() => {
                              setSelectedSale(sale);
                            }}
                            className="
                              inline-flex items-center justify-center gap-1.5
                              rounded-xl
                              border border-violet-100
                              bg-violet-50
                              px-3 py-2.5
                              text-xs font-semibold
                              text-violet-700
                              shadow-sm
                              transition-all duration-200
                              hover:-translate-y-0.5
                              hover:border-violet-200
                              hover:bg-violet-100
                              hover:shadow-md
                              active:scale-95
                            "
                          >
                            <Eye size={14} />
                            View
                          </button>

                          {/* Delete */}

                          <button
                            type="button"
                            onClick={() =>
                              handleDelete(sale._id)
                            }
                            className="
                              inline-flex items-center justify-center gap-1.5
                              rounded-xl
                              border border-red-200
                              bg-red-50
                              px-3 py-2.5
                              text-xs font-semibold
                              text-red-600
                              shadow-sm
                              transition-all duration-200
                              hover:-translate-y-0.5
                              hover:bg-red-100
                              hover:shadow-md
                              active:scale-95
                            "
                          >
                            <Trash2 size={14} />
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </>
        )}
      </div>
    </main>
  );
}

export default Sales;