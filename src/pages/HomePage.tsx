/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { Camera, Calendar, Users, AlertCircle } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import Button from '../components/ui/Button';
import PricingSection from '../components/layout/Pricing';
import Footer from '../components/layout/Foter';
import backgroundImage from '../assets/images/hero-background.png'; // Import your background image
import QrScanner from '../components/events/QrScanner';
import { useNavigate, useParams } from 'react-router-dom';
// import { useEvent } from '../contexts/EventContext';
import JoinConfirmModal from '../components/events/JoinConfirmModal';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor?: string; // ✅ Make it optional
}

const HomePage: React.FC = () => {
  const [eventCode, setEventCode] = useState('');
  const [showScanner, setShowScanner] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const { joinEvent } = { joinEvent: {} };
  // const { joinEvent } = useEvent();
  const navigate = useNavigate();
  const { eventId } = useParams();

  useEffect(() => {
    if (eventId) {
      handleJoinEvent(eventId);
    }
  }, [eventId]);

  const handleJoinEvent = async (code: string) => {
    setError(null);

    if (!code.trim()) {
      setError('Please enter an event code');
      return;
    }

    setLoading(true);

    try {
      const event = {};
      // const event = await joinEvent(code);
      setCurrentEvent(event);
      setShowConfirmModal(true);
    } catch (err: any) {
      console.error('Error joining event:', err);
      setError(err.message || 'Failed to join event. Please check the code and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleScanResult = (result: string) => {
    setShowScanner(false);
    if (result) {
      setEventCode(result);
      handleJoinEvent(result);
    }
  };

  const handleConfirmJoin = () => {
    setShowConfirmModal(false);
    if (currentEvent) {
      navigate(`/photo-booth/${currentEvent.id}`);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}


      {showScanner && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-4">
            <h2 className="text-xl font-bold mb-4">Scan QR Coddde</h2>
            <QrScanner onScan={handleScanResult} onCancel={() => setShowScanner(false)} />
          </div>
        </div>
      )}
      {showConfirmModal && currentEvent && (
        <JoinConfirmModal
          event={currentEvent}
          onConfirm={handleConfirmJoin}
          onCancel={() => setShowConfirmModal(false)}
        />
      )}
      <div className="absolute inset-y-0 right-0 w-full h-full  lg:w-1/3 z-0">
        <img
          src={backgroundImage}
          alt="Decorative background"
          className="h-full w-full object-contain object-right-top opacity-90 blur-lg"
        />
      </div>
      <section className="w-full  flex flex-col items-center text-center  relative overflow-hidden ">
        <div className="relative z-10 w-full max-w-4xl">
          <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold  ">
            Capture & Share Movement
          </h1>
          <h2 className="italic  text-2xl md:text-5xl lg:text-4xl font-bold ">
            with Style
          </h2>
          <p className="text-1xl max-w-1xl mb-4 mx-auto">
            Create unforgettable photo experiences, Guest snap photos with fun, custom overlays, and share instantly.
          </p>
          <div className="max-w-sm mx-auto p-6 bg-white rounded-xl border border-blue-200 shadow-md space-y-6">
            {/* Header */}
            <div className="text-left space-y-2">
              <div className="flex items-center space-x-2">
                <div className="bg-blue-100 p-2 rounded-full">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-4.553a1.5 1.5 0 00-2.122-2.121L12.879 7.879M9 15l-4.553 4.553a1.5 1.5 0 002.122 2.121L11.121 16.12"
                    />
                  </svg>
                </div>

                <h2 className="text-xl font-semibold text-gray-800">Join an event</h2>
              </div>
              <p className="text-sm text-gray-500">
                Photos you take may be visible to the host and guests. You can always revisit and download them later!
              </p>
            </div>

            {/* Input with Label */}
            <hr className=" border-gray-300" />

            <div className="space-y-2">
              <label className=" flex text-sm font-medium ">Event Code</label>
              {error && (
                <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start">
                  <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={20} />
                  <p className="text-red-700">{error}</p>
                </div>
              )}
              <input
                onChange={(e) => setEventCode(e.target.value.toUpperCase())}
                value={eventCode}
                disabled={loading}
                type="text"
                placeholder="E.G, YMJFKKLDS8801"
                className="w-full px-4 py-3 bg-gray-100 border-b-4 border-blue-400 text-sm focus:outline-none rounded-md focus:ring-0"
              />
            </div>
            {/* Buttons */}
            <div className="flex items-center space-x-2">
              <button onClick={() => setShowScanner(true)}
                disabled={loading} className="flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium border-gray-300 hover:bg-gray-100">
                <svg
                  className="w-5 h-5 mr-2 text-gray-600"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2M8 12h8"
                  />
                </svg>
                Scan QR
              </button>


              <button onClick={() => handleJoinEvent(eventCode)}
                disabled={loading} style={{ backgroundColor: '#24D7DB' }}
                className="flex-1 bg-cyan-500 text-white px-4 py-2 rounded-md font-semibold  text-sm">
                Join Event
              </button>
            </div>

            {/* Create Event Button */}
            <button className="flex items-center justify-center w-full mt-2 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100">
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
      </section>
      <section className="w-full py-8 mt-1 relative z-10">
        <div className="container mx-auto px-4">
          {/* <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2> */}
          <h2 className="text-3xl font-bold text-center mb-8 relative z-10">
            <span className="relative inline-block px-4 py-2 z-10">
              <span className="relative z-10">How It Works</span>
              <svg
                className="absolute top-1/2 left-0 w-full h-full z-0"
                viewBox="0 0 300 100"
                preserveAspectRatio="none"
              >
                <g transform="rotate(-2)">
                  <rect x="2" y="22" width="300" height="8" fill="#FDC855" rx="2" />
                  <rect x="0" y="20" width="300" height="8" fill="#FDC855" rx="2" />
                </g>
                <g transform="rotate(-2)">
                  <rect x="2" y="22" width="300" height="8" fill="#FDC855" rx="2" />
                  <rect x="0" y="20" width="300" height="8" fill="#FDC855" rx="2" />
                </g>

                <g transform="rotate(-4)">
                  <rect x="2" y="2" width="300" height="8" fill="#FDC855" rx="2" />
                  <rect x="2" y="10" width="300" height="8" fill="#FDC855" rx="2" />
                </g>
              </svg>
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={
                <div className="p-4 rounded-full bg-gradient-to-br from-[#FDC855] to-[#FDA503] inline-block">
                  <Calendar className="text-white" size={24} />
                </div>
              }
              title="Create an Event"
              description="Set up a new photo event in seconds. Add details, date, and customize your event page."
              bgColor="#FFF8E0"
            />

            <FeatureCard
              icon={
                <div className="p-4 rounded-full bg-gradient-to-br from-[#FDC855] to-[#FDA503] inline-block">
                  <Users className="text-white" size={24} />
                </div>
              }
              title="Invite Guests"
              description="Share your event code or QR code with guests so they can easily join and participate."
              bgColor="#FFF8E0"
            />

            <FeatureCard
              icon={
                <div className="p-4 rounded-full bg-gradient-to-br from-[#FDC855] to-[#FDA503] inline-block">
                  <Camera className="text-white" size={24} />
                </div>
              }
              title="Take Photos"
              description="Use our in-app camera with fun overlay designs to capture special moments."
              bgColor="#FFF8E0"
            />

          </div>
        </div>
      </section>
      <PricingSection />
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

// const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
//   return (
//     <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
//       <div className="mb-4">{icon}</div>
//       <h3 className="text-xl font-semibold mb-2">{title}</h3>
//       <p className="text-gray-600">{description}</p>
//     </div>
//   );
// };
const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="rounded-xl bg-[#FFF8E0] p-6 shadow-sm ">
      <div className="w-16 h-16  mb-4 rounded-full  bg-gradient-to-br from-[#FDC855] to-[#FDA503]">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};
export default HomePage;