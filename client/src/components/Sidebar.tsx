import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { logo, sun } from '../assets';
import { navlinks } from '../constants';

// Define the type for a single navlink
interface NavLink {
    name: string;
    imgUrl: string;
    link: string;
    disabled?: boolean;
}

// Define the props for the Icon component
interface IconProps {
    styles?: string;
    name: string;
    imgUrl: string;
    isActive: string;
    disabled?: boolean;
    handleClick: () => void;
}

const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => {
    return (
        <div
            className={`w-[48px] h-[48px] rounded-[10px] ${isActive === name ? 'bg-[#2c2f32]' : ''} flex justify-center items-center ${
                !disabled ? 'cursor-pointer' : ''
            } ${styles}`}
            onClick={handleClick}
        >
            {!isActive ? (
                <img src={imgUrl} alt={`${name}_logo`} className="w-1/2 h-1/2" />
            ) : (
                <img src={imgUrl} alt={`${name}_logo`} className={`w-1/2 h-1/2 ${isActive !== name ? 'grayscale' : ''}`} />
            )}
        </div>
    );
};

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState<string>('dashboard');

    return (
        <div className="flex justify-between items-center flex-col fixed top-0 left-0 h-screen w-[76px] bg-[#1c1c24] pt-5 z-50">
            <Link to="/">
                <Icon styles="w-[52px] h-[52px] bg-[#2c2f32] my-2" imgUrl={logo} name="logo" isActive={isActive} handleClick={() => navigate('/')} />
            </Link>

            <div className="flex-1 flex flex-col justify-between items-center rounded-[20px] py-4 mt-12">
                <div className="flex flex-col justify-center items-center gap-3">
                    {navlinks.map((link: NavLink) => (
                        <Icon
                            key={link.name}
                            {...link}
                            isActive={isActive}
                            handleClick={() => {
                                if (!link.disabled) {
                                    setIsActive(link.name);
                                    navigate(link.link);
                                }
                            }}
                        />
                    ))}
                </div>

                <Icon styles="bg-[#1c1c24] shadow-secondary" imgUrl={sun} name="sun" isActive={isActive} handleClick={() => {}} />
            </div>
        </div>
    );
};

export default Sidebar;
