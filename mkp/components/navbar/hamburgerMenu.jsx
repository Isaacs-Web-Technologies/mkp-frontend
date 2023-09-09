import { FaBars, FaTimes } from 'react-icons/fa';

export const HamburgerMenu = ({ isActive, onClick }) => {
  return (
    <button
      className="md:hidden   text-gray-700 border-none focus:outline-none"
      onClick={onClick}
    >
      {isActive ? (
        <FaTimes size={30} color="gray" />
      ) : (
        <FaBars size={30} color="gray" />
      )}
    </button>
  );
};


