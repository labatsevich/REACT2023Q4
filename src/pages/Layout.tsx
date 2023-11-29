import { Outlet } from 'react-router-dom';
import ErrorBoundary from '../components/ErrorBoundary/';

export default function Layout() {
  return (
    <ErrorBoundary>
      <Outlet />
    </ErrorBoundary>
  );
}
