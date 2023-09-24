import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Webcam from 'react-webcam';
import { IoSwapHorizontalOutline } from 'react-icons/io5';
import CvObject from './CvObject';
import { dataURItoBlob } from '../utils/dataURItoBlob';
import { useSelector } from 'react-redux';

const CVwebcam = () => {
  const [details, setDetails] = useState([]);
  const [isSelfy, setFacing] = useState(false);
  const { mode } = useSelector((state) => state.mode);
  const webcam = useRef(null);

  const width =
    window.innerWidth < 680 ? window.innerWidth : window.innerWidth * 0.6;
  const height = window.innerHeight * 0.7;

  const captureFrameAndSend = async () => {
    const imageSrc = webcam.current.getScreenshot();
    const imageBlob = dataURItoBlob(imageSrc); // Преобразуем base64 строку в Blob
    const fileName = 'image.jpg';

    try {
      const formData = new FormData();
      formData.append('image', imageBlob, fileName);

      const response = await axios.put(
        `https://alexbobr.ru/image/?model=${mode}`,
        formData,
      );
      if (response.data.message === 'error') {
        setDetails([]);
      } else {
        setDetails(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const timer = setInterval(captureFrameAndSend, 500);
    return () => clearInterval(timer);
  }, []);

  return (
    <>
      <div className="relative">
        {details.map((detail) => (
          <>
            <CvObject
              key={detail.x}
              data={detail}
              className="absolute top-0 bottom-0 w-full"
              width={width}
              height={height}
            />
          </>
        ))}
        <Webcam
          ref={webcam}
          audio={false}
          screenshotQuality={0.5}
          videoConstraints={{
            width,
            height,
            facingMode: isSelfy ? 'user' : 'environment',
          }}
          screenshotFormat="image/jpeg"
          className="rounded-lg w-full"
        />
        <div
          className="absolute top-0 right-0 bg-light p-3 z-50 rounded-bl-lg cursor-pointer"
          onClick={() => setFacing((prev) => !prev)}>
          <IoSwapHorizontalOutline className="w-5 h-5 hover:scale-110" />
        </div>
      </div>
    </>
  );
};

export default CVwebcam;
