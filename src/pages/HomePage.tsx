// import React from 'react';
// import { Link } from 'react-router-dom';
import { Camera, Calendar, Users } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import Button from '../components/ui/Button';
import PricingSection from '../components/layout/Pricing';
import Footer from '../components/layout/Foter';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor?: string; // ✅ Make it optional
}

const HomePage: React.FC = () => {
  // const { currentUser } = { currentUser: "" };


  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full  flex flex-col items-center text-center  relative overflow-hidden">
        {/* Background Image with 50% opacity */}
        {/* <div className="absolute inset-y-0 right-0 w-1/1 h-full z-0"> */}
        {/* <img
          
            src="https://images.pexels.com/photos/3184183/pexels-photo-3184183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
            alt="People taking photos at an event"
            className="w-full h-full object-cover opacity-50"
          /> */}
        {/* <img src="/images/hero-image.png" alt="Hero" className="w-full max-w-xl h-auto object-contain" /> */}

        {/* </div> */}




        <div className="relative z-10 w-full max-w-4xl">
          <h1 className="text-4xl md:text-4xl lg:text-4xl font-bold  ">
            Capture & Share Movement
          </h1>
          <h2 className="italic  text-2xl md:text-5xl lg:text-4xl font-bold ">
            with Style
          </h2>
          <p className="text-1xl max-w-1xl mb-10 mx-auto">
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
            <hr className="my-6 border-gray-300" />

            <div className="space-y-2">
              <label className=" flex text-sm font-medium ">Event Code</label>
              <input
                type="text"
                placeholder="E.G, YMJFKKLDS8801"
                className="w-full px-4 py-3 bg-gray-100 border-b-4 border-blue-400 text-sm focus:outline-none rounded-md focus:ring-0"
              />
            </div>
            {/* Buttons */}
            <div className="flex items-center space-x-2">
              <button className="flex items-center justify-center px-4 py-2 border rounded-md text-sm font-medium border-gray-300 hover:bg-gray-100">
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


              <button style={{ backgroundColor: '#24D7DB' }}
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
      {/* Features Section */}
      {/* <FeatureCard
        icon={
          <div className="p-4 rounded-full bg-gradient-to-br from-[#FDC855] to-[#FDA503] inline-block">
            <Calendar className="text-white" size={24} />
          </div>
        }
        title="Create an Event"
        description="Set up a new photo event in seconds. Add details, date, and customize your event page."
        bgColor="#FFF8E0"
      /> */}


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
                {/* <g transform="rotate(1)">
              <rect x="0" y="40" width="300" height="10" fill="#FDC855" rx="2" />
            </g> */}
                {/* <g transform="rotate(-1)">
              <rect x="0" y="60" width="280" height="7" fill="#FDC855" rx="2" />
              <rect x="4" y="63" width="280" height="7" fill="#FDC855" rx="2" />
            </g>
            <g transform="rotate(-2)">
              <rect x="1" y="20" width="300" height="8" fill="#FDC855" rx="2" />
            </g> */}
                {/* <g transform="rotate(1)">
              <rect x="2" y="40" width="300" height="10" fill="#FDC855" rx="3" />
            </g>
            <g transform="rotate(-1)">
              <rect x="3" y="60" width="280" height="7" fill="#FDC855" rx="2" />
            </g> */}
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
      {/* CTA Section */}
      
      {/* <section className="w-full py-16 mt-8 bg-gradient-to-r from-purple-700 to-pink-500 text-white relative z-10">
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
      </section> */}
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