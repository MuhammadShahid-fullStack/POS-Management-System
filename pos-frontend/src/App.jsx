import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import POS from "./pages/POS";
import Sales from "./pages/Sales";
import Categories from "./pages/Categories";
import Users from "./pages/Users";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute";

function AppLayout() {
  const location = useLocation();

  // Mobile sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isLoginPage = location.pathname === "/login";

  return (
    <div className="h-screen overflow-hidden bg-gray-50">
      {isLoginPage ? (
        // Login page
        <Routes>
          <Route path="/login" element={<Login />} />
        </Routes>
      ) : (
        <>
          {/* Fixed Sidebar */}
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            setIsSidebarOpen={setIsSidebarOpen}
          />

          {/* Main Area */}
          <div className="flex h-screen min-w-0 flex-col overflow-hidden md:ml-64">
            {/* Navbar */}
            <Navbar setIsSidebarOpen={setIsSidebarOpen} />

            {/* Only Main Content Scrolls */}
            <main className="min-h-0 flex-1 overflow-y-auto">
              <Routes>

                {/* Dashboard */}
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Products */}
                <Route
                  path="/products"
                  element={
                    <ProtectedRoute>
                      <Products />
                    </ProtectedRoute>
                  }
                />

                {/* Add Product */}
                <Route
                  path="/products/add"
                  element={
                    <ProtectedRoute>
                      <AddProduct />
                    </ProtectedRoute>
                  }
                />

                {/* Edit Product */}
                <Route
                  path="/products/edit/:id"
                  element={
                    <ProtectedRoute>
                      <EditProduct />
                    </ProtectedRoute>
                  }
                />

                {/* POS */}
                <Route
                  path="/pos"
                  element={
                    <ProtectedRoute>
                      <POS />
                    </ProtectedRoute>
                  }
                />

                {/* Sales */}
                <Route
                  path="/sales"
                  element={
                    <ProtectedRoute>
                      <Sales />
                    </ProtectedRoute>
                  }
                />

                {/* Categories */}
                <Route
                  path="/settings/categories"
                  element={
                    <ProtectedRoute>
                      <Categories />
                    </ProtectedRoute>
                  }
                />

                {/* Users */}
                <Route
                  path="/settings/users"
                  element={
                    <ProtectedRoute>
                      <Users />
                    </ProtectedRoute>
                  }
                />

              </Routes>
            </main>
          </div>
        </>
      )}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;