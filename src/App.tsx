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
import { AppContextProvider } from './context/AppContextProvider';
import NotFound from './pages/NotFound';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Home />}>
        <Route path="details/:id" element={<Details />} />
      </Route>
      <Route path="*" element={<NotFound />} />
    </>
  )
);

const App: FC = () => {
  return (
    <AppContextProvider>
      <RouterProvider router={router} />
    </AppContextProvider>
  );
};

export default App;
