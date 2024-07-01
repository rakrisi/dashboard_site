import { useState } from 'react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0 text-white mr-6">
          <span className="font-bold text-xl">MyLogo</span>
        </div>
        <div className="block lg:hidden">
          {/* Hamburger menu for mobile screens */}
          <button
            className="flex items-center px-3 py-2 border rounded text-gray-300 border-gray-400 hover:text-white hover:border-white"
            onClick={toggleMenu}
          >
            <svg
              className="h-3 w-3 fill-current"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path
                d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"
              />
            </svg>
          </button>
        </div>
        <div className={`w-full ${isOpen ? '' : 'hidden'} lg:block lg:flex lg:items-center lg:w-auto`}>
          <div className="text-sm lg:flex-grow">
            <a
              href="#"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
            >
              Home
            </a>
            <a
              href="#"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
            >
              About
            </a>
            <a
              href="#"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white mr-4"
            >
              Services
            </a>
            <a
              href="#"
              className="block mt-4 lg:inline-block lg:mt-0 text-gray-300 hover:text-white"
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
