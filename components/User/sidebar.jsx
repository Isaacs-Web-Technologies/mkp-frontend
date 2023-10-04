import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-primary text-white min-h-screen w-64 p-4">
      <ul className="space-y-4">
        <li>
          <a href="#" className="block hover:text-secondary">
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="block hover:text-secondary">
            History
          </a>
        </li>
        <li>
          <a href="#" className="block hover:text-secondary">
            Recipes
          </a>
        </li>
        <li>
          <a href="#" className="block hover:text-secondary">
            New Chat
          </a>
        </li>
        <li>
          <a href="#" className="block hover:text-secondary">
            Favorites
          </a>
        </li>
        <li>
          <a href="#" className="block hover:text-secondary">
            Activities
          </a>
        </li>
      </ul>
      <div className="mt-auto">
        <ul className="space-y-4">
          <li>
            <a href="#" className="block hover:text-secondary">
              Settings
            </a>
          </li>
          <li>
            <a href="#" className="block hover:text-secondary">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
