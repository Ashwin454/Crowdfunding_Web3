import React, { useState, useEffect } from 'react';
import { useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { ethers, BigNumber } from 'ethers';
import { useStateContext } from '../context';
import { Loader } from '../components';

interface Donator {
    address: string;
    donationAmount: BigNumber; // Use BigNumber from ethers
}

interface Data {
    donators: string[]; // Array of addresses (strings)
    donations: BigNumber[]; // Array of donation amounts, as BigNumber instances
}

const CampaignDetails: React.FC = () => {
    const navigate = useNavigate();
    const { state } = useLocation();
    const [loading, setLoading] = useState(false);
    const [data1, setData1] = useState<Data | null>(null); // Start with null
    const { address, donate, getDons } = useStateContext();
    const [amount, setAmount] = useState<number>(0);

    const fund = async () => {
        if (amount <= 0) return; // Prevent funding with invalid amount
        setLoading(true);
        try {
            const data = await donate(state.pid, amount.toString());
            console.log(data);
            navigate('/');
        } catch (error) {
            console.error('Funding error:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedData: Data | null = await getDons(state.pid); // Ensure this returns the correct type
                setData1(fetchedData);
            } catch (error) {
                console.error('Fetching data error:', error);
            }
        };

        fetchData();
    }, [state.pid, getDons]);
    
    const donators = data1?.donators || [];
    const donations = data1?.donations || [];

    // Prepare donators data
    const donatorsData: Donator[] = donators.map((address: string, index: number) => ({
        address,
        donationAmount: donations[index] || BigNumber.from(0), // Default to BigNumber 0 if no donation is available
    }));
    const calculateDaysLeft = () => {
        const campaignEndDate: any = new Date(state.deadline);
        const currentDate: any = new Date();
        const timeDifference = campaignEndDate - currentDate;
        const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
        return daysLeft > 0 ? daysLeft : 0; // Return 0 if the campaign is already over
    };

    // Function to calculate the total donation amount in Ether
    const calculateTotalDonationAmount = () => {
        const totalAmount = donations.reduce((total, donation) => total.add(donation), BigNumber.from(0));
        return ethers.utils.formatEther(totalAmount); // Convert to Ether for display
    };

    // The number of donators
    const donatorsCount = donators.length;

    return (
        <div>
            {loading ? <Loader /> :
                <div>
                    <div className='flex w-full md:flex-row flex-col mt-10 gap-[30px]'>
                        <div className='flex-1 flex-col'>
                            <img src={state.image} className='w-full h-[530px] object-cover rounded-xl' alt="Campaign" />
                        </div>
                        <div className="flex md:flex-col gap-x-4 justify-between">
                            <div className="w-[104px] h-[104px] bg-[#1f1f2e] text-white flex flex-col items-center justify-between p-2 rounded-xl">
                                <p className='text-3xl'>{calculateDaysLeft()}</p>
                                <p className='text-xs mb-1'>Days left</p>
                            </div>
                            <div className="w-[104px] h-[104px] bg-[#1f1f2e] text-white flex flex-col items-center justify-between p-2 rounded-xl">
                                <p className='text-3xl'>{calculateTotalDonationAmount()}</p>
                                <p className='text-xs mb-1'>Amount</p>
                            </div>
                            <div className="w-[104px] h-[104px] bg-[#1f1f2e] text-white flex flex-col items-center justify-between p-2 rounded-xl">
                                <p className='text-3xl'>{donators.length}</p>
                                <p className='text-xs mb-1'>Donators</p>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row items-center justify-center bg-[#2c2c3a] p-4 rounded-lg shadow-md mt-[20px]">
                        <div className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-[#00BFFF]"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M10 2a6 6 0 00-6 6v1a1 1 0 01-1 1H1a1 1 0 000 2h2a1 1 0 011 1v1a1 1 0 001 1h12a1 1 0 001-1v-1a1 1 0 011-1h2a1 1 0 100-2h-2a1 1 0 01-1-1V8a6 6 0 00-6-6zM8 4a2 2 0 114 0 2 2 0 01-4 0z" />
                            </svg>
                            <span className="text-white text-lg font-semibold">Creator: {address}</span>
                        </div>
                    </div>
                    <div className='mt-[20px] flex flex-col bg-[#2c2c3a] p-3 rounded-lg'>
                        <div className='font-bold text-2xl text-white'>TITLE</div><hr /><br />
                        <div className='font-semibold text-xl text-white'>{state.title}</div>
                    </div>
                    <div className='mt-[20px] flex flex-col bg-[#2c2c3a] p-3 rounded-lg'>
                        <div className='font-bold text-2xl text-white'>STORY</div><hr /><br />
                        <div className='text-xl text-white'>{state.description}</div>
                    </div>
                    <div className='mt-[20px] flex flex-col bg-[#2c2c3a] p-3 rounded-lg'>
                        <div className='font-bold text-2xl text-white'>FUND THE CAMPAIGN</div><hr /><br />
                        <div className='flex'>
                            <input
                                type="number"
                                className='w-[600px] p-2 rounded-lg'
                                onChange={(e) => setAmount(parseFloat(e.target.value))}
                            />
                            <button
                                onClick={fund}
                                className={`px-4 py-2 ml-4 text-white rounded-lg focus:outline-none ${amount <= 0 ? 'bg-[#4CAF50] hover:bg-[#45A049] cursor-not-allowed' : 'bg-[#4CAF50] hover:bg-[#45A049]'}`}
                                disabled={amount <= 0} // Disable the button if amount is 0
                            >
                                Fund
                            </button>
                        </div>
                    </div>
                    <div className='mt-[20px] flex flex-col bg-[#2c2c3a] p-3 rounded-lg'>
                        <div className='font-bold text-2xl text-white'>DONATORS</div><hr /><br />
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full bg-[#2c2c3a]">
                            <thead>
                                <tr className="bg-gray-700">
                                    <th className="px-4 py-2 border text-white">Donator</th>
                                    <th className="px-4 py-2 border text-white">Donation Amount (ETH)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {donatorsData.map((donator, index) => (
                                    <tr key={index} className="hover:bg-gray-600">
                                        <td className="px-4 py-2 border text-white">{donator.address}</td>
                                        <td className="px-4 py-2 border text-white">
                                            {ethers.utils.formatEther(donator.donationAmount)} {/* Convert BigNumber from wei to ether */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            }
        </div>
    );
};

export default CampaignDetails;
