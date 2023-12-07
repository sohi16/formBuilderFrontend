
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';


const LeftMenu = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const handleItemClick = (componentName) => {
    setSelectedComponent(componentName);
  };

  return (
    <div className="bg-gray-100 h-full p-4">
      <h2 className='text-gray-900 font-bold text-xl'>Menu</h2>
      <ul className='mt-6 text-lg'>
        <li className='p-4 hover:bg-gray-200 cursor-pointer' >
          <NavLink to="/create" onClick={() => handleItemClick('CreateForm')}>Create Form</NavLink>
        </li>
        <li className='p-4 hover:bg-gray-200'>
          <NavLink to="/view" onClick={() => handleItemClick('View')}>View Forms</NavLink>
        </li>
      </ul>
     
    </div>
  );
};

export default LeftMenu;
