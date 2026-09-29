const permissions = {
  admin: [
    "dashboard",
    "products",
    "pos",
    "sales",
    "categories",
    "users",
    "reports",
  ],

  manager: [
    "dashboard",
    "products",
    "sales",
    "reports",
  ],

  cashier: [
    "pos",
    "sales",
  ],
};

export const hasPermission = (permission) => {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return false;
  }

  return permissions[user.role]?.includes(permission) || false;
};

export default permissions;