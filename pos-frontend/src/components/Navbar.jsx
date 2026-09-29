import { Bell, Menu, ShoppingCart, Sparkles } from "lucide-react";

function Navbar({ setIsSidebarOpen }) {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header
      className="
        sticky
        top-0
        z-30
        flex
        h-18
        items-center
        justify-between
        border-b
        border-slate-200/70
        bg-white/85
        px-4
        shadow-[0_10px_40px_rgba(15,23,42,0.06)]
        backdrop-blur-2xl
        sm:px-5
        md:px-6
      "
    >
      {/* =====================================================
          LEFT
      ====================================================== */}

      <div className="flex min-w-0 items-center gap-3 sm:gap-4">

        {/* =================================================
            MOBILE MENU
        ================================================== */}

        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="
            flex
            h-10
            w-10
            shrink-0
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-600
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-violet-200
            hover:bg-violet-50
            hover:text-violet-600
            hover:shadow-[0_8px_20px_rgba(139,92,246,0.12)]
            active:scale-95
            md:hidden
          "
          aria-label="Open sidebar"
        >
          <Menu size={20} />
        </button>

        {/* =================================================
            POINT OF SALE BRAND
        ================================================== */}

        <div className="flex min-w-0 items-center gap-3">

          {/* BRAND ICON */}

          <div
            className="
              relative
              flex
              h-11
              w-11
              shrink-0
              items-center
              justify-center
              overflow-hidden
              rounded-2xl
              bg-linear-to-br
              from-violet-600
              via-purple-600
              to-fuchsia-500
              text-white
              shadow-[0_10px_30px_rgba(139,92,246,0.28)]
              transition-all
              duration-300
              hover:-translate-y-1
              hover:scale-105
              hover:shadow-[0_15px_35px_rgba(217,70,239,0.30)]
            "
          >
            {/* Glow */}

            <div
              className="
                absolute
                -right-3
                -top-3
                h-8
                w-8
                rounded-full
                bg-white/30
                blur-md
              "
            />

            <ShoppingCart
              size={21}
              strokeWidth={2.2}
              className="relative z-10"
            />
          </div>

          {/* BRAND TEXT */}

          <div className="min-w-0">

            {/* Small Label */}

            <div className="flex items-center gap-1.5">
              <p
                className="
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-violet-600
                  sm:text-[11px]
                "
              >
                Point of Sale
              </p>

              <Sparkles
                size={11}
                className="text-fuchsia-500"
              />
            </div>

            {/* Main Title */}

            <h2
              className="
                mt-0.5
                truncate
                bg-linear-to-r
                from-violet-700
                via-purple-600
                to-fuchsia-600
                bg-clip-text
                text-base
                font-extrabold
                tracking-tight
                text-transparent
                sm:text-lg
              "
            >
              POS Management
            </h2>

          </div>
        </div>
      </div>

      {/* =====================================================
          RIGHT
      ====================================================== */}

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">

        {/* =================================================
            NOTIFICATION
        ================================================== */}

        <button
          type="button"
          className="
            group
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-slate-200
            bg-white
            text-slate-500
            shadow-sm
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-violet-200
            hover:bg-violet-50
            hover:text-violet-600
            hover:shadow-[0_8px_20px_rgba(139,92,246,0.12)]
            active:scale-95
          "
          aria-label="Notifications"
        >
          <Bell
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:rotate-12
            "
          />

          {/* Notification Dot */}

          <span
            className="
              absolute
              right-2
              top-2
              h-2
              w-2
              rounded-full
              bg-linear-to-r
              from-violet-500
              to-fuchsia-500
              shadow-[0_0_10px_rgba(217,70,239,0.55)]
            "
          />
        </button>

        {/* =================================================
            USER
        ================================================== */}

        <div
          className="
            ml-1
            flex
            items-center
            gap-2
            border-l
            border-slate-200
            pl-2
            sm:gap-3
            sm:pl-3
          "
        >

          {/* NAME + ROLE */}

          <div className="hidden text-right sm:block">
            <p
              className="
                max-w-37.5
                truncate
                text-sm
                font-bold
                text-slate-800
              "
            >
              {user?.name || "Admin"}
            </p>

            <div className="mt-0.5 flex items-center justify-end gap-1.5">
              <span
                className="
                  h-1.5
                  w-1.5
                  rounded-full
                  bg-violet-500
                  shadow-[0_0_6px_rgba(139,92,246,0.45)]
                "
              />

              <p
                className="
                  text-[11px]
                  font-medium
                  capitalize
                  text-slate-400
                "
              >
                {user?.role || "admin"}
              </p>
            </div>
          </div>

          {/* AVATAR */}

          <div
            className="
              group
              relative
              flex
              h-10
              w-10
              shrink-0
              cursor-default
              items-center
              justify-center
              overflow-visible
              rounded-xl
              bg-linear-to-br
              from-violet-600
              via-purple-600
              to-fuchsia-500
              text-sm
              font-bold
              text-white
              shadow-[0_8px_25px_rgba(139,92,246,0.25)]
              transition-all
              duration-300
              hover:-translate-y-0.5
              hover:scale-105
              hover:shadow-[0_12px_30px_rgba(217,70,239,0.28)]
            "
          >
            {/* Avatar Glow */}

            <div
              className="
                absolute
                inset-0
                rounded-xl
                bg-linear-to-br
                from-violet-400
                to-fuchsia-400
                opacity-0
                blur-md
                transition-opacity
                duration-300
                group-hover:opacity-50
              "
            />

            <span className="relative z-10">
              {user?.name
                ? user.name.charAt(0).toUpperCase()
                : "A"}
            </span>

            {/* Online Indicator */}

            <span
              className="
                absolute
                -bottom-0.5
                -right-0.5
                z-20
                h-3
                w-3
                rounded-full
                border-2
                border-white
                bg-violet-500
                shadow-[0_0_10px_rgba(139,92,246,0.55)]
              "
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;