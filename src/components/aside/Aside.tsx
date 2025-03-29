import { useState, useEffect } from "react";
import cl from "./Aside.module.scss";

import iconHome from "../../assets/icons/Path 358.svg";
import iconDashboard from "../../assets/icons/Path 358.svg";
import iconInbox from "../../assets/icons/Path 358.svg";
import iconProducts from "../../assets/icons/Path 358.svg";
import iconInvoices from "../../assets/icons/Path 358.svg";
import iconCustomers from "../../assets/icons/Path 358.svg";
import iconChat from "../../assets/icons/Path 358.svg";
import iconCalendar from "../../assets/icons/Path 358.svg";
import iconHelp from "../../assets/icons/Path 358.svg";
import iconSettings from "../../assets/icons/Path 358.svg";

function Aside() {
    const [currentHash, setCurrentHash] = useState(window.location.hash);

    useEffect(() => {
        const onHashChange = () => {
            setCurrentHash(window.location.hash);
        };
        window.addEventListener("hashchange", onHashChange);
        return () => {
            window.removeEventListener("hashchange", onHashChange);
        };
    }, []);

    return (
        <aside className={cl.aside}>
            <span className={cl.aside__logo}>IMPEKABLE</span>
            <nav>
                <ul className={cl.aside__navList}>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "" ||
                            currentHash === "#/" ||
                            currentHash === "#/home"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/home" className={cl.aside__navLink}>
                            <img
                                src={iconHome}
                                alt="Home"
                                className={cl.aside__icon}
                            />
                            <span>Home</span>
                        </a>
                    </li>

                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/dashboard"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/dashboard" className={cl.aside__navLink}>
                            <img
                                src={iconDashboard}
                                alt="Dashboard"
                                className={cl.aside__icon}
                            />
                            <span>Dashboard</span>
                        </a>
                    </li>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/inbox"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/inbox" className={cl.aside__navLink}>
                            <img
                                src={iconInbox}
                                alt="Inbox"
                                className={cl.aside__icon}
                            />
                            <span>Inbox</span>
                        </a>
                    </li>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/products"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/products" className={cl.aside__navLink}>
                            <img
                                src={iconProducts}
                                alt="Products"
                                className={cl.aside__icon}
                            />
                            <span>Products</span>
                        </a>
                    </li>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/invoices"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/invoices" className={cl.aside__navLink}>
                            <img
                                src={iconInvoices}
                                alt="Invoices"
                                className={cl.aside__icon}
                            />
                            <span>Invoices</span>
                        </a>
                    </li>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/customers"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/customers" className={cl.aside__navLink}>
                            <img
                                src={iconCustomers}
                                alt="Customers"
                                className={cl.aside__icon}
                            />
                            <span>Customers</span>
                        </a>
                    </li>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/chat"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/chat" className={cl.aside__navLink}>
                            <img
                                src={iconChat}
                                alt="Chat Room"
                                className={cl.aside__icon}
                            />
                            <span>Chat Room</span>
                        </a>
                    </li>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/calendar"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/calendar" className={cl.aside__navLink}>
                            <img
                                src={iconCalendar}
                                alt="Calendar"
                                className={cl.aside__icon}
                            />
                            <span>Calendar</span>
                        </a>
                    </li>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/help"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/help" className={cl.aside__navLink}>
                            <img
                                src={iconHelp}
                                alt="Help Center"
                                className={cl.aside__icon}
                            />
                            <span>Help Center</span>
                        </a>
                    </li>
                    <li
                        className={`${cl.aside__navItem} ${
                            currentHash === "#/settings"
                                ? cl.aside__navItemActive
                                : ""
                        }`}
                    >
                        <a href="#/settings" className={cl.aside__navLink}>
                            <img
                                src={iconSettings}
                                alt="Settings"
                                className={cl.aside__icon}
                            />
                            <span>Settings</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </aside>
    );
}

export default Aside;
