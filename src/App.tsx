import { FC } from 'react';

import './App.css';
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';
import UncontrolledPage from './pages/UncontrolledPage';
import HookFormPage from './pages/HookFormPage';
import Main from './pages/Main';
import Layout from './pages/Layout';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<Layout />}>
      <Route path="/" element={<Main />}>
        <Route path="uncontrolled" element={<UncontrolledPage />} />
        <Route path="react-hook-form" element={<HookFormPage />} />
      </Route>
    </Route>
  )
);

const App: FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
