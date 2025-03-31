import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { GoogleOAuthProvider } from "@react-oauth/google";
import "./index.css";
import App from "./App.jsx";

const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GoogleOAuthProvider 
      clientId={clientId}
      redirectUri="http://localhost:5173/create-trip"  // Explicit redirect URI
    >
      <App />
    </GoogleOAuthProvider>
  </StrictMode>
);
