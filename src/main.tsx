import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navigator from "./Navigator";
import Watches from "./watches/Watches";
import Crud from "./crud/Crud";
import "./index.css";


createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Navigator />} />
                <Route path="/watches" element={<Watches />} />
                <Route path="/crud" element={<Crud />} />
            </Routes>
        </BrowserRouter>
    </StrictMode>,
)
