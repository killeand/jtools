import Cryptog from '@/pages/Cryptog';
import Faker from '@/pages/Faker';
import Fourohfour from '@/pages/Fourohfour';
import Home from '@/pages/Home';
import ImageProc from '@/pages/ImageProc';
import Jwt from '@/pages/Jwt';
import Random from '@/pages/Random';
import SVGResizer from '@/pages/SVGResizer';
import Uid from '@/pages/Uid';
import { Logo128 } from '@/scripts/JToolsLogo';
import { useId } from 'react';
import { HashRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import ThemeChanger from './ThemeChanger';

const ProjectStructure: Array<{ n: string; u: string; p: string; c: React.ReactNode }> = [
    { n: 'Home', u: '/', p: '/', c: <Home /> },
    { n: 'ImageProc', u: '/imageproc', p: 'imageproc', c: <ImageProc /> },
    { n: 'SVGResizer', u: '/svgresizer', p: 'svgresizer', c: <SVGResizer /> },
    { n: 'UID', u: '/uid', p: 'uid', c: <Uid /> },
    { n: 'Random', u: '/random', p: 'random', c: <Random /> },
    { n: 'Faker', u: '/faker', p: 'faker', c: <Faker /> },
    { n: 'Crypto', u: '/crypto', p: 'crypto', c: <Cryptog /> },
    { n: 'JWT', u: '/jwt', p: 'jwt', c: <Jwt /> },
];

export default function Application() {
    const ddMenuId = useId();
    const pMenuId = useId();
    const routeId = useId();

    return (
        <HashRouter>
            <header className='sticky top-0 z-10 navbar bg-primary text-primary-content drop-shadow-md'>
                <div className='navbar-start w-full gap-2 md:w-1/2'>
                    <nav className='dropdown md:hidden'>
                        <button tabIndex={0} role='button' className='bi-list btn px-1 text-3xl btn-sm btn-ghost md:hidden' />
                        <ul tabIndex={0} className='dropdown-content menu z-20 menu-sm rounded-tr-box rounded-bl-box border border-primary bg-base-100 text-base-content shadow'>
                            {ProjectStructure.map((item) => (
                                <li key={ddMenuId + item.n}>
                                    <Link to={item.u} className='text-lg font-bold'>
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
                    <ul tabIndex={0} className='menu menu-horizontal z-20 m-0 menu-sm'>
                        {ProjectStructure.map((item) => (
                            <li key={pMenuId + item.n}>
                                <Link to={item.u} className='text-lg font-bold uppercase'>
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
            <main className='relative flex flex-grow flex-col p-1 md:p-2'>
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
