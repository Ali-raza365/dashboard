const STORAGE_KEY = "vehicle_inventory";
const USER_STORAGE_KEY = "user";

// Load vehicles from localStorage
export const loadVehicles =async () => {
  const data = await localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// Save vehicles to localStorage
export const saveVehicles = (vehicles) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
};


export const loadUsers =async () => {
  const data = await localStorage.getItem(USER_STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUsers = (vehicles) => {
  localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(vehicles));
};
