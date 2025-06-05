/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Camera, X, Download, Smile, RefreshCcw } from 'lucide-react';
// import { useEvent } from '../contexts/EventContext';
import Button from '../components/ui/Button';
import PhotoOverlay from '../components/photo/PhotoOverlay';

const PhotoBooth: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [event, setEvent] = useState<any>(null);
  const [cameraReady, setCameraReady] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  const [selectedOverlay, setSelectedOverlay] = useState<string | null>(null);
  const [overlays] = useState([
    { id: 'overlay1', name: 'Hearts', url: 'https://i.imgur.com/example1.png' },
    { id: 'overlay2', name: 'Stars', url: 'https://i.imgur.com/example2.png' },
    { id: 'overlay3', name: 'Confetti', url: 'https://i.imgur.com/example3.png' },
  ]);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { eventId } = useParams();
  const navigate = useNavigate();
  // const { getEvent, uploadPhoto } = { getEvent: "", uploadPhoto: "" };
  // const { getEvent, uploadPhoto } = useEvent();

  useEffect(() => {
    if (!eventId) {
      setError('Event not found');
      return;
    }

    const fetchEvent = async () => {
      try {
        const eventData = "";
        // const eventData = await getEvent(eventId);
        setEvent(eventData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching event:', err);
        setError('Could not load event. Please try again.');
        setLoading(false);
      }
    };

    fetchEvent();
  }, [eventId]);

  useEffect(() => {
    if (!loading && !error) {
      startCamera();
    }

    return () => {
      // Stop camera when component unmounts
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [loading, error]);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user' }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraReady(true);
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Could not access camera. Please check permissions and try again.');
    }
  };

  const switchCamera = async () => {
    // Stop current stream
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
    }

    try {
      // Toggle between front and back camera
      const currentFacingMode = videoRef.current?.dataset.facingMode || 'user';
      const newFacingMode = currentFacingMode === 'user' ? 'environment' : 'user';

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: newFacingMode }
      });

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.dataset.facingMode = newFacingMode;
      }
    } catch (err) {
      console.error('Error switching camera:', err);
      setError('Could not switch camera. Your device may only have one camera.');
    }
  };

  const takePhoto = () => {
    if (!canvasRef.current || !videoRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const context = canvas.getContext('2d');

    if (!context) return;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Create data URL from canvas
    const dataUrl = canvas.toDataURL('image/jpeg');
    setPhotoUrl(dataUrl);
    setPhotoTaken(true);
  };

  const retakePhoto = () => {
    setPhotoTaken(false);
    setPhotoUrl(null);
  };

  const savePhoto = async () => {
    if (!photoUrl || !eventId) return;

    try {
      setLoading(true);

      // Convert data URL to File
      // const res = await fetch(photoUrl);
      // const blob = await res.blob();
      // const file = new File([blob], 'photo.jpg', { type: 'image/jpeg' });

      // Upload to Firebase
      // await uploadPhoto(eventId, file, selectedOverlay);

      // Reset state
      setPhotoTaken(false);
      setPhotoUrl(null);
      setSelectedOverlay(null);
      setLoading(false);

      // Show success message
      alert('Photo saved successfully!');
    } catch (err) {
      console.error('Error saving photo:', err);
      setError('Failed to save photo. Please try again.');
      setLoading(false);
    }
  };

  const downloadPhoto = () => {
    if (!photoUrl) return;

    const link = document.createElement('a');
    link.href = photoUrl;
    link.download = `snapshare-${eventId}-${Date.now()}.jpg`;
    link.click();
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 max-w-md mx-auto">
        <h2 className="text-xl font-bold text-red-500 mb-4">Error</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <Button onClick={() => navigate('/')}>Return Home</Button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md max-w-md mx-auto overflow-hidden">
      <div className="p-4 bg-purple-700 text-white">
        <h1 className="text-xl font-bold">{event?.name || 'Photo Booth'}</h1>
      </div>

      <div className="relative">
        {photoTaken ? (
          <div className="relative">
            <img
              src={photoUrl || ''}
              alt="Captured"
              className="w-full h-auto"
            />
            {selectedOverlay && (
              <PhotoOverlay overlayId={selectedOverlay} />
            )}
          </div>
        ) : (
          <div className="relative">
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-auto"
              data-facing-mode="user"
            ></video>
            <canvas ref={canvasRef} className="hidden"></canvas>
            {selectedOverlay && (
              <PhotoOverlay overlayId={selectedOverlay} />
            )}
          </div>
        )}
      </div>

      <div className="p-4">
        {photoTaken ? (
          <div className="flex justify-between mb-4">
            <Button onClick={retakePhoto}>
              <RefreshCcw size={18} className="mr-1" /> Retake
            </Button>
            <div className="space-x-2">
              <Button onClick={downloadPhoto}>
                <Download size={18} className="mr-1" /> Download
              </Button>
              <Button primary onClick={savePhoto} disabled={loading}>
                {loading ? 'Saving...' : 'Save Photo'}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex justify-between mb-4">
            <Button onClick={switchCamera} disabled={!cameraReady}>
              <RefreshCcw size={18} className="mr-1" /> Switch
            </Button>
            <Button primary onClick={takePhoto} disabled={!cameraReady}>
              <Camera size={18} className="mr-1" /> Capture
            </Button>
          </div>
        )}

        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Choose an Overlay</h3>
          <div className="flex overflow-x-auto space-x-2 pb-2">
            <button
              onClick={() => setSelectedOverlay(null)}
              className={`flex-shrink-0 p-2 rounded-lg ${!selectedOverlay ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-100 border border-gray-200'}`}
            >
              <X size={24} className="text-gray-500" />
              <span className="text-xs block mt-1">None</span>
            </button>

            {overlays.map(overlay => (
              <button
                key={overlay.id}
                onClick={() => setSelectedOverlay(overlay.id)}
                className={`flex-shrink-0 p-2 rounded-lg ${selectedOverlay === overlay.id ? 'bg-purple-100 border-2 border-purple-500' : 'bg-gray-100 border border-gray-200'}`}
              >
                <Smile size={24} className="text-purple-500" />
                <span className="text-xs block mt-1">{overlay.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoBooth;