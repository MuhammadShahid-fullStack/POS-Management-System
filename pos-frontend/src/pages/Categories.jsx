import { useEffect, useState } from "react";

function Categories() {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);

  // Get Categories
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
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Add Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      alert("Please enter category name");
      return;
    }

    try {
      const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create category"
        );
      }

      setCategories((prevCategories) => [
        data.category,
        ...prevCategories,
      ]);

      setName("");

      alert("Category added successfully");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  // Delete Category
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );

    if (!confirmDelete) {
      return;
    }

    try {
      const response = await fetch(
       `${import.meta.env.VITE_API_URL}/api/categories/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete category"
        );
      }

      setCategories((prevCategories) =>
        prevCategories.filter(
          (category) => category._id !== id
        )
      );

      alert("Category deleted successfully");
    } catch (error) {
      console.error(error.message);
      alert(error.message);
    }
  };

  return (
    <main className="p-4 md:p-6">

      {/* Header */}
      <div className="mb-6">
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
          Categories
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          Manage your product categories
        </p>
      </div>

      {/* Add Category */}
      <div className="max-w-xl bg-white border border-gray-200 rounded-lg p-5 mb-6">

        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Add Category
        </h2>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3"
        >
          <input
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:border-gray-500"
          />

          <button
            type="submit"
            className="px-5 py-3 rounded-lg bg-gray-900 text-white font-medium hover:bg-gray-800"
          >
            Add Category
          </button>
        </form>

      </div>

      {/* Categories List */}
      <div className="bg-white border border-gray-200 rounded-lg">

        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">
            All Categories
          </h2>
        </div>

        {loading ? (
          <div className="p-5">
            <p className="text-sm text-gray-500">
              Loading categories...
            </p>
          </div>
        ) : categories.length === 0 ? (
          <div className="p-5">
            <p className="text-sm text-gray-500">
              No categories found
            </p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">

            {categories.map((category) => (
              <div
                key={category._id}
                className="px-5 py-4 flex items-center justify-between gap-4"
              >
                {/* Category Name */}
                <p className="font-medium text-gray-900">
                  {category.name}
                </p>

                {/* Delete Button */}
                <button
                  onClick={() =>
                    handleDelete(category._id)
                  }
                  className="px-3 py-1 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Delete
                </button>
              </div>
            ))}

          </div>
        )}

      </div>

    </main>
  );
}

export default Categories;