import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Calendar, Image, AlertCircle } from 'lucide-react';
// import { useEvent } from '../contexts/EventContext';
import Button from '../components/ui/Button';

const CreateEvent: React.FC = () => {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // const { createEvent } = { createEvent: "" };
  // const { createEvent } = useEvent();
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      setImage(selectedFile);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter an event name');
      return;
    }

    if (!date) {
      setError('Please select a date');
      return;
    }

    if (!image) {
      setError('Please upload an event image');
      return;
    }

    setLoading(true);

    try {
      // const eventDate = new Date(date);
      // const eventId = await createEvent(name, eventDate, image);
      const eventId = "";
      navigate(`/my-hub?eventCreated=${eventId}`);
    } catch (err) {
      console.error('Error creating event:', err);
      setError('Failed to create event. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6 md:p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Create New Event</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-start">
          <AlertCircle className="text-red-500 mr-2 flex-shrink-0 mt-0.5" size={20} />
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-6">
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="My Amazing Event"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
            Event Date
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={20} />
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            />
          </div>
        </div>

        <div className="mb-8">
          <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
            Event Image
          </label>

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500 transition-colors">
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Event preview"
                  className="mx-auto max-h-48 rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImagePreview(null);
                  }}
                  className="absolute top-2 right-2 bg-black bg-opacity-50 text-white rounded-full p-1 hover:bg-opacity-70"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <label htmlFor="image" className="cursor-pointer block">
                <Image className="mx-auto text-gray-400 mb-2" size={48} />
                <p className="text-gray-600">Click to upload event image</p>
                <p className="text-gray-500 text-sm">JPG, PNG or GIF, max 5MB</p>
              </label>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button primary type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Event'}
          </Button>
        </div>
      </form>
    </div>
  );
};

// X icon component
const X = ({ size = 24, className = "" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <line x1="18" y1="6" x2="6" y2="18"></line>
    <line x1="6" y1="6" x2="18" y2="18"></line>
  </svg>
);

export default CreateEvent;