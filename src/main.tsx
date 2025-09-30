import { enableMapSet } from "immer";
enableMapSet();
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { RouteErrorBoundary } from '@/components/RouteErrorBoundary';
import '@/index.css';
// Public pages
import { HomePage } from '@/pages/HomePage';
import { LoginPage } from '@/pages/auth/LoginPage';
import { SignupPage } from '@/pages/auth/SignupPage';
// Authenticated app layout and pages
import { AppLayout } from '@/components/layout/AppLayout';
import { DashboardPage } from '@/pages/app/DashboardPage';
import { PropertiesPage } from '@/pages/app/PropertiesPage';
import { PropertyDetailPage } from '@/pages/app/PropertyDetailPage';
import { TenantsPage } from '@/pages/app/TenantsPage';
import { TenantDetailPage } from '@/pages/app/TenantDetailPage';
import { BillsPage } from '@/pages/app/BillsPage';
import { FinancialsPage } from '@/pages/app/FinancialsPage';
import { MaintenancePage } from '@/pages/app/MaintenancePage';
import { SettingsPage } from '@/pages/app/SettingsPage';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <RouteErrorBoundary />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/app",
    element: <AppLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/app/dashboard" replace /> },
      { path: "dashboard", element: <DashboardPage /> },
      { path: "properties", element: <PropertiesPage /> },
      { path: "properties/:propertyId", element: <PropertyDetailPage /> },
      { path: "tenants", element: <TenantsPage /> },
      { path: "tenants/:tenantId", element: <TenantDetailPage /> },
      { path: "financials", element: <FinancialsPage /> },
      { path: "maintenance", element: <MaintenancePage /> },
      { path: "settings", element: <SettingsPage /> },
      { path: "bills", element: <BillsPage /> },
    ],
  },
]);
// Do not touch this code
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </StrictMode>,
);