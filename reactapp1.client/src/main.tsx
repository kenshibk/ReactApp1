import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from './App';
import Menu from './Menu';
import EmployeeList from './EmployeeList'; // 従業員一覧コンポーネント
import './index.css';

function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Menu />
            <div>{children}</div>
        </>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/employees" element={<EmployeeList />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    </React.StrictMode>
);