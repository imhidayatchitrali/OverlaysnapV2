// import PricingCard from "./PricingCard";
import { CheckCircle } from "lucide-react";

const PricingSection = () => {
    return (
        <section className="w-full ">
            <h2 className="text-3xl font-bold text-center mb-8 relative z-10">
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

            <div className="overflow-x-auto">
                <div className="flex md:justify-center gap-10 px-4 md:px-0 min-w-[600px] md:min-w-0">
                    {/* Card 1 */}
                    <div className="flex-shrink-0 w-72 p-6 rounded-xl  bg-[#ECF0F4] text-left">
                        <h3 className="text-2xl font-bold mb-1">$0 <span className="text-sm font-normal">/ Free</span></h3>
                        <p className="text-gray-600 mb-4">Perfect for small gatherings</p>
                        <ul className="space-y-2 text-sm text-gray-700 mb-6">
                            <li className="flex items-center text-lg text-black "><span className="mr-2"><CheckCircle size={18} /></span> Up To 10 Guests</li>
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} /></span> 5 Photos Per Guest</li>
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} /></span> Default Overlays</li>
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} /></span> 3-Day Photo Storage</li>
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} /></span> Ad-Supported</li>
                        </ul>
                        <button className="w-full rounded-full bg-gray-300 text-gray-600 py-2 font-medium cursor-not-allowed">
                            Activated
                        </button>
                    </div>

                    {/* Card 2 */}
                    <div className="flex-shrink-0 w-72 p-6 rounded-xl border  bg-[#ECF0F4] border-cyan-400 text-left">
                        <h3 className="text-2xl font-bold mb-1">$14.99 <span className="text-sm font-normal">/ Event</span></h3>
                        <p className="text-gray-600 mb-4">Perfect for small gatherings</p>
                        <ul className="space-y-2 text-sm text-gray-700 mb-6">
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} className=" text-b" /></span> All Included in Free</li>
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} className=" text-b" /></span> 5 Photos Per Guest</li>
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} className=" text-b" /></span> Default Overlays</li>
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} className=" text-b" /></span> 3-Day Photo Storage</li>
                            <li className="flex items-center text-lg text-black"><span className="mr-2"><CheckCircle size={18} className=" text-b" /></span> Ad-Free Experience</li>
                        </ul>
                        <button className="w-full rounded-full bg-cyan-400 text-white py-2 font-medium">
                            Select
                        </button>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default PricingSection;
