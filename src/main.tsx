import Application from '@/components/Application';
import '@/styles/globals.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Application />
    </StrictMode>
);
