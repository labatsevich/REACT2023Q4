import { Link, Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/';

export default function Layout() {
  return (
    <ErrorBoundary>
      <header>
        <Link to="/">Home</Link>
        <Link to="uncontrolled">Uncontrolled</Link>
        <Link to="react-hook-form">React Hook Form</Link>
      </header>
      <main>
        <Outlet />
      </main>
    </ErrorBoundary>
  );
}
