import React from "react";
import { ThemeProvider } from "./theme/ThemeProvider";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import ScrollToTop from "./components/scrolltotop";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Syllabus from "./pages/Syllabus";
import Notes from "./pages/Notes";
import PYQs from "./pages/PYQs";
import Feedback from "./pages/Feedback";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Contact from "./pages/Contact";
import Analytics from "./pages/Analytics";
import Faq from "./pages/Faq";
import Contribute from "./pages/Contribute";
import MindMapEditor from "./pages/MindMapEditor";
import Profile from "./pages/Profile";
import SubmitFeedback from "./pages/SubmitFeedback";
import Todo from "./pages/Todo";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";

const PageLayout = ({ children }) => (
  <div style={{ padding: "2rem" }}>
    {children}
  </div>
);

const ProtectedPage = ({ children }) => (
  <ProtectedRoute>
    <PageLayout>{children}</PageLayout>
  </ProtectedRoute>
);

const protectedRoutes = [
  { path: "/tasks", element: <Todo /> },
  { path: "/syllabus", element: <Syllabus /> },
  { path: "/notes", element: <Notes /> },
  { path: "/pyqs", element: <PYQs /> },
  { path: "/analytics", element: <Analytics /> },
  { path: "/faq", element: <Faq /> },
  { path: "/feedback", element: <Feedback /> },
  { path: "/contribute", element: <Contribute /> },
  { path: "/mindmap", element: <MindMapEditor /> },
  { path: "/contact", element: <Contact /> },
  { path: "/profile", element: <Profile /> },
  { path: "/feedback/submit", element: <SubmitFeedback /> },
];

const App = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <NavbarWrapper />
          <ScrollToTop />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/privacy"
              element={
                <PageLayout>
                  <Privacy />
                </PageLayout>
              }
            />

            <Route
              path="/about"
              element={
                <PageLayout>
                  <About />
                </PageLayout>
              }
            />

            {protectedRoutes.map((route) => (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <ProtectedPage>
                    {route.element}
                  </ProtectedPage>
                }
              />
            ))}

            <Route path="*" element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
};

const NavbarWrapper = () => {
  const { pathname } = useLocation();

  const hiddenRoutes = ["/login", "/register"];

  if (hiddenRoutes.includes(pathname)) {
    return null;
  }

  return <Navbar />;
};

export default App;
