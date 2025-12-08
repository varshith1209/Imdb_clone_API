import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'sonner';
import { TooltipProvider } from './components/ui/tooltip.jsx';

import AppLayout from './layout/AppLayout.jsx';
import ProtectedRoute from './layout/ProtectedRoute.jsx';

import Landing from './pages/Home/Landing.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import Watchlist from './pages/Watchlist/List.jsx';
import Detail from './pages/Watchlist/Detail.jsx';
import Reviews from './pages/Watchlist/Reviews.jsx';

import ScrollToTop from './ScrollToTop.jsx'; // ✅ IMPORTANT


function App() {
  return (
    <TooltipProvider delayDuration={200}>
      <BrowserRouter>
        <ScrollToTop />  {/* ✅ Fixes page loading at bottom */}
        
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Landing />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />

            <Route element={<ProtectedRoute />}>
              <Route path="watchlist" element={<Watchlist />} />
              <Route path="watchlist/:id" element={<Detail />} />
              <Route path="watchlist/:id/reviews" element={<Reviews />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>

      <Toaster richColors position="top-right" />
    </TooltipProvider>
  );
}

export default App;
