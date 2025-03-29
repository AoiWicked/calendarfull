import cl from "./Header.module.scss";

import iconHelp from "../../assets/icons/Support Iocn.svg";
import arrow from "../../assets/icons/arrow (2).svg";
import iconNotification from "../../assets/icons/Support Iocn.svg";
import iconSearch from "../../assets/icons/icon_search.svg";
import avatarImg from "../../assets/Avatar@2x.png";

function Header() {
    return (
        <header className={cl.header}>
            <div className={cl.header__search}>
                <img
                    src={iconSearch}
                    alt="Notifications"
                    className={cl.header__icon}
                />
                <input
                    type="text"
                    className={cl.header__searchInput}
                    placeholder="Search transactions, invoices or help"
                />
            </div>

            <div className={cl.header__actions}>
                <div className={cl.header__icons}>
                    <img
                        src={iconHelp}
                        alt="Help"
                        className={cl.header__icon}
                    />

                    <img
                        src={iconNotification}
                        alt="Notifications"
                        className={cl.header__icon}
                    />

                    <img
                        src={iconNotification}
                        alt="Notifications"
                        className={cl.header__icon}
                    />
                </div>

                <div className={cl.header__slash} />

                <div className={cl.header__profile}>
                    <span className={cl.header__username}>John Doe</span>

                    <img
                        src={arrow}
                        alt="Notifications"
                        className={cl.header__arrow}
                    />

                    <img
                        src={avatarImg}
                        alt="Avatar"
                        className={cl.header__avatar}
                    />
                </div>
            </div>
        </header>
    );
}

export default Header;
