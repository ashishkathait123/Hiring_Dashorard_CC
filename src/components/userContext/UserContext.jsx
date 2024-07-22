import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();
export const useUser = () => {
  return useContext(UserContext);
};
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Get user data from local storage
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    // Save user data to local storage
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  useEffect(() => {
    // Mock fetching user data, replace with actual logic
    const fetchUser = async () => {
      // Fetch user data from API or local storage
      const userData = await getUserData(); // Replace with your logic
      setUser(userData);
    };
    fetchUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const getUserData = async () => {
  // Replace with actual fetch logic
  return {
    email: "test@example.com",
    profile: "http://localhost:3000/api/v1/users/profile.jpg",
  };
};
