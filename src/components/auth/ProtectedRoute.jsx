import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useWanderlust } from '../../context/WanderlustContext';

export const ProtectedRoute = ({ requireAdmin = false, children }) => {
  const { isLoggedIn, authLoading } = useWanderlust();
  const token = localStorage.getItem('auth_token');
  
  if (authLoading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-[#C9A455] border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-[#C9A455] font-mono text-xs uppercase tracking-widest font-bold">Verifying Access...</p>
      </div>
    );
  }

  // Check token directly to avoid flash of redirect before context syncs
  if (!isLoggedIn && !token) {
    return <Navigate to="/login" replace />;
  }

  // Optional: Check role if we had a clear role property in useWanderlust
  const userStr = localStorage.getItem('user');
  if (requireAdmin && userStr) {
    try {
      const user = JSON.parse(userStr);
      if (user.role !== 'ADMIN') {
        return <Navigate to="/member" replace />;
      }
    } catch {
      // Ignore
    }
  }

  return children ? children : <Outlet />;
};
