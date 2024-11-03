import React from "react";
import { Route, Routes } from 'react-router-dom';
import { CampaignDetails, CreateCampaign, Home, Profile } from './pages';
import { Sidebar, Navbar } from "./components";

const App = () => {
    return (
        <div className="relative p-4 bg-[#13131a] min-h-screen flex flex-row">
            {/* Always render the sidebar */}
            <div className="flex mr-10">
                <Sidebar />
            </div>

            <div className="flex flex-col flex-1 max-w-[full] mx-auto ml-10 my-0 sm:pr-5">
                {/* Navbar is still here if you want it for extra navigation, or you can remove it */}
                <Navbar />

                <div className="flex-1">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/create-campaign" element={<CreateCampaign />} />
                        <Route path="/campaign-details/:id" element={<CampaignDetails />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default App;
