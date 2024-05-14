import React from "react";
import ReactDOM from "react-dom/client";
import Application from "@/components/Application";
import "@/styles/globals.css";
import "@/styles/typography.css";
import "bootstrap-icons/font/bootstrap-icons.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Application />
    </React.StrictMode>
);
