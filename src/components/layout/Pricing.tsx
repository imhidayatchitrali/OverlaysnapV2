// import PricingCard from "./PricingCard";
import { CheckCircle, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useRef, useEffect } from "react";

const PricingSection = () => {
  const [currentCard, setCurrentCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (containerRef.current && cardRefs.current[currentCard]) {
      const card = cardRefs.current[currentCard];
      const container = containerRef.current;
      const scrollLeft = card.offsetLeft - container.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2;
      
      container.scrollTo({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  }, [currentCard]);

  const scrollToCard = (index: number) => {
    if (index >= 0 && index < cardRefs.current.length) {
      setCurrentCard(index);
    }
  };

  return (
    <section className="w-full ">
      <h2 className="text-3xl font-bold text-center mb-12 relative z-10">
        <span className="relative inline-block px-4 py-2 z-10">
          <span className="relative z-10">Sample Pricing</span>
          <svg
            className="absolute top-1/2 left-0 w-full h-full z-0"
            viewBox="0 0 300 100"
            preserveAspectRatio="none"
          >
            <g transform="rotate(-2)">
              <rect x="2" y="22" width="300" height="8" fill="#22D3DE" rx="2" />
              <rect x="0" y="20" width="300" height="8" fill="#22D3DE" rx="2" />
            </g>
            <g transform="rotate(-2)">
              <rect x="2" y="22" width="300" height="8" fill="#22D3DE" rx="2" />
              <rect x="0" y="20" width="300" height="8" fill="#22D3DE" rx="2" />
            </g>
            <g transform="rotate(-4)">
              <rect x="2" y="2" width="300" height="8" fill="#22D3DE" rx="2" />
              <rect x="2" y="10" width="300" height="8" fill="#22D3DE" rx="2" />
            </g>
          </svg>
        </span>
      </h2>

      <div className="relative">
        <div 
          ref={containerRef}
          className="overflow-x-auto hide-scrollbar"
        >
          <div className="flex md:justify-center gap-6 px-4 md:px-0 min-w-[800px] md:min-w-0">
            {/* Card 1 */}
            <div 
              ref={el => el && (cardRefs.current[0] = el)}
              className="flex-shrink-0 w-[400px] p-8 rounded-xl bg-[#ECF0F4] text-left flex flex-col"
            >
              <div className="mb-3">
                <h3 className="text-3xl font-bold mb-2">$0 <span className="text-lg font-normal">/ Free</span></h3>
                <p className="text-gray-600 text-lg mb-6">Perfect for small gatherings</p>
              </div>
              
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> Up To 10 Guests</li>
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> 5 Photos Per Guest</li>
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> Default Overlays</li>
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> 3-Day Photo Storage</li>
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> Ad-Supported</li>
              </ul>
              <button className="w-full rounded-full bg-gray-300 text-gray-600 py-3 text-lg font-medium cursor-not-allowed">
                Activated
              </button>
            </div>

            {/* Card 2 */}
            <div 
              ref={el => el && (cardRefs.current[1] = el)}
              className="flex-shrink-0 w-[400px] p-8 rounded-xl border-2 bg-[#ECF0F4] border-cyan-400 text-left flex flex-col"
            >
              <div className="mb-3">
                <h3 className="text-3xl font-bold mb-2">$14.99 <span className="text-lg font-normal">/ Event</span></h3>
                <p className="text-gray-600 text-lg mb-6">Perfect for small gatherings</p>
              </div>
              
              <ul className="space-y-3 text-gray-700 mb-8 flex-grow">
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> All Included in Free</li>
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> 5 Photos Per Guest</li>
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> Default Overlays</li>
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> 3-Day Photo Storage</li>
                <li className="flex items-center text-xl"><span className="mr-3 text-cyan-500"><CheckCircle size={22} /></span> Ad-Free Experience</li>
              </ul>
              <button className="w-full rounded-full bg-cyan-400 text-white py-3 text-lg font-medium hover:bg-cyan-500 transition">
                Select
              </button>
            </div>
          </div>
        </div>
        
        {/* Navigation arrows - only show on mobile */}
        <div className="md:hidden flex justify-center space-x-8 mt-6">
          <button 
            onClick={() => scrollToCard(0)}
            className={`p-3 rounded-full ${currentCard === 0 ? 'bg-cyan-400 text-white' : 'bg-gray-200'}`}
            aria-label="Previous pricing card"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => scrollToCard(1)}
            className={`p-3 rounded-full ${currentCard === 1 ? 'bg-cyan-400 text-white' : 'bg-gray-200'}`}
            aria-label="Next pricing card"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;