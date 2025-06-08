import { Link, useLocation } from "react-router-dom";

function Menu() {
    const location = useLocation();
    return (
        <nav className="navbar navbar-expand navbar-dark bg-primary mb-4">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">MyApp</Link>
                <div className="navbar-nav">
                    <Link className={`nav-link${location.pathname === "/" ? " active" : ""}`} to="/">ホーム</Link>
                    <Link className={`nav-link${location.pathname === "/employees" ? " active" : ""}`} to="/employees">従業員一覧</Link>
                </div>
            </div>
        </nav>
    );
}

export default Menu;