import { FC } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Main: FC = () => {
  return (
    <>
      <header>
        <Link to="uncontrolled">Uncontrolled</Link>
        <Link to="react-hook-form">React Hook Form</Link>
      </header>
      <Outlet />
    </>
  );
};

export default Main;
