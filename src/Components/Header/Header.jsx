import React, { useState } from 'react';

const Header = ({ setHeader }) => {
    const [imageURL, setImageURL] = useState('');
    const [heading, setHeading] = useState('');
    const [description, setDescription] = useState('');

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setImageURL(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleHeadingChange = (e) => {
        setHeading(e.target.value);
    };

   
    const saveHeader = () => {
        setHeader({ heading });
        alert('Header saved Successfully');
    };

    return (
        <div className="rounded-lg text-center">
            

            <div>
                <label className="block mt-2 mb-2 text-gray-800 font-bold text-xl text-left">Form Title :</label>

                <input
                    type="text"
                    placeholder="Enter Title"
                    value={heading}
                    onChange={handleHeadingChange}
                    className="bg-gray-100 block w-full rounded-md border-slate-600 py-2 px-3 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm mb-2"
                />           
            </div>
            <div className="mb-4 mt-6 text-left">
                
                <label htmlFor="imageInput" className="block cursor-pointer flex flex-col items-left font-bold text-lg text-gray-800">Upload Header Image: 
                    
                    <input
                        type="file"
                        id="imageInput"
                        className="input mt-2"
                        accept="image/*"
                        onChange={handleImageChange}
                    />
                </label>
            </div>
        
            <button
                onClick={saveHeader}
                className="mt-6 bg-fuchsia-500 hover:bg-fuchsia-600 text-white py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-fuchsia-500 block mx-auto"
            >
                Save Header
            </button>
        </div>
    );
};

export default Header;
