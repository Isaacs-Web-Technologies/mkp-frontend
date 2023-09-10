'use client'
import {useState}from 'react';
import { FiSend, FiHeart } from 'react-icons/fi';

export const SearchBar = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleFavoriteClick = () => {
    setIsFavorite(!isFavorite);

    // Here, you can implement your logic to save or remove the search text.
    if (!isFavorite) {
      // Save the search text
      console.log('Saved search:', searchText);
    } else {
      // Remove the search text
      console.log('Removed search:', searchText);
    }
  };

  return (
    <div className="relative w-full lg:max-w-[75%] max-w-md mx-auto pt-12 pb-10 font-poppins">
      <div className="flex items-center border border-gray-800 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="How to cook bolognese..."
          className="w-full py-2 px-4 pr-16 rounded-lg border-none "
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        
          />
        <button
          className={`${
            isFavorite ? 'text-red-500' : 'text-gray-500'
          } border-none bg-transparent p-2 rounded-lg hover:bg-opacity-80`}
          onClick={handleFavoriteClick}
        >
         
          <FiSend size={24} />
        </button>
       
        <button className="bg-white text-red-500 border-none ml-2 p-2 rounded-full shadow-md hover:bg-opacity-80">
          <FiHeart size={24} />
        </button>
      </div>
    </div>
  );
};


