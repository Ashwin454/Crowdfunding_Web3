import { useNavigate } from "react-router-dom";
import Loader from "./loader";
import FundCard from "./fundcard";

interface ParsedCampaign {
    owner: string;
    title: string;
    description: string;
    target: string; // Formatted as string (ether)
    deadline: string | Date; // Converted to a number
    amountCollected: string; // Formatted as string (ether)
    image: string;
    pid: number; // Index
}

interface DisplayCampaignsProps {
    loading: boolean; // Type for loading
    campaigns: ParsedCampaign[]; // Type for campaigns
}

const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({ loading, campaigns }) => {
    const navigate = useNavigate();

    const handleClick = (campaign: ParsedCampaign) => {
        navigate(`/campaign-details/${campaign.title}`, { state: campaign });
    };

    return (
        <div>
            <h1 className="font-epilogue font-semibold text-[18px] text-white text-left">
                All Campaigns ({campaigns.length})
            </h1>

            <div className="flex flex-wrap mt-[20px] gap-[26px]">
                {loading && <Loader />}

                {!loading && campaigns.length === 0 && (
                    <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
                        You have not created any campaigns yet
                    </p>
                )}

                {!loading && campaigns.length > 0 && campaigns.map((campaign) => (
                    <FundCard 
                        key={campaign.pid}
                        {...campaign}
                        onClick={() => handleClick(campaign)}
                    />
                ))}
            </div>
        </div>
    );
};

export default DisplayCampaigns;
