import React from 'react';
import { tagType, thirdweb } from '../assets';
import { BigNumber } from 'ethers';

// Define the types for the props
interface FundCardProps {
    owner: string;
    title: string;
    description: string;
    target: string; // Assuming target is a string representing the target amount
    deadline: number; // Deadline can be a string or Date
    amountCollected: string; // Assuming amountCollected is a string representing the collected amount
    image: string;
    onClick: () => void; // Function to handle clicks
}

// Function to calculate remaining days until the deadline
const daysLeft = (deadline: number): number => {
    const deadlineDate = new Date(deadline);
    const now = Date.now();
    const timeDiff = deadlineDate.getTime() - now;
    const daysRemaining = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Convert milliseconds to days
    return daysRemaining >= 0 ? daysRemaining : 0; // Return 0 if the deadline has passed
}

const FundCard: React.FC<FundCardProps> = ({ owner, title, description, target, deadline, amountCollected, image, onClick }) => {
    const remainingDays = daysLeft(deadline);
    
    return (
        <div className="sm:w-[288px] w-full rounded-[15px] bg-[#1c1c24] cursor-pointer" onClick={onClick}>
            <img src={image} alt="fund" className="w-full h-[158px] object-cover rounded-[15px]"/>

            <div className="flex flex-col p-4">
                <div className="flex flex-row items-center mb-[18px]">
                    <img src={tagType} alt="tag" className="w-[17px] h-[17px] object-contain"/>
                    <p className="ml-[12px] mt-[2px] font-epilogue font-medium text-[12px] text-[#808191]">Education</p>
                </div>

                <div className="block">
                    <h3 className="font-epilogue font-semibold text-[16px] text-white text-left leading-[26px] truncate">{title}</h3>
                    <p className="mt-[5px] font-epilogue font-normal text-[#808191] text-left leading-[18px] truncate">{description}</p>
                </div>

                <div className="flex justify-between flex-wrap mt-[15px] gap-2">
                    <div className="flex flex-col">
                        <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{amountCollected}</h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Raised of {target}</p>
                    </div>
                    <div className="flex flex-col">
                        <h4 className="font-epilogue font-semibold text-[14px] text-[#b2b3bd] leading-[22px]">{remainingDays}</h4>
                        <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px] text-[#808191] sm:max-w-[120px] truncate">Days Left</p>
                    </div>
                </div>

                <div className="flex items-center mt-[20px] gap-[12px]">
                    <p className="flex-1 font-epilogue font-normal text-[12px] text-[#808191] truncate">by <span className="text-[#b2b3bd]">{owner}</span></p>
                </div>
            </div>
        </div>
    );
}

export default FundCard;
