import Fourohfour from '@/pages/Fourohfour';
import Home from '@/pages/Home';
import ImageProc from '@/pages/ImageProc';
import Random from '@/pages/Random';
import Uid from '@/pages/Uid';
import { Logo128 } from '@/scripts/JToolsLogo';
import { useId } from 'react';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import ThemeChanger from './ThemeChanger';

const ProjectStructure: Array<{ n: string; u: string; p: string; c: React.ReactNode }> = [
    { n: 'Home', u: '/', p: '/', c: <Home /> },
    { n: 'ImageProc', u: '/imageproc', p: 'imageproc', c: <ImageProc /> },
    { n: 'IDGen', u: '/idgen', p: 'idgen', c: <Uid /> },
    { n: 'Random', u: '/random', p: 'random', c: <Random /> },
];

export default function Application() {
    const ddMenuId = useId();
    const pMenuId = useId();
    const routeId = useId();

    return (
        <HashRouter>
            <header className='navbar sticky top-0 z-10 bg-primary text-primary-content drop-shadow-md'>
                <div className='navbar-start w-full gap-2 md:w-1/2'>
                    <nav className='dropdown md:hidden'>
                        <button tabIndex={0} role='button' className='bi-list btn btn-ghost btn-sm px-1 text-3xl md:hidden' />
                        <ul tabIndex={0} className='menu dropdown-content menu-sm z-20 rounded-bl-box rounded-tr-box border border-primary bg-base-100 text-base-content shadow'>
                            {ProjectStructure.map((item) => (
                                <li key={ddMenuId + item.n}>
                                    <Link to={item.u} className='font-bold text-lg'>
                                        {item.n}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <Link to='/' className='flex flex-row items-center gap-2 no-underline'>
                        <img alt='jTools Logo' src={Logo128} className='max-w-8 md:max-w-10' />
                        <div className='title_1'>jTools</div>
                    </Link>
                </div>
                <nav className='navbar-center hidden md:flex'>
                    <ul tabIndex={0} className='menu menu-horizontal menu-sm z-20 m-0'>
                        {ProjectStructure.map((item) => (
                            <li key={pMenuId + item.n}>
                                <Link to={item.u} className='font-bold text-lg uppercase'>
                                    {item.n}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
                <div className='navbar-end md:gap-2'>
                    <ThemeChanger />
                </div>
            </header>
            <main className='flex flex-grow flex-col p-1 md:p-2'>
                <Routes>
                    {ProjectStructure.map((item) => (
                        <Route key={routeId + item.n} path={item.p} element={item.c} />
                    ))}
                    <Route path='/404' element={<Fourohfour />} />
                    <Route path='*' element={<Navigate to='/404' />} />
                </Routes>
            </main>
        </HashRouter>
    );
}
