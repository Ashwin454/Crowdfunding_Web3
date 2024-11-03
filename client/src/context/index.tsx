import React, { useContext, createContext, ReactNode } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from '@thirdweb-dev/react';
import { ethers, BigNumber } from 'ethers';

// Define the type for form data in publishCampaign
interface CampaignForm {
    title: string;
    description: string;
    target: string;
    deadline: string | Date;
    image: string;
}
interface Data {
    donators: string[]; // Array of addresses (strings)
    donations: (number | BigNumber)[]; // Array of donation amounts, as BigNumber instances
}

// Define the type for a campaign fetched from the contract
interface Campaign {
    owner: string;
    title: string;
    description: string;
    target: BigNumber; // Assuming target is a BigNumber from ethers.js
    deadline: BigNumber; // Assuming deadline is also a BigNumber
    amountCollected: BigNumber; // Assuming this is also a BigNumber
    image: string;
}

// Define the type for the parsed campaign
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

// Define the type for the context value
interface StateContextType {
    address: string | undefined;
    connect: () => void; // Specify type for connect
    contract: any; // Ideally, provide a more specific type for the contract
    createCampaign: (form: CampaignForm) => Promise<void>;
    getCampaigns: () => Promise<ParsedCampaign[]>; // Specify return type as a promise of ParsedCampaign array
    donate: (pId: number, amount: string) => Promise<Omit<{ receipt: ethers.providers.TransactionReceipt; data: () => Promise<unknown>; }, "data"> | undefined>; // Update the return type here
    getDons: (pId: number) => Object
}


interface Donator {
    address: string;  // Assuming the address is a string
    donationAmount: number;  // Assuming donations are represented as numbers
}

interface DonatorsResponse {
    donators: Donator[];  // Array of donators
    donations: number[];   // Array of donation amounts corresponding to each donator
}

const StateContext = createContext<StateContextType | undefined>(undefined);

interface StateProviderProps {
    children: ReactNode;
}

export const StateProvider: React.FC<StateProviderProps> = ({ children }) => {
    const address = useAddress();
    const connect = useMetamask();
    const { contract } = useContract('0x4beA5Dfe0885A9e2F846373f1ac8a304A6758552');
    const { mutateAsync: createCampaign } = useContractWrite(contract, 'createCampaign');
    const { mutateAsync: donateToCampaign } = useContractWrite(contract, 'donateToCampaign'); // Move this outside donate function

    const publishCampaign = async (form: CampaignForm) => {
        try {
            const data = await createCampaign({
                args: [
                    address,
                    form.title,
                    form.description,
                    ethers.utils.parseUnits(form.target, 'ether'),
                    Math.floor(new Date(form.deadline).getTime() / 1000),
                    form.image
                ]
            });
            console.log("Contract call success", data);
        } catch (error) {
            console.error("Contract call failure", error);
        }
    };

    const getCampaigns = async (): Promise<ParsedCampaign[]> => {
        const campaigns: Campaign[] = await contract?.call('getCampaigns') || [];
        return campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
            image: campaign.image,
            pid: i
        }));
    };

    const donate = async (pId: number, amount: string) => {
        try {
            console.log("Amount as string:", amount);
    
            // Check if amount is defined and is a valid number
            if (!amount || isNaN(Number(amount))) {
                throw new Error("Invalid amount provided.");
            }
    
            // Remove commas and convert to BigNumber
            const cleanAmount = amount.replace(/,/g, ''); // Remove commas
            const amt: BigNumber = ethers.utils.parseEther(cleanAmount);
            console.log("Parsed amount as BigNumber:", amt.toString());
            console.log("Pid: ", pId);
            // Call donateToCampaign with the campaign ID and value in the overrides
            const data = await donateToCampaign({
                args: [pId], // Pass the campaign ID directly
                overrides: {
                    value: amt  // Pass the value in the overrides
                }
            });
    
            console.log("Transaction data:", data);
            return data;
        } catch (error) {
            console.error("Error in donateToCampaign:", error);
        }
    };
        
    const getDons = async (pId: number): Promise<Data | null> => {
        try {
            const [donatorsData, donationsData]: [string[], BigNumber[]] = await contract?.call('getDonators', [pId]);
    
            console.log(donatorsData, donationsData);
    
            const donators: string[] = donatorsData; // Assuming donatorsData is already a string array
            const donations: (number | BigNumber)[] = donationsData.map(donation => donation.toNumber()); // Convert BigNumber to number if necessary
    
            return {
                donators,
                donations,
            };
        } catch (error) {
            console.error('Error fetching donators:', error);
            return null; // Ensure you return null in case of an error
        }
    };
        

    
    return (
        <StateContext.Provider
            value={{
                address,
                contract,
                createCampaign: publishCampaign,
                connect,
                getCampaigns,
                donate,
                getDons
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

// Custom hook to use the context with proper type checking
export const useStateContext = (): StateContextType => {
    const context = useContext(StateContext);
    if (!context) {
        throw new Error('useStateContext must be used within a StateProvider');
    }
    return context;
};
