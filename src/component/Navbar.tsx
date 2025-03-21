"use client"

import Link from 'next/link';
import React, { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 text-white shadow-md">
      <div className="w-full max-w-[1440px] mx-auto  px-[20px]">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-xl font-bold">HOtlancer</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link href="/" className="px-3 py-2 rounded-md text-sm font-medium bg-gray-900">Home</Link>
              <Link href="/Linkbout" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">About</Link>
              <Link href="/services" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Services</Link>
              <Link href="/contact" className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700">Contact</Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={toggleMenu} 
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                xmlns="http://www.w3.org/2000/svg" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 rounded-md text-base font-medium bg-gray-900">Home</Link>
            <Link href="/Linkbout" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">About</Link>
            <Link href="/services" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Services</Link>
            <Link href="/contact" className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700">Contact</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;