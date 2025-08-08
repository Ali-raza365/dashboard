import { useContext, useEffect, useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Inventory from "./scenes/inventory";
import SignIn from "./scenes/auth/SignIn";
import { AuthContext } from "./Store/AuthContext";
import Settings from "./scenes/settings";

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { loggedIn } = useContext(AuthContext);
  const isSignIn = location.pathname === "/SignIn";

  useEffect(() => {
    if (!loggedIn && location.pathname !== "/SignIn") {
      navigate("/SignIn");
    } else if (loggedIn && location.pathname === "/SignIn") {
      navigate("/");
    }
  }, [loggedIn, location.pathname, navigate]);

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          {!isSignIn && <Sidebar isSidebar={isSidebar} />}
          <main className="content">
            {!isSignIn && <Topbar setIsSidebar={setIsSidebar} />}
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/SignIn" element={<SignIn />} />
              <Route path="/users" element={<Contacts />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/settings" element={<Settings />} />
              {/* <Route path="/invoices" element={<Invoices />} /> */}
              <Route path="/create" element={<Form />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;