import { FC } from 'react';
import { NavLink } from 'react-router-dom';

const NotFound: FC = () => {
  return (
    <section>
      <div className="message warning">
        <span className="code">404</span>
        <span className="text">Not found</span>
        <NavLink to="/">&larr;&nbsp;Home</NavLink>
      </div>
    </section>
  );
};

export default NotFound;
