import { Routes, Route } from 'react-router-dom';
import { Home } from './views/home';
import { Test } from './views/test';

export
function RouteView() {
  return <Routes>
    <Route path="" element={<Home />} />
    <Route path="test" element={<Test />} />
  </Routes>;
}
