import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppLayout from "./ui_components/AppLayout";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import { useQuery } from "@tanstack/react-query";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import CreatePostPage from "./pages/CreatePostPage";
import LoginPage from "./pages/LoginPage";
import ProtectedRoute from "./ui_components/ProtectedRoute";
import { getUsername } from "./services/apiBlog";
import ProfilePage from "./pages/ProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

const App = () => {
  const [username, setUsername] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const { data } = useQuery({
    queryKey: ["username"],
    queryFn: getUsername,
  });

  useEffect(
    function () {
      if (data) {
        setUsername(data.username);
        setIsAuthenticated(true);
      }
    },
    [data]
  );

  return (
    <BrowserRouter>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#363636",
            color: "#fff",
          },
        }}
      />
      <Routes>
        <Route
          path="/"
          element={
            <AppLayout
              isAuthenticated={isAuthenticated}
              username={username}
              setUsername={setUsername}
              setIsAuthenticated={setIsAuthenticated}
            />
          }
        >
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
          <Route path="profile/:username" element={<ProfilePage authUsername={username} />} />
          <Route
            path="blogs/:slug"
            element={<DetailPage username={username} isAuthenticated={isAuthenticated} />}
          />
          <Route path="signup" element={<SignUpPage />} />
          <Route
            path="signin"
            element={
              <LoginPage
                setIsAuthenticated={setIsAuthenticated}
                setUsername={setUsername}
              />
            }
          />
          <Route
            path="create"
            element={
              <ProtectedRoute>
                <CreatePostPage isAuthenticated={isAuthenticated}/>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
