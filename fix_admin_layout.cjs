const fs = require('fs');
const file = 'src/components/admin/AdminLayout.jsx';
let content = fs.readFileSync(file, 'utf8');

// Import Outlet
if (!content.includes('Outlet')) {
  content = content.replace(
    import React from 'react';,
    import React from 'react';\nimport { Outlet, useNavigate } from 'react-router-dom';
  );
}

// Ensure useNavigate is present (sometimes it was removed in previous bad replaces)
if (!content.includes('const navigate = useNavigate();')) {
  content = content.replace(
    export const AdminLayout = ({ children }) => {,
    export const AdminLayout = () => {\n  const navigate = useNavigate();
  );
} else {
  content = content.replace(
    export const AdminLayout = ({ children }) => {,
    export const AdminLayout = () => {
  );
}

// Replace {children} with <Outlet />
content = content.replace('{children}', '<Outlet />');

// Replace navigateTo with navigate
content = content.replace(/navigateTo\('admin-dashboard'\)/g, "navigate('/admin')");
content = content.replace(/navigateTo\('admin-bookings'\)/g, "navigate('/admin/bookings')");
content = content.replace(/navigateTo\('admin-packages'\)/g, "navigate('/admin/packages')");
content = content.replace(/navigateTo\('admin-members'\)/g, "navigate('/admin/members')");
content = content.replace(/navigateTo\('admin-payouts'\)/g, "navigate('/admin/payouts')");
content = content.replace(/navigateTo\('admin-audit'\)/g, "navigate('/admin/audit')");
content = content.replace(/navigateTo\((.*?)\)/g, "navigate('/admin/' + .replace('admin-', ''))");

// Fix currentView checking logic
content = content.replace(/currentView === item.view/g, "window.location.pathname.includes(item.view.replace('admin-', '')) || (item.view === 'admin-dashboard' && window.location.pathname === '/admin')");

fs.writeFileSync(file, content, 'utf8');
