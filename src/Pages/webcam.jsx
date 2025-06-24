import React, { useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

function WebcamCapture() {
  const [img, setImg] = useState(null);
  const webcamRef = useRef(null);

  const videoConstraints = {
    width: 420,
    height: 420,
    facingMode: "user",
  };

  const capture = useCallback(async () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImg(imageSrc);
    await handleConvertToBase64(); // Automatically convert to base64 after capture
  }, [webcamRef]);

  const convertToBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const handleConvertToBase64 = async () => {
    try {
      const response = await fetch(img);
      const blob = await response.blob();
      const base64Image = await convertToBase64(blob);
      console.log("Base64 format:", base64Image);
      // Do something with the base64Image, e.g., send it to the server.
    } catch (error) {
      console.error("Error converting image to base64:", error);
    }
  };

  return (
    <div className="Container">
      {img === null ? (
        <>
          <Webcam
            audio={false}
            mirrored={true}
            height={400}
            width={400}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={videoConstraints}
          />
          <button onClick={capture}>Capture photo</button>
        </>
      ) : (
        <>
          <img src={img} alt="screenshot" />
          <button onClick={() => setImg(null)}>Retake</button>
        </>
      )}
    </div>
  );
}

export default WebcamCapture;
