import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import Button from './Button';
import PageHome from '../pages/Home';
import PageFourohfour from '../pages/Fourohfour';
import PageImageProc from '../pages/ImageProc';
import PageUid from '../pages/Uid';
import PageComponents from '../pages/Components';
import PageProject from '../pages/ProjectFiles';
import CompButton from '../pages/Components/Button';
import CompAccordian from '../pages/Components/Accordian';
import CompGroup from '../pages/Components/Group';

export default function Application() {
    return (
        <HashRouter>
            <header className="flex flex-row bg-blue-900 text-white p-1 border-b border-black">
                <Link to="/" className="flex flex-row items-center mr-2 border border-white rounded-md px-1">
                    <div className="bi-tools mr-2" />
                    <div className="">jTools</div>
                </Link>
                <nav className="flex flex-row flex-grow space-x-2">
                    <Button to="/image" as={Link} color="white">Image Processor</Button>
                    <Button to="/uid" as={Link} color="white">UUID/ULID Gen</Button>
                    <Button to="/comp" as={Link} color="white">Components</Button>
                    <Button to="/project" as={Link} color="white">Project Files</Button>
                </nav>
            </header>
            <main className="flex flex-col flex-grow">
                <Routes>
                    <Route path="/" element={<PageHome />} />
                    <Route path="/image" element={<PageImageProc />} />
                    <Route path="/uid" element={<PageUid />} />
                    <Route path="/comp" element={<PageComponents />}>
                        <Route index element={<CompButton />} />
                        <Route path="button" element={<CompButton />} />
                        <Route path="accordian" element={<CompAccordian />} />
                        <Route path="group" element={<CompGroup />} />
                    </Route>
                    <Route path="/project" element={<PageProject />}></Route>
                    <Route path="*" element={<PageFourohfour />} />
                </Routes>
            </main>
        </HashRouter>
    );
}