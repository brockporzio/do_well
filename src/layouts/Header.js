import React from "react";
import { Link } from "react-router-dom";

const Header = ({ navigationLinks }) => {
    return (
        <header>
            <nav>
                <ul>
                {navigationLinks.map(({ to, label }) => (
                    <li key={to}>
                        <Link to={to}>{label}</Link>
                    </li>
                ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
