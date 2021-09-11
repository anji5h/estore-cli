import React from "react";
import AppRoute from "./AppRoute";
import AuthProvider from "./AuthProvider";
import ToastMessage from "./components/ToastMessage";

export default function App() {
  return (
    <AuthProvider>
      <ToastMessage />
      <AppRoute />
    </AuthProvider>
  );
}
