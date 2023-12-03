import { FC } from 'react';
import { useAppSelector } from '../hooks';

const Main: FC = () => {
  const { items } = useAppSelector((state) => state.app);

  return (
    <section className="profiles">
      {items &&
        items.map((item) => (
          <div className="profile__item" key={item.email}>
            <img src={item.avatar as string} alt={item.name} />
            <p>
              <b>Name:</b>
              {item.name}
            </p>
            <p>
              <b>Age:</b>
              {item.age}
            </p>
            <p>
              <b>Email:</b>
              {item.email}
            </p>
            <p>
              <b>Gender:</b>
              {item.gender}
            </p>
            <p>
              <b>Country:</b>
              {item.country}
            </p>
          </div>
        ))}
    </section>
  );
};

export default Main;
