// import { ChevronRight } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
// import { Camera, X } from 'lucide-react';
// import Button from '../ui/Button';

interface QrScannerProps {
  onScan: (result: string) => void;
  onCancel: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScan, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null); // ✅ store stream here
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let animationFrame: number;
    let active = true;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });

        streamRef.current = stream; // ✅ store in ref

        if (videoRef.current && active) {
          videoRef.current.srcObject = stream;
          await videoRef.current.play();
          scanQRCode();
        }
      } catch (err) {
        console.error('Error accessing camera:', err);
        setError('Could not access camera. Please check permissions and try again.');
      }
    };

    const scanQRCode = () => {
      if (!active || !scanning) return;

      try {
        const video = videoRef.current;
        const canvas = canvasRef.current;

        if (video && canvas && video.readyState === video.HAVE_ENOUGH_DATA) {
          const context = canvas.getContext('2d');
          if (context) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            // Simulated scan
            setTimeout(() => {
              if (active && scanning) {
                onScan("ABC123");
                setScanning(false);
              }
            }, 3000);
          }
        }
      } catch (err) {
        console.error('Error scanning QR code:', err);
      }

      animationFrame = requestAnimationFrame(scanQRCode);
    };

    startCamera();

    return () => {
      active = false;
      cancelAnimationFrame(animationFrame);

      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop()); // ✅ cleanup
      }
    };
  }, [onScan, scanning]);

  // ✅ Handle close and stop stream
  const handleCancel = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    onCancel(); // parent should unmount component
  };

  return (

    <div className="fixed inset-0 z-50 bg-white flex flex-col items-center justify-center px-4">
      {/* Close Button (Top Left) */}
      <button className="absolute top-4 left-4 text-2xl" onClick={handleCancel}>✕</button>


      {/* Title */}
      <h2 className="text-xl font-semibold text-center">Join an event</h2>
      <p className="text-sm text-center mt-1 mb-4 text-gray-600 max-w-sm">
        Photos you take may be visible to the host and guests. You can always revisit and download them later!
      </p>

      {/* Video Container */}
      {/* Video Container */}
      <div className="relative w-64 h-64 flex items-center justify-center">
        {/* Rounded border wrapper with padding */}
        {/* Video Container */}
        {/* Video Container */}
        <div className="relative flex items-center justify-center">
          {/* Inner camera feed with rounded corners and space around it */}
          {/* Video Container */}
          <div className="relative flex items-center justify-center">
            <div className="relative w-60 h-60 rounded-xl overflow-visible bg-black">
              <video
                ref={videoRef}
                className="w-full h-full object-cover rounded-2xl"
                playsInline
                muted
              />
              <canvas ref={canvasRef} className="hidden" />

              {/* Outer Decorative Curved Corners */}
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-[#24D7DB] rounded-tl-lg"></div>
              <div className="absolute -top-3 -right-3 w-6 h-6 border-t-2 border-r-2 border-[#24D7DB] rounded-tr-lg"></div>
              <div className="absolute -bottom-3 -left-3 w-6 h-6 border-b-2 border-l-2 border-[#24D7DB] rounded-bl-lg"></div>
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-[#24D7DB] rounded-br-lg"></div>

              {/* Scanning Line */}

            </div>
          </div>

        </div>


      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg text-red-700 text-sm text-center max-w-sm">
          {error}
        </div>
      )}

      {/* Footer Buttons */}
      <button className="mt-6 flex items-center justify-center  bg-gray-200  px-6 py-3 rounded-2xl">Go to Event <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-right-icon lucide-chevron-right"><path d="m9 18 6-6-6-6" /></svg>
      </button>

      <div className="w-full mt-8">
        <p className="text-center text-sm mb-2">Or Join Using Event Code</p>
        <div className="flex justify-center items-center gap-2">
          <input
            // onChange={(e) => setEventCode(e.target.value.toUpperCase())}
            // value={eventCode}
            // disabled={loading}
            type="text"
            placeholder="E.G, YMJFKKLDS8801"
            className="px-4 py-3 bg-gray-100 border-b-4  border-b-[#24D7DB] text-sm focus:outline-none rounded-md focus:ring-0"
          />
          {/* <button className="bg-black text-white px-4 py-2 rounded">Join Event</button> */}
          <button className="flex items-center justify-center mt-2 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
            <svg
              className="w-5 h-5 mr-2 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
            </svg>
            Create Event
          </button>
        </div>
      </div>
    </div>
  );

};

export default QrScanner;