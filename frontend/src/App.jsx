import {Navigate, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import NavBar from "./components/NavBar";
import {Toaster} from 'react-hot-toast';
import useUserStore from "./stores/useUserStore";
import { useEffect } from "react";
import AdminPage from "./pages/AdminPage";
import LoadingSpinner from "./components/LoadingSpinner"; 
import CategoryPage from "./pages/CategoryPage"
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage"
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";

function App() {
  const {user, checkAuth, checkingAuth} = useUserStore();

  const { getCartItems } = useCartStore(); 

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  	useEffect(() => {
		if (!user) return;

  		getCartItems();
	}, [getCartItems, user]);

  if(checkingAuth) return <LoadingSpinner />

  const isAdmin = user?.role === "admin";

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
<div className="absolute inset-0 h-screen w-full">
  <div className="absolute inset-0 w-full h-full bg-[radial-gradient(ellipse_at_top, rgba(16,185,129,0.3)_0%, rgba(10,80,60,0.2)_45%, rgba(0,0,0,0.1)_100%)]" />
</div>

      <div className="relative z-50 pt-20">
        <NavBar />
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <LoginPage /> : <Navigate to={isAdmin ? '/secret-dashboard' : '/'} />}
          />
          <Route path="/signup" element={!user ? <SignUpPage/> : <Navigate to='/'/>} />
          
          <Route
            path='/secret-dashboard'
            element={isAdmin ? <AdminPage /> : <Navigate to='/login' />}
          />
					<Route path='/category/:category' element={<CategoryPage />} />
          					<Route path='/cart' element={user ? <CartPage /> : <Navigate to='/login' />} />
          <Route path="*" element={<HomePage />} />

            <Route
						path='/purchase-success'
						element={user ? <PurchaseSuccessPage /> : <Navigate to='/PurchaseSuccessPage' />}
					/>
        </Routes>
      </div>

      <Toaster/>
    </div>
  );
}

export default App;