// import React from 'react';
import { Link } from 'react-router-dom';
import { Camera, Calendar, Users, Image } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';

const HomePage: React.FC = () => {
  const { currentUser } = { currentUser: "" };

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full py-12 md:py-24 flex flex-col items-center text-center px-4">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-700 to-pink-500">
          Capture Memories Together
        </h1>
        <p className="text-xl text-gray-700 max-w-2xl mb-10">
          Create photo events, invite guests, and collect everyone's pictures in one beautiful place.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-16">
          {currentUser ? (
            <Link to="/create-event">
              <Button primary>Create Event</Button>
            </Link>
          ) : (
            <Link to="/join">
              <Button primary>Join Event</Button>
            </Link>
          )}
          {!currentUser && (
            <Link to="/create-event">
              <Button>Create Event</Button>
            </Link>
          )}
        </div>

        <div className="relative w-full max-w-4xl h-64 md:h-96 rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02] duration-300">
          <img
            src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="People taking photos at an event"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-900/50 to-transparent"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard
              icon={<Calendar className="text-purple-700" size={32} />}
              title="Create an Event"
              description="Set up a new photo event in seconds. Add details, date, and customize your event page."
            />

            <FeatureCard
              icon={<Users className="text-purple-700" size={32} />}
              title="Invite Guests"
              description="Share your event code or QR code with guests so they can easily join and participate."
            />

            <FeatureCard
              icon={<Camera className="text-purple-700" size={32} />}
              title="Take Photos"
              description="Use our in-app camera with fun overlay designs to capture special moments."
            />

            <FeatureCard
              icon={<Image className="text-purple-700" size={32} />}
              title="View & Share"
              description="Access all event photos in one place. Download, share, and relive the memories."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full py-16 bg-gradient-to-r from-purple-700 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Create Your Photo Event?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Start collecting memories from everyone at your next gathering, wedding, or special occasion.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {currentUser ? (
              <Link to="/create-event">
                <Button light>Create Event</Button>
              </Link>
            ) : (
              <>
                <Link to="/join">
                  <Button light>Join Event</Button>
                </Link>
                <Link to="/create-event">
                  <Button outline>Create Event</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md transition-transform hover:shadow-lg hover:-translate-y-1 duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default HomePage;