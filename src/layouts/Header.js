import React from "react";
import { Link } from "react-router-dom";

const Header = ({ navigationLinks }) => {
    return (
        <header className="bg-blue-600 p-4">
            <nav className="max-w-7xl">
                <ul className="flex space-x-4">
                    {navigationLinks.map(({ to, label }) => (
                        <li key={to}>
                            <Link
                                to={to}
                                className="text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-blue-700"
                            >
                                {label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
};

export default Header;
