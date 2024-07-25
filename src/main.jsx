import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { UserProvider } from "./components/userContext/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
   <UserProvider>
    <App />

   </UserProvider>
);
 