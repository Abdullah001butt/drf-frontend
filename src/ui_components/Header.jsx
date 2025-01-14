import React from "react";
import banner from "../images/tech-girl.jpg";

const Header = ({ showNavBar }) => {
  return (
    <section className={`max-container padding-x py-8 relative transition-all duration-300 ${
      showNavBar ? 'mt-80' : 'mt-28'
    }`}>
      <div className="relative w-full h-[500px] overflow-hidden rounded-2xl shadow-xl group">
        <img
          src={banner}
          className="w-full h-full object-cover rounded-2xl transform scale-100 group-hover:scale-105 transition-transform duration-700"
          alt="Technology Banner"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/80" />
        
        <div className="absolute bottom-12 left-12 text-white max-w-3xl">
          <h1 className="text-5xl font-bold mb-4 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
            Welcome to DevFolio
          </h1>
          <p className="text-xl text-gray-200 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100 leading-relaxed">
            Explore the world of technology and development through our curated content
          </p>
        </div>
      </div>
    </section>
  );
};

export default Header;
