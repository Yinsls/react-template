import React from 'react';
import Router from '@/router/index';
import { BrowserRouter, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
    // <>
    //   <div>App</div>
    //   <Outlet />
    // </>
  );
}

export default App;
