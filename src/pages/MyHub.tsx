/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Plus, Calendar, QrCode, Trash2, Share2 } from 'lucide-react';
// import { useEvent } from '../contexts/EventContext';
import Button from '../components/ui/Button';

const MyHub: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showQrCode, setShowQrCode] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const location = useLocation();
  //   const navigate = useNavigate();
  // const { getUserEvents, deleteEvent } = { getUserEvents: "", deleteEvent: "" };
  // const { getUserEvents, deleteEvent } = useEvent();

  // Check for newly created event
  const queryParams = new URLSearchParams(location.search);
  const newEventId = queryParams.get('eventCreated');

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      // const userEvents = true;
      // const userEvents = await getUserEvents();
      // setEvents(userEvents);
      setError(null);
    } catch (err) {
      console.error('Error fetching events:', err);
      setError('Failed to load your events. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteEvent = async (eventId: string) => {
    try {
      // await deleteEvent(eventId);
      setEvents(events.filter(event => event.id !== eventId));
      setShowDeleteConfirm(null);
    } catch (err) {
      console.error('Error deleting event:', err);
      setError('Failed to delete event. Please try again.');
    }
  };

  const copyEventLink = (eventCode: string) => {
    const url = `${window.location.origin}/join/${eventCode}`;
    navigator.clipboard.writeText(url)
      .then(() => {
        alert('Event link copied to clipboard!');
      })
      .catch(err => {
        console.error('Could not copy text: ', err);
      });
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">My Hub</h1>
        <Link to="/create-event">
          <Button primary>
            <Plus size={18} className="mr-1" /> Create Event
          </Button>
        </Link>
      </div>

      {newEventId && (
        <div className="mb-6 p-4 bg-green-50 rounded-lg">
          <p className="text-green-700">
            <span className="font-semibold">Success!</span> Your event has been created. Share the code with your guests!
          </p>
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      {events.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <div className="mb-4 text-purple-500">
            <Calendar size={48} className="mx-auto" />
          </div>
          <h2 className="text-2xl font-bold mb-2">No Events Yet</h2>
          <p className="text-gray-600 mb-6">
            Start by creating your first event to collect photos from your guests.
          </p>
          <Link to="/create-event">
            <Button primary>
              <Plus size={18} className="mr-1" /> Create Event
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map(event => (
            <div key={event.id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="relative h-48">
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h2 className="text-xl font-bold">{event.name}</h2>
                  <p className="text-sm">{formatDate(event.date)}</p>
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-sm font-medium bg-purple-100 text-purple-800 py-1 px-2 rounded">
                      Code: {event.code}
                    </span>
                  </div>
                  <button
                    onClick={() => setShowQrCode(event.id)}
                    className="text-gray-500 hover:text-purple-700"
                  >
                    <QrCode size={20} />
                  </button>
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setShowDeleteConfirm(event.id)}
                    className="text-red-500 hover:text-red-700 text-sm flex items-center"
                  >
                    <Trash2 size={16} className="mr-1" /> Delete
                  </button>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => copyEventLink(event.code)}
                      className="text-gray-600 hover:text-purple-700 text-sm flex items-center"
                    >
                      <Share2 size={16} className="mr-1" /> Share
                    </button>

                    <Link
                      to={`/photo-booth/${event.id}`}
                      className="text-purple-600 hover:text-purple-800 text-sm font-medium flex items-center"
                    >
                      View Photos
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* QR Code Modal */}
      {showQrCode && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h2 className="text-xl font-bold mb-4">Event QR Code</h2>
            <p className="mb-4 text-gray-600">
              Share this QR code with your guests so they can easily join your event.
            </p>

            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 flex justify-center mb-4">
              {/* This would be a real QR code in a production app */}
              <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                <p className="text-gray-500 text-center">QR Code for<br />{events.find(e => e.id === showQrCode)?.code}</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button onClick={() => setShowQrCode(null)}>Close</Button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-sm w-full p-6">
            <h2 className="text-xl font-bold mb-4">Delete Event</h2>
            <p className="mb-6 text-gray-600">
              Are you sure you want to delete this event? All photos and data will be permanently removed.
            </p>

            <div className="flex justify-end space-x-4">
              <Button onClick={() => setShowDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button
                danger
                onClick={() => handleDeleteEvent(showDeleteConfirm)}
              >
                Delete Event
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyHub;