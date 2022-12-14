import { Link, Outlet } from 'react-router-dom';
import Button from '../components/Button';

export default function PageComponents() {
    return (
        <div className="flex flex-row flex-grow">
            <aside>
                <Button to="button" as={Link} className="text-sm text-black" color="white">Button</Button>
                <Button to="accordian" as={Link} className="text-sm text-black" color="white">Accordian</Button>
            </aside>
            <div className="flex-grow">
                <Outlet />
            </div>
        </div>
    );
}