import { Suspense, useState } from "react";
import { HashRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import { SiteStructure } from "./SiteStructure";
import { Logo128 } from "@/scripts/JToolsLogo";
import RouteFlags from "@/scripts/RouteFlags";
import Fourohfour from "@/pages/Fourohfour";

const RenderMenu = (child) => {
    return child.map((item, index) => {
        const f = RouteFlags.TestAll(item.flags);
        const user = { admin: true };
        const loggedIn = user != null && f.isAuthed;
        const admin = user != null ? user.admin && f.isAdmin : false;

        if (f.isHidden) return null;

        if (f.isAlways || loggedIn || (user == null && !f.isAuthed) || admin) {
            return (
                <li key={`MENU-${item.path}`}>
                    {!f.isExternal && (
                        <Link to={item.url} className={`${item.icon ?? ""}`}>
                            {item.name}
                        </Link>
                    )}
                    {f.isExternal && (
                        <a href={item.url} className={`${item.icon ?? ""}`}>
                            {item.name}
                        </a>
                    )}
                    {item.children && <ul>{RenderMenu(item.children)}</ul>}
                </li>
            );
        }
    });
};

export default function Application() {
    const [showMenu, setShowMenu] = useState(false);

    return (
        <HashRouter>
            <header className="flex flex-col bg-primary p-2 text-primary-content">
                <Link to="/" className="flex flex-row items-center gap-2 no-underline">
                    <button className="bi-list btn btn-ghost block text-2xl md:hidden" onClick={() => setShowMenu(!showMenu)} />
                    <img alt="jTools Logo" src={Logo128} className="max-w-8 md:max-w-10" />
                    <div className="title_1">jTools</div>
                </Link>
                <nav className={`${showMenu ? "flex" : "hidden md:flex"} flex-grow`}>
                    <ul tabIndex={0} className="menu menu-vertical menu-sm m-0 w-full font-bold uppercase">
                        {RenderMenu(SiteStructure)}
                    </ul>
                </nav>
                <label className="swap swap-rotate">
                    <input type="checkbox" className="theme-controller" value="dark" />
                    <div className="bi-sun-fill swap-off fill-current text-2xl" />
                    <div className="bi-moon-stars-fill swap-on fill-current text-2xl" />
                </label>
            </header>
            <main className="flex flex-grow flex-col p-1 md:p-2">
                <Routes>
                    {SiteStructure.map((item) => {
                        let addIndex = RouteFlags.Has(item.flags, RouteFlags.Index) ? { index: true } : {};

                        return (
                            <Route key={`ROUTE-${item.path}`} {...addIndex} path={item.path} element={<Suspense fallback={<p>Loading...</p>}>{item.component}</Suspense>}>
                                {item.children &&
                                    item.children.map((subItem) => {
                                        let addSubIndex = RouteFlags.Has(subItem.flags, RouteFlags.Index) ? { index: true } : {};

                                        return <Route key={`SUBROUTE-${subItem.path}`} {...addSubIndex} path={subItem.path} element={<Suspense fallback={<p>Loading...</p>}>{subItem.component}</Suspense>} />;
                                    })}
                            </Route>
                        );
                    })}
                    <Route path="/404" element={<Fourohfour />} />
                    <Route path="*" element={<Navigate to="/404" />} />
                </Routes>
            </main>
        </HashRouter>
    );
}
