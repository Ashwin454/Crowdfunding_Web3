import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-[#1c1c24]">
            <div className="w-16 h-16 border-4 border-t-[#4CAF50] border-[#2c2f32] rounded-full animate-spin"></div>
        </div>
    );
};

export default Loader;
