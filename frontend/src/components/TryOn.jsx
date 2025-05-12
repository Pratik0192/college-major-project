import React, { useEffect, useRef, useState } from "react";
import { FaceMesh } from "@mediapipe/face_mesh";

// Import sunglasses images
import img1 from "../assets/image1.png";
import img2 from "../assets/image2.png";
import img3 from "../assets/image3.png";
import img4 from "../assets/image4.png";
import img5 from "../assets/image5.png";
import img6 from "../assets/image6.png";


const TryOn = ({ onClose }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const imgRef = useRef(new Image());

  // Manage selected image
  const [selectedImg, setSelectedImg] = useState(img1);

  // Update image ref when selectedImg changes
  useEffect(() => {
    imgRef.current.src = selectedImg;
  }, [selectedImg]);

  useEffect(() => {
    let animationId;

    const faceMesh = new FaceMesh({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`,
    });

    faceMesh.setOptions({
      maxNumFaces: 1,
      refineLandmarks: true,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.multiFaceLandmarks.length > 0) {
        const landmarks = results.multiFaceLandmarks[0];

        const leftEye = landmarks[33]; // Left eye outer corner
        const rightEye = landmarks[263]; // Right eye outer corner

        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        const leftX = leftEye.x * canvasWidth;
        const leftY = leftEye.y * canvasHeight;
        const rightX = rightEye.x * canvasWidth;
        const rightY = rightEye.y * canvasHeight;

        const centerX = (leftX + rightX) / 2 + 138;
        const centerY = (leftY + rightY) / 2 + 10;

        const dx = rightX - leftX;
        const dy = rightY - leftY;
        const angle = Math.atan2(dy, dx);
        const distance = Math.sqrt(dx * dx + dy * dy);

        const imgWidth = distance * 1.9; // Adjust size if needed
        const imgHeight = imgWidth * 0.4;

        ctx.save();
        ctx.translate(centerX, centerY);
        ctx.rotate(angle);
        ctx.drawImage(
          imgRef.current,
          -imgWidth / 2,
          -imgHeight / 2,
          imgWidth,
          imgHeight
        );
        ctx.restore();
      }
    });

    class Camera {
      constructor(videoElement) {
        this.video = videoElement;
      }

      async start() {
        this.stream = await navigator.mediaDevices.getUserMedia({ video: true });
        this.video.srcObject = this.stream;
        streamRef.current = this.stream;

        await this.video.play();

        const process = async () => {
          if (videoRef.current.videoWidth > 0) {
            canvasRef.current.width = videoRef.current.videoWidth;
            canvasRef.current.height = videoRef.current.videoHeight;

            await faceMesh.send({ image: videoRef.current });
          }

          animationId = requestAnimationFrame(process);
        };

        process();
      }

      stop() {
        if (this.stream) {
          this.stream.getTracks().forEach((track) => track.stop());
        }
        cancelAnimationFrame(animationId);
      }
    }

    const cam = new Camera(videoRef.current);
    cam.start();

    return () => {
      cam.stop();
    };
  }, []);

  const handleClose = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex text-gray-800 items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg w-[90%] max-w-2xl p-4 relative">
        <button
          onClick={handleClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold mb-4 text-center">
          3D Try-On
        </h2>

        <div className="relative w-full flex justify-center">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full max-w-md rounded"
            muted
          />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full max-w-md pointer-events-none"
          />
        </div>

        <p className="text-center text-gray-500 mt-2">
          Align your face to try on the eyewears
        </p>

        {/* Sunglasses selection */}
        <div className="flex justify-center gap-4 mt-4">
          {[img1, img2, img3, img4, img5, img6].map((imgSrc, index) => (
            <button
              key={index}
              onClick={() => setSelectedImg(imgSrc)}
              className={`border p-1 rounded transition duration-200 hover:scale-105 ${
                selectedImg === imgSrc ? "border-black" : "border-gray-300"
              }`}
            >
              <img
                src={imgSrc}
                alt={`Style ${index + 1}`}
                className="w-14 h-10 object-contain"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TryOn;
