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
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center border border-gray-300 shadow-md rounded-lg">
        <input
          type="text"
          placeholder="How to cook bolognese..."
          className="w-full py-2 px-4 pr-16 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        
          />
        <button
          className={`${
            isFavorite ? 'text-red-500' : 'text-gray-500'
          } bg-transparent p-2 rounded-lg hover:bg-opacity-80`}
          onClick={handleFavoriteClick}
        >
         
          <FiSend size={24} />
        </button>
       
        <button className="bg-primary text-white p-2 rounded-lg hover:bg-opacity-80">
          <FiHeart size={24} />
        </button>
      </div>
    </div>
  );
};


