import { useState } from "react";

import {
  ScanBarcode,
  Package,
  Barcode,
  ShoppingCart,
  Plus,
  Minus,
  Trash2,
  Banknote,
  CreditCard,
  ReceiptText,
  Printer,
  Search,
  X,
  CircleCheck,
} from "lucide-react";

function POS() {
  const [barcode, setBarcode] = useState("");
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState([]);
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Receipt data
  const [receipt, setReceipt] = useState(null);

  // Search Product
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!barcode.trim()) {
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/products/barcode/${barcode}`
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        throw new Error(data.message || "Product not found");
      }

      console.log("Product found:", data.product);

      setProduct(data.product);
      setBarcode("");
    } catch (error) {
      console.error(error.message);
      setProduct(null);
      alert(error.message);
    }
  };

  // Add Product To Cart
  const handleAddToCart = () => {
    if (!product) {
      return;
    }

    const existingProduct = cart.find(
      (item) => item._id === product._id
    );

    if (existingProduct) {
      if (existingProduct.quantity >= existingProduct.stock) {
        alert("Not enough stock available");
        return;
      }

      setCart(
        cart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        )
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // Increase Quantity
  const increaseQuantity = (id) => {
    const currentItem = cart.find(
      (item) => item._id === id
    );

    if (!currentItem) {
      return;
    }

    if (currentItem.quantity >= currentItem.stock) {
      alert("Not enough stock available");
      return;
    }

    setCart(
      cart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // Decrease Quantity
  const decreaseQuantity = (id) => {
    setCart(
      cart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // Remove Product
  const removeFromCart = (id) => {
    setCart(
      cart.filter((item) => item._id !== id)
    );
  };

  // Grand Total
  const grandTotal = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  // Change
  const change =
    Number(receivedAmount) - grandTotal;

  // Complete Payment
  const handlePayment = async () => {
    if (isProcessing) {
      return;
    }

    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (paymentMethod === "cash") {
      if (!receivedAmount) {
        alert("Please enter received amount");
        return;
      }

      if (Number(receivedAmount) < grandTotal) {
        alert("Insufficient amount");
        return;
      }
    }

    setIsProcessing(true);

    try {
      const saleItems = cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
      }));

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/sales`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            items: saleItems,
            paymentMethod,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create sale"
        );
      }

      console.log(data);

      // Save Receipt
      setReceipt({
        receiptNumber: data.sale.receiptNumber,
        items: cart,
        totalAmount: grandTotal,
        paymentMethod: paymentMethod,
        receivedAmount:
          paymentMethod === "cash"
            ? Number(receivedAmount)
            : grandTotal,
        change:
          paymentMethod === "cash"
            ? Number(receivedAmount) - grandTotal
            : 0,
        date: new Date().toLocaleString(),
      });

      alert("Sale completed successfully");

      setCart([]);
      setReceivedAmount("");
      setProduct(null);
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  // Print Receipt
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="min-h-screen p-4 md:p-6 lg:p-8">

      {/* Page Header */}
      <div className="mb-7">
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
            <ShoppingCart size={20} />
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
              POS
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Scan products and complete sales
            </p>
          </div>

        </div>
      </div>

      {/* Main POS Layout */}
      <div
        className="
          grid
          grid-cols-1
          xl:grid-cols-3
          gap-6
          items-start
        "
      >

        {/* Left Side */}
        <div className="xl:col-span-2 space-y-6">

          {/* Barcode Search */}
          <section
            className="
              bg-white/70
              backdrop-blur-2xl
              border border-white/80
              rounded-2xl
              p-5 md:p-6

              shadow-[0_10px_35px_rgba(0,0,0,0.06)]

              hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]

              transition-shadow duration-300
            "
          >

            {/* Section Header */}
            <div className="flex items-center gap-3 mb-5">

              <div
                className="
                  w-10 h-10
                  rounded-xl
                  bg-gray-100/80
                  border border-gray-200
                  flex items-center justify-center

                  shadow-sm

                  transition-all duration-300
                  hover:bg-gray-200
                  hover:scale-105
                "
              >
                <ScanBarcode
                  size={19}
                  className="text-gray-600"
                />
              </div>

              <div>
                <h2 className="text-base font-semibold text-gray-900">
                  Scan Product
                </h2>

                <p className="text-xs text-gray-400 mt-0.5">
                  Scan or enter product barcode
                </p>
              </div>

            </div>

            {/* Search Form */}
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >

              <div className="relative flex-1">

                <Barcode
                  size={18}
                  className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-gray-400
                    transition-colors duration-300
                  "
                />

                <input
                  type="text"
                  value={barcode}
                  onChange={(e) =>
                    setBarcode(e.target.value)
                  }
                  placeholder="Scan or enter barcode"
                  autoFocus
                  className="
                    w-full
                    pl-11
                    pr-4
                    py-3.5

                    bg-white/60
                    backdrop-blur-xl

                    border border-gray-200
                    rounded-xl
                    outline-none

                    text-sm
                    text-gray-900
                    placeholder:text-gray-400

                    shadow-[0_5px_18px_rgba(0,0,0,0.04)]

                    hover:border-gray-300

                    focus:bg-white
                    focus:border-gray-300
                    focus:ring-4
                    focus:ring-gray-100

                    focus:shadow-[0_8px_25px_rgba(0,0,0,0.08)]

                    transition-all duration-300
                  "
                />

              </div>

              <button
                type="submit"
                className="
                  inline-flex
                  items-center
                  justify-center
                  gap-2

                  px-6
                  py-3.5
                  rounded-xl

                  bg-gray-900
                  text-white

                  text-sm
                  font-semibold

                  shadow-[0_7px_18px_rgba(0,0,0,0.12)]

                  hover:bg-gray-800
                  hover:-translate-y-0.5
                  hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]

                  active:translate-y-0

                  transition-all duration-300
                "
              >
                <Search size={17} />
                Search
              </button>

            </form>

            {/* Product Preview */}
            {product && (
              <div
                className="
                  mt-5
                  p-4
                  rounded-2xl

                  bg-white/60
                  backdrop-blur-xl

                  border border-gray-200

                  shadow-[0_8px_25px_rgba(0,0,0,0.05)]

                  animate-[fadeIn_0.3s_ease-out]
                "
              >

                <div className="flex flex-col sm:flex-row gap-4">

                  {/* Image */}
                  {product.image ? (
                    <div
                      className="
                        w-20 h-20
                        rounded-xl
                        overflow-hidden
                        border border-gray-200
                        shadow-sm
                        shrink-0

                        transition-all duration-300
                        hover:scale-105
                        hover:shadow-md
                      "
                    >
                      <img
                        src={`${import.meta.env.VITE_API_URL}${product.image}`}
                        alt={product.name}
                        className="
                          w-full h-full
                          object-cover
                          transition-transform duration-500
                          hover:scale-110
                        "
                      />
                    </div>
                  ) : (
                    <div
                      className="
                        w-20 h-20
                        rounded-xl
                        bg-white
                        border border-gray-200
                        flex items-center justify-center
                        shadow-sm
                        shrink-0

                        transition-all duration-300
                        hover:scale-105
                      "
                    >
                      <Package
                        size={24}
                        className="text-gray-400"
                      />
                    </div>
                  )}

                  {/* Info */}
                  <div className="flex-1">

                    <div className="flex items-start justify-between gap-3">

                      <div>
                        <h3 className="text-base font-semibold text-gray-900">
                          {product.name}
                        </h3>

                        <p className="text-xs text-gray-400 mt-1 capitalize">
                          {product.category}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => setProduct(null)}
                        className="
                          w-8 h-8
                          rounded-lg

                          bg-gray-100/70

                          flex items-center justify-center
                          text-gray-400

                          hover:bg-gray-900
                          hover:text-white
                          hover:rotate-90

                          transition-all duration-300
                        "
                      >
                        <X size={16} />
                      </button>

                    </div>

                    <div
                      className="
                        grid
                        grid-cols-2
                        sm:grid-cols-3
                        gap-3
                        mt-4
                      "
                    >

                      <div
                        className="
                          p-3
                          rounded-xl
                          bg-gray-50/80
                          border border-gray-100
                        "
                      >
                        <p className="text-[11px] text-gray-400">
                          Price
                        </p>

                        <p className="text-sm font-bold text-gray-900 mt-0.5">
                          Rs. {product.price}
                        </p>
                      </div>

                      <div
                        className="
                          p-3
                          rounded-xl
                          bg-gray-50/80
                          border border-gray-100
                        "
                      >
                        <p className="text-[11px] text-gray-400">
                          Stock
                        </p>

                        <p
                          className={`text-sm font-bold mt-0.5 ${
                            product.stock <= 5
                              ? "text-red-600"
                              : "text-gray-900"
                          }`}
                        >
                          {product.stock}
                        </p>
                      </div>

                      <div
                        className="
                          p-3
                          rounded-xl
                          bg-gray-50/80
                          border border-gray-100
                        "
                      >
                        <p className="text-[11px] text-gray-400">
                          Barcode
                        </p>

                        <p className="text-xs font-medium text-gray-700 mt-0.5 break-all">
                          {product.barcode}
                        </p>
                      </div>

                    </div>

                    <button
                      type="button"
                      onClick={handleAddToCart}
                      className="
                        mt-4
                        inline-flex
                        items-center
                        justify-center
                        gap-2

                        w-full
                        sm:w-auto

                        px-6
                        py-3
                        rounded-xl

                        bg-gray-900
                        text-white

                        text-sm
                        font-semibold

                        shadow-[0_7px_18px_rgba(0,0,0,0.12)]

                        hover:bg-gray-800
                        hover:-translate-y-0.5
                        hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]

                        active:translate-y-0

                        transition-all duration-300
                      "
                    >
                      <Plus size={17} />
                      Add to Cart
                    </button>

                  </div>

                </div>

              </div>
            )}

          </section>

          {/* Cart */}
          <section
            className="
              bg-white/70
              backdrop-blur-2xl
              border border-white/80
              rounded-2xl
              overflow-hidden

              shadow-[0_10px_35px_rgba(0,0,0,0.06)]

              hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)]

              transition-shadow duration-300
            "
          >

            {/* Cart Header */}
            <div
              className="
                flex
                items-center
                justify-between

                p-5 md:p-6

                border-b border-gray-200/80
                bg-white/30
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-gray-100/80
                    border border-gray-200
                    flex items-center justify-center
                    shadow-sm
                  "
                >
                  <ShoppingCart
                    size={18}
                    className="text-gray-600"
                  />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Cart
                  </h2>

                  <p className="text-xs text-gray-400 mt-0.5">
                    {cart.length}{" "}
                    {cart.length === 1
                      ? "product"
                      : "products"}
                  </p>
                </div>

              </div>

              {cart.length > 0 && (
                <button
                  type="button"
                  onClick={() => setCart([])}
                  disabled={isProcessing}
                  className="
                    inline-flex
                    items-center
                    gap-1.5

                    px-3
                    py-2
                    rounded-xl

                    bg-red-50/80
                    border border-red-100

                    text-red-600
                    text-xs
                    font-semibold

                    hover:bg-red-600
                    hover:text-white
                    hover:border-red-600

                    hover:-translate-y-0.5

                    disabled:opacity-50
                    disabled:cursor-not-allowed

                    transition-all duration-300
                  "
                >
                  <Trash2 size={14} />
                  Clear
                </button>
              )}

            </div>

            {/* Empty Cart */}
            {cart.length === 0 ? (
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
                  <ShoppingCart
                    size={22}
                    className="text-gray-400"
                  />
                </div>

                <p className="mt-4 text-sm font-semibold text-gray-900">
                  Cart is empty
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Scan a product to add it to the cart.
                </p>

              </div>
            ) : (
              <div className="p-5 md:p-6">

                <div className="space-y-3">

                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="
                        p-4
                        rounded-2xl

                        bg-white/50
                        backdrop-blur-xl

                        border border-gray-200

                        shadow-[0_5px_18px_rgba(0,0,0,0.04)]

                        hover:bg-white/80
                        hover:shadow-[0_8px_25px_rgba(0,0,0,0.07)]
                        hover:-translate-y-0.5

                        transition-all duration-300
                      "
                    >

                      <div className="flex flex-col lg:flex-row lg:items-center gap-4">

                        {/* Product */}
                        <div className="flex items-center gap-3 flex-1 min-w-0">

                          {item.image ? (
                            <div
                              className="
                                w-12 h-12
                                rounded-xl
                                overflow-hidden
                                border border-gray-200
                                shadow-sm
                                shrink-0
                              "
                            >
                              <img
                                src={`${import.meta.env.VITE_API_URL}${item.image}`}
                                alt={item.name}
                                className="
                                  w-full h-full
                                  object-cover
                                  transition-transform duration-300
                                  hover:scale-110
                                "
                              />
                            </div>
                          ) : (
                            <div
                              className="
                                w-12 h-12
                                rounded-xl
                                bg-gray-100
                                border border-gray-200
                                flex items-center justify-center
                                shrink-0
                              "
                            >
                              <Package
                                size={17}
                                className="text-gray-400"
                              />
                            </div>
                          )}

                          <div className="min-w-0">
                            <h3 className="text-sm font-semibold text-gray-900 truncate">
                              {item.name}
                            </h3>

                            <p className="text-xs text-gray-500 mt-1">
                              Rs. {item.price} each
                            </p>
                          </div>

                        </div>

                        {/* Controls */}
                        <div
                          className="
                            flex
                            items-center
                            justify-between
                            lg:justify-end
                            gap-4
                          "
                        >

                          {/* Quantity */}
                          <div
                            className="
                              flex
                              items-center
                              gap-1.5

                              p-1
                              rounded-xl

                              bg-gray-100/80
                              border border-gray-200
                            "
                          >

                            <button
                              type="button"
                              onClick={() =>
                                decreaseQuantity(item._id)
                              }
                              className="
                                w-8 h-8
                                rounded-lg

                                bg-white
                                border border-gray-200

                                flex items-center justify-center
                                text-gray-600

                                shadow-sm

                                hover:bg-gray-900
                                hover:text-white
                                hover:border-gray-900

                                active:scale-95

                                transition-all duration-200
                              "
                            >
                              <Minus size={14} />
                            </button>

                            <span className="w-8 text-center text-sm font-bold text-gray-900">
                              {item.quantity}
                            </span>

                            <button
                              type="button"
                              onClick={() =>
                                increaseQuantity(item._id)
                              }
                              className="
                                w-8 h-8
                                rounded-lg

                                bg-white
                                border border-gray-200

                                flex items-center justify-center
                                text-gray-600

                                shadow-sm

                                hover:bg-gray-900
                                hover:text-white
                                hover:border-gray-900

                                active:scale-95

                                transition-all duration-200
                              "
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                          {/* Item Total */}
                          <p
                            className="
                              min-w-22.5
                              text-right
                              text-sm
                              font-bold
                              text-gray-900
                            "
                          >
                            Rs.{" "}
                            {item.price * item.quantity}
                          </p>

                          {/* Remove */}
                          <button
                            type="button"
                            onClick={() =>
                              removeFromCart(item._id)
                            }
                            className="
                              w-9 h-9
                              rounded-xl

                              bg-gray-100/70

                              flex items-center justify-center
                              text-gray-400

                              hover:bg-red-600
                              hover:text-white

                              hover:-translate-y-0.5

                              active:scale-95

                              transition-all duration-300
                            "
                          >
                            <Trash2 size={15} />
                          </button>

                        </div>

                      </div>

                    </div>
                  ))}

                </div>

              </div>
            )}

          </section>

        </div>

        {/* Right Side - Payment */}
        <div className="xl:sticky xl:top-24">

          <section
            className="
              bg-white/70
              backdrop-blur-2xl
              border border-white/80
              rounded-2xl
              overflow-hidden

              shadow-[0_10px_35px_rgba(0,0,0,0.07)]

              hover:shadow-[0_15px_40px_rgba(0,0,0,0.09)]

              transition-shadow duration-300
            "
          >

            {/* Payment Header */}
            <div
              className="
                p-5
                border-b border-gray-200/80
                bg-white/30
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    w-10 h-10
                    rounded-xl
                    bg-gray-100/80
                    border border-gray-200
                    flex items-center justify-center
                    shadow-sm
                  "
                >
                  <ReceiptText
                    size={18}
                    className="text-gray-600"
                  />
                </div>

                <div>
                  <h2 className="text-base font-semibold text-gray-900">
                    Payment
                  </h2>

                  <p className="text-xs text-gray-400 mt-0.5">
                    Complete customer payment
                  </p>
                </div>

              </div>

            </div>

            <div className="p-5">

              {/* Grand Total */}
              <div
                className="
                  relative
                  overflow-hidden

                  p-5
                  rounded-2xl

                  bg-gray-900
                  text-white

                  shadow-[0_10px_30px_rgba(0,0,0,0.15)]

                  transition-all duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_15px_35px_rgba(0,0,0,0.20)]
                "
              >

                <div
                  className="
                    absolute
                    -right-10
                    -top-10
                    w-28
                    h-28
                    rounded-full
                    bg-white/5
                  "
                />

                <p className="relative text-xs text-gray-400">
                  Grand Total
                </p>

                <p className="relative mt-1 text-3xl font-bold tracking-tight">
                  Rs. {grandTotal}
                </p>

              </div>

              {/* Payment Method */}
              <div className="mt-6">

                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Payment Method
                </p>

                <div className="grid grid-cols-2 gap-3">

                  {/* Cash */}
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("cash")
                    }
                    className={`
                      relative
                      flex
                      items-center
                      justify-center
                      gap-2

                      px-4
                      py-3.5
                      rounded-xl

                      border
                      text-sm
                      font-semibold

                      active:scale-[0.98]

                      transition-all duration-300

                      ${
                        paymentMethod === "cash"
                          ? "bg-gray-900 text-white border-gray-900 shadow-[0_7px_18px_rgba(0,0,0,0.14)]"
                          : "bg-white/70 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:-translate-y-0.5"
                      }
                    `}
                  >
                    <Banknote size={17} />
                    Cash
                  </button>

                  {/* Card */}
                  <button
                    type="button"
                    onClick={() =>
                      setPaymentMethod("card")
                    }
                    className={`
                      relative
                      flex
                      items-center
                      justify-center
                      gap-2

                      px-4
                      py-3.5
                      rounded-xl

                      border
                      text-sm
                      font-semibold

                      active:scale-[0.98]

                      transition-all duration-300

                      ${
                        paymentMethod === "card"
                          ? "bg-gray-900 text-white border-gray-900 shadow-[0_7px_18px_rgba(0,0,0,0.14)]"
                          : "bg-white/70 text-gray-600 border-gray-200 hover:bg-gray-100 hover:border-gray-300 hover:-translate-y-0.5"
                      }
                    `}
                  >
                    <CreditCard size={17} />
                    Card
                  </button>

                </div>

              </div>

              {/* Cash */}
              {paymentMethod === "cash" && (
                <div className="mt-5">

                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Received Amount
                  </label>

                  <div className="relative">

                    <Banknote
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
                      value={receivedAmount}
                      onChange={(e) =>
                        setReceivedAmount(
                          e.target.value
                        )
                      }
                      placeholder="Enter amount"
                      className="
                        w-full
                        pl-10
                        pr-4
                        py-3.5

                        bg-white/60
                        backdrop-blur-xl

                        border border-gray-200
                        rounded-xl

                        outline-none

                        text-sm
                        text-gray-900
                        placeholder:text-gray-400

                        shadow-[0_5px_18px_rgba(0,0,0,0.04)]

                        hover:border-gray-300

                        focus:bg-white
                        focus:border-gray-300
                        focus:ring-4
                        focus:ring-gray-100

                        transition-all duration-300
                      "
                    />

                  </div>

                  {/* Change */}
                  {receivedAmount && (
                    <div
                      className={`
                        mt-3
                        p-4
                        rounded-xl
                        border

                        shadow-sm

                        ${
                          change >= 0
                            ? "bg-gray-50/80 border-gray-200"
                            : "bg-red-50/80 border-red-200"
                        }
                      `}
                    >

                      <div className="flex justify-between items-center">

                        <span className="text-sm text-gray-500">
                          Change
                        </span>

                        <span
                          className={`
                            text-lg
                            font-bold

                            ${
                              change >= 0
                                ? "text-gray-900"
                                : "text-red-600"
                            }
                          `}
                        >
                          Rs.{" "}
                          {change >= 0
                            ? change
                            : 0}
                        </span>

                      </div>

                      {change < 0 && (
                        <p className="mt-1 text-xs text-red-500">
                          Insufficient amount
                        </p>
                      )}

                    </div>
                  )}

                </div>
              )}

              {/* Complete Payment */}
              <button
                type="button"
                onClick={handlePayment}
                disabled={
                  isProcessing ||
                  cart.length === 0
                }
                className={`
                  mt-6
                  w-full

                  inline-flex
                  items-center
                  justify-center
                  gap-2

                  px-5
                  py-3.5
                  rounded-xl

                  text-sm
                  font-semibold

                  transition-all duration-300

                  ${
                    isProcessing ||
                    cart.length === 0
                      ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                      : "bg-gray-900 text-white shadow-[0_8px_20px_rgba(0,0,0,0.14)] hover:bg-gray-800 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,0.20)] active:translate-y-0"
                  }
                `}
              >

                {isProcessing ? (
                  <>
                    <span
                      className="
                        w-4 h-4
                        border-2
                        border-gray-300
                        border-t-white
                        rounded-full
                        animate-spin
                      "
                    />

                    Processing...
                  </>
                ) : (
                  <>
                    <CircleCheck size={17} />
                    Complete Payment
                  </>
                )}

              </button>

            </div>

          </section>

        </div>

      </div>

      {/* Receipt */}
      {receipt && (
        <section
          className="
            receipt-section

            mt-8
            max-w-md

            bg-white
            border border-gray-200

            rounded-2xl

            p-6

            shadow-[0_12px_40px_rgba(0,0,0,0.08)]
          "
        >

          {/* Receipt Header */}
          <div className="text-center border-b border-gray-200 pb-5">

            <div
              className="
                mx-auto
                w-11 h-11
                rounded-xl

                bg-gray-900
                text-white

                flex items-center justify-center

                shadow-[0_7px_18px_rgba(0,0,0,0.15)]
              "
            >
              <ReceiptText size={19} />
            </div>

            <h2 className="mt-3 text-xl font-bold text-gray-900">
              POS SYSTEM
            </h2>

            <p className="text-xs text-gray-400 mt-1">
              Sales Receipt
            </p>

          </div>

          {/* Receipt Info */}
          <div className="py-4 border-b border-gray-200 text-sm">

            <div className="flex justify-between gap-4">
              <span className="text-gray-500">
                Receipt No:
              </span>

              <span className="font-semibold text-gray-900">
                {receipt.receiptNumber}
              </span>
            </div>

            <div className="flex justify-between gap-4 mt-2">
              <span className="text-gray-500">
                Date:
              </span>

              <span className="text-gray-700 text-right">
                {receipt.date}
              </span>
            </div>

          </div>

          {/* Items */}
          <div className="py-4 border-b border-gray-200">

            <h3 className="text-sm font-semibold text-gray-900 mb-3">
              Items
            </h3>

            <div className="space-y-3">

              {receipt.items.map((item) => (
                <div
                  key={item._id}
                  className="
                    flex
                    justify-between
                    gap-4
                    text-sm
                  "
                >

                  <div>
                    <p className="font-medium text-gray-900">
                      {item.name}
                    </p>

                    <p className="text-xs text-gray-500 mt-1">
                      {item.quantity} × Rs.{" "}
                      {item.price}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">
                    Rs.{" "}
                    {item.price * item.quantity}
                  </p>

                </div>
              ))}

            </div>

          </div>

          {/* Total */}
          <div className="py-4 border-b border-gray-200">

            <div className="flex justify-between text-lg font-bold">

              <span>Total</span>

              <span>
                Rs. {receipt.totalAmount}
              </span>

            </div>

          </div>

          {/* Payment */}
          <div className="py-4 border-b border-gray-200 text-sm">

            <div className="flex justify-between">
              <span className="text-gray-500">
                Payment:
              </span>

              <span className="font-semibold uppercase">
                {receipt.paymentMethod}
              </span>
            </div>

            {receipt.paymentMethod === "cash" && (
              <>
                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">
                    Received:
                  </span>

                  <span>
                    Rs. {receipt.receivedAmount}
                  </span>
                </div>

                <div className="flex justify-between mt-2">
                  <span className="text-gray-500">
                    Change:
                  </span>

                  <span>
                    Rs. {receipt.change}
                  </span>
                </div>
              </>
            )}

          </div>

          {/* Footer */}
          <div className="text-center pt-4">

            <p className="font-semibold text-gray-900">
              Thank You!
            </p>

            <p className="text-xs text-gray-500 mt-1">
              Please visit again.
            </p>

          </div>

          {/* Print */}
          <button
            type="button"
            onClick={handlePrint}
            className="
              print-receipt-button

              mt-5
              w-full

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
              font-semibold

              shadow-[0_7px_18px_rgba(0,0,0,0.12)]

              hover:bg-gray-800
              hover:-translate-y-0.5
              hover:shadow-[0_10px_25px_rgba(0,0,0,0.18)]

              active:translate-y-0

              transition-all duration-300
            "
          >
            <Printer size={17} />
            Print Receipt
          </button>

        </section>
      )}

    </main>
  );
}

export default POS;