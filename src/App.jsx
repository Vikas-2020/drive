import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router";
import First from "./pages/First";
import Login from "./pages/login";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import AuthListener from "./components/AuthListner";

const router = createBrowserRouter([
  {
    path: "/",
    element: <First />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/login",
        element: <Login />,
      },
    ],
  },
]);

export default function App() {
  return (
    <AuthListener>
      <RouterProvider router={router} />
    </AuthListener>
  );
}
