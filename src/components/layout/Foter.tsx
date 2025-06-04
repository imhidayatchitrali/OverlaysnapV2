const Footer = () => {
  return (
    <footer className="w-full mt-5 bg-[#ECF0F4] py-8 px-6 md:px-12 relative rounded-t-3xl">
    
      {/* Content wrapper */}
      <div className="max-w-7xl mx-auto">
        <h4 className="text-lg font-semibold mb-5">Quick Menu</h4>

        <div className="flex  gap-6 md:gap-12 mb-6">
          <a href="#" className="font-bold underline">ABOUT US</a>
          <a href="#" className="font-bold underline">TERMS</a>
          <a href="#" className="font-bold underline">SUPPORT</a>
          <a href="#" className="font-bold underline">FAQ’S</a>
        </div>

        <hr className="border-gray-300 mb-4" />

        <p className="text-sm text-gray-700">@ 2025 Overlay Pix. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
