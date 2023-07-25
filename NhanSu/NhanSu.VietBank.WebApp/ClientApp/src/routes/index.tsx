import {BrowserRouter, Route, Routes as RouterRoutes} from 'react-router-dom';
import MainPage from '../pages/main-page';

export default function Routes() {
  return (
    <BrowserRouter>
      <RouterRoutes>
        <Route path="/" element={<MainPage />}></Route>
      </RouterRoutes>
    </BrowserRouter>
  );
}
