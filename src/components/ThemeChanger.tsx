'use client';
import { ChangeEvent, useEffect, useState } from 'react';

export default function ThemeChanger(): React.ReactNode {
    const [theme, setTheme] = useState(false);

    useEffect(() => {
        const ThemeValue = localStorage.getItem('JTOOLS-THEME');

        if (ThemeValue != null) if (ThemeValue === 'dark') setTheme(true);
    }, []);

    function HandleThemeChange(e: ChangeEvent<HTMLInputElement>): void {
        const value = e?.target?.checked;

        localStorage.setItem('JTOOLS-THEME', value ? 'dark' : 'light');
        setTheme(value);
    }

    return (
        <div className='tooltip tooltip-left' data-tip='Change Theme'>
            <label className='btn btn-ghost swap swap-rotate btn-sm px-1 text-xl'>
                <input type='checkbox' className='theme-controller' value='dark' checked={theme} onChange={HandleThemeChange} />
                <span className='bi-sun-fill swap-off' />
                <span className='bi-moon-stars-fill swap-on' />
            </label>
        </div>
    );
}
