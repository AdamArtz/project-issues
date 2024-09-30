import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
    const { user } = useAuth();

    return (
        <nav>
            <a href="/vacations">Vacations</a>
            {user?.role === 'admin' && <a href="/admin">Admin Panel</a>}
        </nav>
    );
};