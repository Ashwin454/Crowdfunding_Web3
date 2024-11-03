// src/pages/Profile.tsx
import React, { useState, useEffect } from 'react';
import { useStateContext } from '../context';
import { DisplayCampaigns } from '../components';

interface ParsedCampaign {
    owner: string;
    title: string;
    description: string;
    target: string; // Formatted as string (ether)
    deadline: number; // Converted to a number
    amountCollected: string; // Formatted as string (ether)
    image: string;
    pid: number; // Index
}

const Profile: React.FC = () => {
    const [loading, setIsLoading] = useState<boolean>(false);
    const [campaigns, setCampaigns] = useState<ParsedCampaign[]>([]); // Initialize as an array

    const { address, contract, getCampaigns } = useStateContext();

    const fetchCampaigns = async () => {
        setIsLoading(true);
        try {
            const data: ParsedCampaign[] = await getCampaigns();
            const filteredCampaigns = data.filter(campaign => campaign.owner.toLowerCase() === address?.toLowerCase());
            setCampaigns(filteredCampaigns);
        } catch (error) {
            console.error("Failed to fetch campaigns: ", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        if (contract && address) { // Ensure address is defined
            fetchCampaigns();
            console.log("Campaigns: ", campaigns);
        }
    }, [address, contract]);

    return (
        <div>
            <DisplayCampaigns
                loading={loading} // Pass loading state correctly
                campaigns={campaigns} // Pass campaigns state correctly
            />
        </div>
    );
};

export default Profile;
