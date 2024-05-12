import { Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Layout = () => {
  return (
    <div style={{ maxWidth: '1920px', width: '100%', margin: '0 auto', padding: '20px' }}>
      <header
        style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '20px',
          margin: '0 auto'
        }}
      >
        <NavLink to="/">Embedded dashboard</NavLink>
        <NavLink to="/api-dashboard">API dashboard</NavLink>
      </header>

      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  );
};
