import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStateContext } from '../context';
import { ethers } from 'ethers';
const Navbar: React.FC = () => {
    const navigate = useNavigate();
    const {address, connect} = useStateContext()
      
    const profileImageUrl = "https://via.placeholder.com/40"; // Replace this with the actual image URL or user's profile picture
    const mpb = async () =>{
        if(address){
            navigate('/create-campaign');
        }else{
            const a =await connect();
            console.log("connected: ", a);
        }
    }
    return (
        <nav className="flex items-center justify-between w-100 p-4 bg-[#1f1f2e] rounded-lg shadow-md">
            {/* Create Campaign Button */}
            <button
                onClick={mpb}
                className={`px-4 py-2 ml-4 text-white rounded-lg focus:outline-none ${
                    address ? 'bg-[#4CAF50] hover:bg-[#45A049]' : 'bg-[#cd7dff] hover:bg-[#ba4dff]'
                }`}
            >
                {address ? 'Create Campaign' : 'Connect Wallet'}
            </button>
            {/* Search Bar */}
            <div className="flex items-center w-1/2">
                <input
                    type="text"
                    placeholder="Search..."
                    className="w-full px-4 py-2 text-white bg-[#2a2a3a] rounded-lg outline-none placeholder-gray-500"
                />
            </div>

            

            {/* Profile Picture Button */}
            <div
                onClick={() => navigate('/profile')}
                className="ml-4 cursor-pointer"
            >
                <img
                    src={profileImageUrl}
                    alt="Profile"
                    className="w-10 h-10 rounded-full border-2 border-gray-300"
                />
            </div>
        </nav>
    );
};

export default Navbar;
