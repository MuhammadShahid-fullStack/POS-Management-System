import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShoppingCart,
  Mail,
  Lock,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  Package,
  BarChart3,
  Users,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      alert("Email and password are required");
      return;
    }

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/");
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };

  return (
    <div
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-linear-to-br
        from-violet-700
        via-purple-700
        to-fuchsia-600
        px-4
        py-8
        sm:px-6
      "
    >
      {/* ================= BACKGROUND GLOW ================= */}

      <div
        className="
          pointer-events-none
          absolute
          -left-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          -bottom-40
          -right-32
          h-96
          w-96
          rounded-full
          bg-fuchsia-300/20
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-96
          w-96
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-purple-400/10
          blur-3xl
        "
      />

      {/* Decorative circles */}

      <div
        className="
          pointer-events-none
          absolute
          left-[5%]
          top-[15%]
          h-20
          w-20
          rounded-full
          border
          border-white/10
          bg-white/5
          backdrop-blur-sm
        "
      />

      <div
        className="
          pointer-events-none
          absolute
          bottom-[12%]
          right-[7%]
          h-28
          w-28
          rounded-full
          border
          border-white/10
          bg-white/5
          backdrop-blur-sm
        "
      />

      {/* ================= MAIN ================= */}

      <div
        className="
          relative
          z-10
          mx-auto
          flex
          min-h-[calc(100vh-4rem)]
          w-full
          max-w-6xl
          items-center
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-10
            lg:grid-cols-[1fr_420px]
            lg:gap-16
            xl:grid-cols-[1fr_460px]
            xl:gap-20
          "
        >
          {/* =================================================
              LEFT CONTENT
          ================================================== */}

          <div className="hidden text-white lg:block">

            {/* Brand */}

            <div className="mb-10">

              <div className="mb-5 flex items-center gap-4">

                <div
                  className="
                    flex
                    h-14
                    w-14
                    items-center
                    justify-center
                    rounded-2xl
                    bg-white
                    text-violet-600
                    shadow-[0_15px_35px_rgba(0,0,0,0.15)]
                  "
                >
                  <ShoppingCart
                    size={27}
                    strokeWidth={2.2}
                  />
                </div>

                <div>

                  <p
                    className="
                      text-xs
                      font-bold
                      uppercase
                      tracking-[0.2em]
                      text-white/70
                    "
                  >
                    Point of Sale
                  </p>

                  <h1
                    className="
                      text-2xl
                      font-extrabold
                      tracking-tight
                    "
                  >
                    POS Management
                  </h1>

                </div>

              </div>

              <div className="flex items-center gap-2">

                <Sparkles
                  size={16}
                  className="text-fuchsia-200"
                />

                <span className="text-sm font-medium text-white/70">
                  Smart tools for your business
                </span>

              </div>

            </div>

            {/* Main Heading */}

            <div className="max-w-xl">

              <h2
                className="
                  text-4xl
                  font-extrabold
                  leading-tight
                  xl:text-5xl
                "
              >
                Manage your business
                <span className="mt-2 block text-fuchsia-200">
                  with confidence.
                </span>
              </h2>

              <p
                className="
                  mt-5
                  max-w-lg
                  text-sm
                  leading-7
                  text-white/70
                "
              >
                Manage products, sales, customers and your daily
                business operations from one simple POS system.
              </p>

            </div>

            {/* Features */}

            <div className="mt-10 grid max-w-xl gap-4">

              {/* Product */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-4
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/15
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                  "
                >
                  <Package size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Product Management
                  </h3>

                  <p className="mt-1 text-xs text-white/60">
                    Keep your products and stock organized.
                  </p>
                </div>
              </div>

              {/* Sales */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-4
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/15
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                  "
                >
                  <BarChart3 size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    Sales Tracking
                  </h3>

                  <p className="mt-1 text-xs text-white/60">
                    Monitor sales and daily business activity.
                  </p>
                </div>
              </div>

              {/* Users */}

              <div
                className="
                  flex
                  items-center
                  gap-4
                  rounded-2xl
                  border
                  border-white/10
                  bg-white/10
                  p-4
                  backdrop-blur-md
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-white/15
                "
              >
                <div
                  className="
                    flex
                    h-11
                    w-11
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-white/15
                  "
                >
                  <Users size={20} />
                </div>

                <div>
                  <h3 className="text-sm font-bold">
                    User Management
                  </h3>

                  <p className="mt-1 text-xs text-white/60">
                    Manage users and access permissions.
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* =================================================
              RIGHT LOGIN FORM
          ================================================== */}

          <div
            className="
              w-full
              rounded-[28px]
              bg-white
              p-6
              shadow-[0_30px_80px_rgba(0,0,0,0.22)]
              sm:p-8
              lg:p-9
            "
          >
            {/* Mobile Brand */}

            <div className="mb-8 flex flex-col items-center lg:hidden">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center
                  rounded-2xl
                  bg-linear-to-br
                  from-violet-600
                  to-fuchsia-600
                  text-white
                  shadow-lg
                "
              >
                <ShoppingCart size={25} />
              </div>

              <p
                className="
                  mt-3
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.2em]
                  text-violet-600
                "
              >
                Point of Sale
              </p>

              <h2
                className="
                  mt-1
                  text-xl
                  font-extrabold
                  text-slate-800
                "
              >
                POS Management
              </h2>

            </div>

            {/* Form Heading */}

            <div className="mb-7">

              <div
                className="
                  mb-4
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-linear-to-br
                  from-violet-600
                  to-fuchsia-600
                  text-white
                  shadow-lg
                  shadow-violet-200
                "
              >
                <Lock size={19} />
              </div>

              <h2
                className="
                  bg-linear-to-r
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
                Welcome back
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Sign in to continue to your POS dashboard.
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
              autoComplete="off"
            >

              {/* Email */}

              <div>

                <label
                  htmlFor="email"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Email
                </label>

                <div className="group relative">

                  <Mail
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      transition-colors
                      duration-200
                      group-focus-within:text-violet-600
                    "
                  />

                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="off"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-slate-400
                      hover:border-violet-200
                      focus:border-violet-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-violet-100
                    "
                  />

                </div>
              </div>

              {/* Password */}

              <div>

                <label
                  htmlFor="password"
                  className="
                    mb-2
                    block
                    text-sm
                    font-semibold
                    text-slate-700
                  "
                >
                  Password
                </label>

                <div className="group relative">

                  <Lock
                    size={18}
                    className="
                      absolute
                      left-3.5
                      top-1/2
                      -translate-y-1/2
                      text-slate-400
                      transition-colors
                      duration-200
                      group-focus-within:text-violet-600
                    "
                  />

                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete="new-password"
                    className="
                      w-full
                      rounded-xl
                      border
                      border-slate-200
                      bg-slate-50
                      py-3.5
                      pl-11
                      pr-4
                      text-sm
                      text-slate-800
                      outline-none
                      transition-all
                      duration-300
                      placeholder:text-slate-400
                      hover:border-violet-200
                      focus:border-violet-400
                      focus:bg-white
                      focus:ring-4
                      focus:ring-violet-100
                    "
                  />

                </div>
              </div>

              {/* Login Button */}

              <button
                type="submit"
                className="
                  group
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-xl
                  bg-linear-to-r
                  from-violet-600
                  via-purple-600
                  to-fuchsia-600
                  py-3.5
                  text-sm
                  font-bold
                  text-white
                  shadow-[0_12px_30px_rgba(139,92,246,0.28)]
                  transition-all
                  duration-300
                  hover:-translate-y-0.5
                  hover:shadow-[0_18px_40px_rgba(217,70,239,0.30)]
                  active:translate-y-0
                  active:scale-[0.99]
                "
              >
                <span>Login</span>

                <ArrowRight
                  size={17}
                  className="
                    transition-transform
                    duration-300
                    group-hover:translate-x-1
                  "
                />
              </button>

            </form>

            {/* Security */}

            <div
              className="
                mt-6
                flex
                items-center
                justify-center
                gap-2
                border-t
                border-slate-100
                pt-5
              "
            >
              <ShieldCheck
                size={15}
                className="text-violet-500"
              />

              <p className="text-xs text-slate-400">
                Your account information is secure
              </p>
            </div>

          </div>
        </div>
      </div>

      {/* Footer */}

      <p
        className="
          absolute
          bottom-3
          left-0
          right-0
          text-center
          text-xs
          text-white/40
        "
      >
        © POS Management System
      </p>
    </div>
  );
}

export default Login;