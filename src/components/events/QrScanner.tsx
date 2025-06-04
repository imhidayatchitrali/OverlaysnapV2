import React, { useEffect, useRef, useState } from 'react';
import { Camera, X } from 'lucide-react';
import Button from '../ui/Button';

interface QrScannerProps {
  onScan: (result: string) => void;
  onCancel: () => void;
}

const QrScanner: React.FC<QrScannerProps> = ({ onScan, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);
  const [scanning, setScanning] = useState(true);

  useEffect(() => {
    let stream: MediaStream | null = null;
    let animationFrame: number;
    let active = true;

    const startCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        
        if (videoRef.current && active) {
          videoRef.current.srcObject = stream;
          videoRef.current.play();
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
            
            // In a real app, we would use a QR code scanner library here
            // For this demo, we'll simulate a successful scan after 3 seconds
            setTimeout(() => {
              if (active && scanning) {
                // Simulate finding a QR code with event code "ABC123"
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
      
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [onScan, scanning]);

  return (
    <div className="relative">
      <div className="relative overflow-hidden rounded-lg bg-black">
        <video
          ref={videoRef}
          className="w-full h-64 object-cover"
          playsInline
          muted
        ></video>
        <canvas
          ref={canvasRef}
          className="hidden"
        ></canvas>
        
        {/* Scan overlay */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-48 h-48 border-2 border-white rounded-lg relative">
            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-500"></div>
            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-500"></div>
            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-500"></div>
            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-500"></div>
          </div>
        </div>
        
        {scanning && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="w-full h-0.5 bg-purple-500 animate-scan"></div>
          </div>
        )}
      </div>
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg text-red-700 text-sm">
          {error}
        </div>
      )}
      
      <div className="mt-4 flex justify-between">
        <Button onClick={onCancel}>
          <X size={18} className="mr-1" /> Close
        </Button>
        <Button onClick={() => setScanning(!scanning)}>
          <Camera size={18} className="mr-1" /> 
          {scanning ? 'Pause' : 'Resume'}
        </Button>
      </div>
    </div>
  );
};

export default QrScanner;