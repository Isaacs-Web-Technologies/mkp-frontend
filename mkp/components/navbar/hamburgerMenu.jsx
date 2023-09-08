import Image from "next/image";

const HamburgerMenu = ({ isActive, onClick }) => {
  return (
    <button
      className="md:hidden text-gray-700 focus:outline-none"
      onClick={onClick}
    >
      {isActive ? (
        <Image
          src="/assets/icons/close.svg"
          width={30}
          height={30}
          alt="close"
        />
      ) : (
        <Image
          src="/assets/icons/hamburger.svg"
          width={30}
          height={30}
          alt="hamburger"
        />
      )}
    </button>
  );
};

export default HamburgerMenu;
