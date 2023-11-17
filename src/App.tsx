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
import NotFound from './pages/NotFound';
import Layout from './pages/Layout';
import { Provider } from 'react-redux';
import { setupStore } from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Home />}>
        <Route path="details/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

const App: FC = () => {
  return (
    <Provider store={setupStore()}>
      <RouterProvider router={router} />
    </Provider>
  );
};

export default App;
