import { AuthProvider } from "@/Context/AuthContext";
import { Outlet } from "react-router-dom";

// This component's only job is to provide the AuthContext to its children.
// Because this component is rendered by the router, AuthProvider can now
// safely use navigation hooks like useNavigate.
export default function AuthLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
