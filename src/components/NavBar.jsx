import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const item = {
  hidden: {
    x: 100,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
};

const NavBarLink = ({ name, path, variants }) => {
  const { pathname } = useLocation();

  return (
    <Link to={`${path}`}>
      <motion.li
        variants={variants}
        className={`${
          pathname === path ? 'font-black' : 'opacity-80'
        } uppercase`}>
        {name}
      </motion.li>
    </Link>
  );
};

const NavBar = () => {
  const { pathname } = useLocation();

  return (
    <motion.div
      style={{
        display: pathname === '/' ? 'none' : '',
      }}
      initial={{ paddingTop: `${window.innerHeight}px` }}
      animate={{
        paddingTop: '20px',
        transition: { duration: 1, delay: 1, ease: 'easeInOut' },
      }}
      exit={{ paddingTop: `${window.innerHeight}px` }}
      className="block bg-dark text-light w-full py-5">
      {pathname === '/realtime' ? (
        <ul className="flex justify-center align-middle items-center gap-10">
          <NavBarLink variants={item} name="←" path="/" />
          <NavBarLink variants={item} name="Live-режим" path="/realtime" />
        </ul>
      ) : (
        <ul className="flex justify-center align-middle items-center gap-10">
          <NavBarLink variants={item} name="←" path="/" />
          <NavBarLink variants={item} name="По изображению" path="/file" />
        </ul>
      )}
    </motion.div>
  );
};

export default NavBar;
