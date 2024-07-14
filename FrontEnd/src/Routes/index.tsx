
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Todo from '../Components/home/Todo';
import RouteLayout from '../pages/Layouts';
import SidbarLayout from '../pages/Home'
import Index from '../Components/home/Compeleted';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RouteLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>

      <Route path="home" element={<SidbarLayout />}>
          <Route index element={<Todo />} />
          <Route path="index" element={<Index />} />

        </Route>
    </>
  )
);

export default router;
