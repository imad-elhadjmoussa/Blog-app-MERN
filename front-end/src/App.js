import { Layout } from "./pages/Layout";
import "./sass/main.scss";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { CreatePoste } from "./pages/CreatePoste";
import { PostDetails } from "./pages/PostDetails";
import { EditPost } from "./pages/EditPost";
import { Profile } from "./pages/Profile";
import { ErrorProvider } from "./contexts/errorContext";
import { SuccessProvider } from "./contexts/successContext";
import { useAuth } from "./hooks/useAuth";

function App() {

  const { user } = useAuth();


  return (
    <main className="container">

      <ErrorProvider>
        <SuccessProvider>

          <Routes>
            <Route path="/" element={<Layout />}  >

              <Route path="/" element={<Home />} />
              <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
              <Route path="/register" element={!user ? <Register /> : <Navigate to="/" />} />
              <Route path="/create" element={user ? <CreatePoste /> : <Navigate to="/login" />} />
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/post/:id" element={<PostDetails />} />
              <Route path="/post/edit/:id" element={user ? <EditPost /> : <Navigate to="/login" />} />

            </Route>

            <Route path="*" element={user ? <Navigate to="/" /> : <Login />} />
          </Routes>

        </SuccessProvider>
      </ErrorProvider>
    </main>
  );
}

export default App;
