import { FC } from 'react';
import './App.css';
import Home from './pages/Home';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import Details from './components/Details/Details';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Home />}>
      <Route path="details/:id" element={<Details />} />
    </Route>
  )
);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
