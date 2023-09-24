import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { AiOutlineFileAdd, AiFillDelete } from 'react-icons/ai';
import { AnimatePresence, motion } from 'framer-motion';
import axios from 'axios';
import { getBinaryData } from '../utils/getBinaryData';
import CvObject from '../components/CvObject';
import imageCompression from 'browser-image-compression';

const File = () => {
  const [details, setDetails] = useState([]);
  const [files, setFiles] = useState([]);
  const width =
    window.innerWidth < 680 ? window.innerWidth : window.innerWidth * 0.6;
  const height = window.innerHeight * 0.7;
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: async (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          }),
        ),
      );
      const file = acceptedFiles[0];
      const compressedFile = await compressImage(file);

      try {
        const binaryData = await getBinaryData(compressedFile);
        console.log(binaryData);
        const formData = new FormData();
        formData.append(
          'image',
          new Blob([binaryData], { type: 'image/jpeg' }),
          `${file.path}`,
        );

        const response = await axios.put(
          'https://alexbobr.ru/image/?model=small',
          formData,
          {
            headers: {
              'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
            },
          },
        );

        if (response.data.message === 'error') {
          setDetails([]);
        } else {
          setDetails(response.data.message);
        }
      } catch (error) {
        console.error(
          'Ошибка при отправке изображения на сервер:',
          error.message,
        );
      }
    },
  });

  const deleteThumb = (name) => {
    setFiles((prev) => prev.filter((file) => file.name !== name));
  };

  useEffect(() => {
    if (files[0]) {
      URL.revokeObjectURL(files[0].preview);
    }
  }, []);

  async function compressImage(file) {
    // Опции для сжатия изображения
    const options = {
      maxSizeMB: 1, // Максимальный размер файла после сжатия (1MB в данном случае)
      maxWidthOrHeight: 1200, // Максимальная ширина или высота изображения
      useWebWorker: true, // Использовать веб-воркер для улучшения производительности
    };

    // Сжимаем изображение
    const compressedFile = await imageCompression(file, options);

    return compressedFile;
  }

  return (
    <div className="w-full ">
      <div className="max-w-2xl mx-auto p-0 rounded-2xl bg-light text-dark font-semibold text-xl drop-shadow-neon mt-10">
        <AnimatePresence>
          {!files.length && (
            <motion.div
              whileTap={{ scale: 1.5, transition: { duration: 1 } }}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5 },
              }}
              {...getRootProps({
                className:
                  'dropzone bg-light p-10 rounded-xl cursor-pointer',
              })}>
              <input {...getInputProps()} />
              <p className="mb-7 opacity-75 text-center">
                Перетащите сюда файл или нажмите чтобы выбрать
              </p>

              <AiOutlineFileAdd className="w-20 h-20 fill-dark mx-auto opacity-50" />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {!!files.length && (
            <motion.aside
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: { delay: 0.5 },
              }}
              className="relative">
              <div key={files[0].name}>
                {!!details.length &&
                  details.map((detail, idx) => (
                    <CvObject
                      key={idx}
                      data={detail}
                      width={width}
                      height={height}
                      className="absolute top-0 bottom-0 w-full"
                    />
                  ))}

                <img
                  src={files[0].preview}
                  width={width}
                  height={height}
                  className={`w-full`}
                  onLoad={() => {
                    URL.revokeObjectURL(files[0].preview);
                  }}
                />
                <div className="absolute bottom-0 left-0 translate-y- sm:translate-y-7 flex justify-between items-center flex-wrap w-full z-20">
                  {!details[0]?.class ? (
                    <span>{files[0].name} (Ничего не найденно)</span>
                  ) : (
                    <span>{details[0].class}</span>
                  )}
                  <AiFillDelete
                    className=" w-5 h-5 fill-red cursor-pointer"
                    onClick={() => {
                      deleteThumb(files[0].name);
                      setFiles([]);
                    }}
                  />
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default File;
