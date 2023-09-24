import React from 'react';
import user from '../assets/User Info.svg';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { setMode } from '../store/features/mode';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.mode);

  const handleChange = (event) => {
    dispatch(setMode(event.target.value));
  };

  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{
        duration: 1,
        ease: 'easeInOut',
      }}>
      <div className="pt-9 px-1 sm:px-5 lg:px-24 ">
        <div className="w-full ">
          <div className="mb-7">
            <img className="max-w-[80%]" src={user} alt="" />
          </div>
          <div>
            <h1 className="text-[#612EF7] font-medium text-3xl mb-7">
              Помощник по распознаванию деталей
            </h1>
            <div className="bg-white py-12 px-4 sm:px-11 rounded-3xl shadow-block mb-14">
              <h1 className="text-2xl font-medium mb-7">
                Сканировать детали деталей в реальном времени
              </h1>
              <p className="text-[#969696] mb-6  max-w-[650px]">
                Вы можете сканировать детали и получать информацию о них в
                формате реального времени с задержкой доли секунды
              </p>
              <h2 className="text-md mb-4 font-normal">
                Настроить используемую модель
              </h2>
              <div className="max-w-[353px] mb-7 opacity-70">
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">
                    Выберите модель для использования
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={mode}
                    label="Выберите модель для использования"
                    onChange={handleChange}>
                    <MenuItem value={'nano'}>
                      Nano модель (более быстрая, менее точная)
                    </MenuItem>
                    <MenuItem value={'small'}>
                      Small модель (менее быстрая, более точная)
                    </MenuItem>
                  </Select>
                </FormControl>
              </div>

              <Link to="/realtime">
                <button className="w-full sm:w-[339px] px-3 py-3 bg-[#612EF7] rounded-md text-white hover:bg-[#4A23BE] hover:scale-105 transition-all">
                  Сканировать
                </button>
              </Link>
            </div>

            <div className="bg-white py-12 px-4 sm:px-11  rounded-3xl shadow-block mb-28">
              <h1 className="text-2xl font-medium mb-7">
                Определить модель по загруженному фото
              </h1>
              <p className="text-[#969696] max-w-[650px] mb-36">
                Вы можете загрузить фото или сделать его и по вашему фото
                будет установлена модель, выведены технические
                характеристики и сможете занести ее в систему
              </p>

              <Link to="/file">
                <button className="w-full sm:w-[339px] px-3 py-3 bg-[#612EF7] rounded-md text-white hover:bg-[#4A23BE] hover:scale-105 transition-all">
                  Сканировать
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Home;
