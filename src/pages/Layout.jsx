import React from 'react';
import TransitionEffect from '../components/TransitionEffect';

const Layout = ({ children }) => {
  return (
    <TransitionEffect>
      <div className="flex sm:justify-center sm:align-middle sm:items-center">
        {children}
      </div>
    </TransitionEffect>
  );
};

export default Layout;
