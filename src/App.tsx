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
import { Provider } from 'react-redux';
import { setupStore } from './store';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Main />} />
      <Route path="uncontrolled" element={<UncontrolledPage />} />
      <Route path="react-hook-form" element={<HookFormPage />} />
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
