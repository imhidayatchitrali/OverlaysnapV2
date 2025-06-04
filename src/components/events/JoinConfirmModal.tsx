import React from 'react';
import { Calendar, MapPin } from 'lucide-react';
import { Event } from '../../contexts/EventContext';
import Button from '../ui/Button';

interface JoinConfirmModalProps {
  event: Event;
  onConfirm: () => void;
  onCancel: () => void;
}

const JoinConfirmModal: React.FC<JoinConfirmModalProps> = ({ event, onConfirm, onCancel }) => {
  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }).format(date);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-md w-full overflow-hidden">
        <div className="relative h-48">
          <img 
            src={event.imageUrl} 
            alt={event.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-4 text-white">
            <h2 className="text-2xl font-bold">{event.name}</h2>
          </div>
        </div>
        
        <div className="p-6">
          <div className="mb-6">
            <p className="text-gray-700 mb-4">
              You're about to join this event. Ready to start capturing memories?
            </p>
            
            <div className="flex items-center mb-2">
              <Calendar className="text-purple-600 mr-2" size={20} />
              <span className="text-gray-700">{formatDate(event.date)}</span>
            </div>
            
            <div className="flex items-center">
              <MapPin className="text-purple-600 mr-2" size={20} />
              <span className="text-gray-700">Event Code: {event.code}</span>
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button onClick={onCancel}>
              Cancel
            </Button>
            <Button primary onClick={onConfirm}>
              Join Event
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JoinConfirmModal;