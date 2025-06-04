// import React, { useState, useEffect } from 'react';
// import { useNavigate, useParams } from 'react-router-dom';
// import { QrCode, Send, AlertCircle } from 'lucide-react';
// import { useEvent } from '../contexts/EventContext';
// import Button from '../components/ui/Button';
// import JoinConfirmModal from '../components/events/JoinConfirmModal';
// import QrScanner from '../components/events/QrScanner';

// const JoinEvent: React.FC = () => {
//   const [eventCode, setEventCode] = useState('');
//   const [showScanner, setShowScanner] = useState(false);
//   const [showConfirmModal, setShowConfirmModal] = useState(false);
//   const [currentEvent, setCurrentEvent] = useState<any>(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);
  
//   const { joinEvent } = useEvent();
//   const navigate = useNavigate();
//   const { eventId } = useParams();

//   useEffect(() => {
//     if (eventId) {
//       handleJoinEvent(eventId);
//     }
//   }, [eventId]);

//   const handleJoinEvent = async (code: string) => {
//     setError(null);
    
//     if (!code.trim()) {
//       setError('Please enter an event code');
//       return;
//     }
    
//     setLoading(true);
    
//     try {
//       const event = await joinEvent(code);
//       setCurrentEvent(event);
//       setShowConfirmModal(true);
//     } catch (err: any) {
//       console.error('Error joining event:', err);
//       setError(err.message || 'Failed to join event. Please check the code and try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleScanResult = (result: string) => {
//     setShowScanner(false);
//     if (result) {
//       setEventCode(result);
//       handleJoinEvent(result);
//     }
//   };

//   const handleConfirmJoin = () => {
//     setShowConfirmModal(false);
//     if (currentEvent) {
//       navigate(`/photo-booth/${currentEvent.id}`);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
//       <h1 className="text-3xl font-bold mb-6 text-gray-800">Join Event</h1>
      
//       {error && (
//         <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start">
//           <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={20} />
//           <p className="text-red-700">{error}</p>
//         </div>
//       )}
      
//       <div className="mb-8">
//         <label htmlFor="eventCode" className="block text-sm font-medium text-gray-700 mb-2">
//           Enter Event Code
//         </label>
//         <div className="flex">
//           <input
//             type="text"
//             id="eventCode"
//             value={eventCode}
//             onChange={(e) => setEventCode(e.target.value.toUpperCase())}
//             className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 uppercase"
//             placeholder="ABCDEF"
//             maxLength={6}
//             disabled={loading}
//           />
//           <button
//             onClick={() => handleJoinEvent(eventCode)}
//             disabled={loading}
//             className="bg-purple-600 text-white px-4 py-2 rounded-r-lg hover:bg-purple-700 transition-colors disabled:bg-purple-400"
//           >
//             <Send size={20} />
//           </button>
//         </div>
//       </div>
      
//       <div className="text-center mb-8">
//         <p className="text-gray-500 mb-2">or</p>
//         <Button 
//           onClick={() => setShowScanner(true)}
//           disabled={loading}
//           className="flex items-center justify-center mx-auto"
//         >
//           <QrCode size={20} className="mr-2" />
//           Scan QR Code
//         </Button>
//       </div>
      
//       <div className="bg-gray-50 p-4 rounded-lg mb-4">
//         <p className="text-sm text-gray-600 text-center">
//           By joining an event, you'll be able to take photos and view all photos shared by event guests.
//         </p>
//       </div>
      
//       {showScanner && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg max-w-md w-full p-4">
//             <h2 className="text-xl font-bold mb-4">Scan QR Code</h2>
//             <QrScanner onScan={handleScanResult} onCancel={() => setShowScanner(false)} />
//           </div>
//         </div>
//       )}
      
//       {showConfirmModal && currentEvent && (
//         <JoinConfirmModal 
//           event={currentEvent}
//           onConfirm={handleConfirmJoin}
//           onCancel={() => setShowConfirmModal(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default JoinEvent;