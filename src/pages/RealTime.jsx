import { useState } from 'react';
import { data } from '../mock';
import Layout from './Layout';
import { motion } from 'framer-motion';
import CVwebcam from '../components/CVwebcam';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../store/features/mode';

const ModeBtn = ({ name, mode }) => {
  const dispatch = useDispatch();
  return (
    <button
      onClick={() => dispatch(setMode(mode))}
      className="py-1 px-5 bg-dark text-light rounded-full hover:bg-light hover:text-dark border-2 border-transparent  hover:border-dark transition-all ">
      {name}
    </button>
  );
};

const RealTime = () => {
  const { mode } = useSelector((state) => state.mode);

  return (
    <Layout>
      <div className="">
        <div className="flex flex-wrap justify-between items-center my-5 gap-4">
          <span>
            Модель:&nbsp;<b className="uppercase">{mode}</b>
          </span>
          <div className="flex gap-3">
            <ModeBtn name="NANO (точность 95%)" mode="nano" />
            <ModeBtn name="SMALL (точность 98%)" mode="small" />
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
          }}
          exit={{ opacity: 0 }}
          className="relative overflow-y-auto">
          <CVwebcam />
        </motion.div>
      </div>
    </Layout>
  );
};
export default RealTime;
