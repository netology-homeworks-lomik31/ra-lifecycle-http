import { Link } from "react-router-dom";

import "./Navigator.css";

function Navigator() {
    return (
        <div className="navigator">
            <Link to="/watches">watches</Link>
            <Link to="/crud">crud</Link>
        </div>
    );
}

export default Navigator;