import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Dashboard from "./Pages/Dashboard";
import SignIn from "./Pages/SignIn";
import SignUp from "./Pages/SignUp";
import MonthlyReport from "./Pages/MonthlyReport.jsx";
import CategoryMaster from "./Pages/CategoryMaster";
import CategoryItemMaster from "./Pages/CategoryItemMaster";
import Master from "./Pages/Master.jsx";
import Appointments from "./Pages/Appoinments.jsx";
import Services from "./Pages/Service.jsx";
import Agent from "./Pages/Agent.jsx";
import ShopSettingsPage from "./Pages/ShopSettings.jsx";
import  TimeSlots from "./Pages/TimeSlots.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename="/salon-admin">
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/appoinments" element={<Appointments />} />
        <Route path="/monthly-report" element={<MonthlyReport />} />
        <Route path="/master" element={<Master />} />
        <Route path="/category-master" element={<CategoryMaster />} />
        <Route path="/category-item-master" element={<CategoryItemMaster />} />
        <Route path="/services" element={<Services/>} />
        <Route path="/agents" element={<Agent/>} />
        <Route path="/shop-settings" element={<ShopSettingsPage/>} />
        <Route path="/time-slots" element={<TimeSlots/>} />
      </Route>
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
