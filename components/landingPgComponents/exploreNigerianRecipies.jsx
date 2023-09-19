'use client'
import  { useState } from 'react';
import exploreNigerianRecipies from "@/data/exploreNigerianRecipies.json";
import Image from 'next/image';

export const ExploreNigerianRecipies = ({  }) => {
 
  const [showAll, setShowAll] = useState(false);

  const toggleCards = () => {
    setShowAll(!showAll);
  };

  const cardContainerStyle = {
    display: 'flex',
    flexWrap: 'nowrap',
    overflowX: showAll ? 'auto' : 'hidden',
  };

  return (
    <div className=' font-poppins'>
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-semibold">Explore Nigerian Recipes</h2>
      {exploreNigerianRecipies.length > 3 && (
        <button
          onClick={toggleCards}
          className="bg-transparent border rounded p-2 text-primary hover:bg-primary hover:text-white"
        >
          {showAll ? 'Collapse' : 'Expand'}
        </button>
      )}
    </div>

    <div style={cardContainerStyle} className="overflow-x-hidden">
      {exploreNigerianRecipies.map((recipe) => (
        <div
          key={recipe.id}
          className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <Image
              src={recipe.image}
              alt={recipe.title}
              width={500}
              height={500}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{recipe.title}</h3>
              <a href={recipe.link} className="text-primary">
                View Recipe
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
};