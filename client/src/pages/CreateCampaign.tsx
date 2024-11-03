import React, { useState } from 'react';
import { Loader } from '../components';
import { useStateContext } from '../context';
import { ethers } from 'ethers';
import { BigNumber } from 'ethers';

// Define the type for form data
interface CampaignForm {
    title: string;
    description: string;
    target: string; // Keeping it as a string for form input
    deadline: string; // Date input will be a string in 'YYYY-MM-DD' format
    image: string; // Image URL can also be a string
}

const CreateCampaign: React.FC = () => {
    const [formData, setFormData] = useState<CampaignForm>({
        title: '',
        description: '',
        target: '',
        deadline: '',
        image: '',
    });
    
    const { createCampaign } = useStateContext();
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        try {
            setLoading(true);
            // Convert target to BigNumber before passing to createCampaign
            await createCampaign({ ...formData }); // Adjusting target to pass BigNumber
        } catch (error) {
            console.error("Error creating campaign:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {loading ? <Loader /> : 
            <div className="max-w-lg my-10 mx-auto p-8 bg-[#1c1c24] rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Create Campaign</h2>
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Title */}
                    <div>
                        <label className="block text-white font-medium mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-[#2c2f32] text-white focus:outline-none"
                            placeholder="Enter campaign title"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div>
                        <label className="block text-white font-medium mb-2">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            rows={4}
                            className="w-full p-2 rounded-md bg-[#2c2f32] text-white focus:outline-none"
                            placeholder="Enter campaign description"
                            required
                        ></textarea>
                    </div>

                    {/* Target */}
                    <div>
                        <label className="block text-white font-medium mb-2">Target</label>
                        <input
                            type="text"
                            name="target"
                            value={formData.target}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-[#2c2f32] text-white focus:outline-none"
                            placeholder="Enter target amount"
                            required
                        />
                    </div>

                    {/* Deadline */}
                    <div>
                        <label className="block text-white font-medium mb-2">Deadline</label>
                        <input
                            type="date"
                            name="deadline"
                            value={formData.deadline}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-[#2c2f32] text-white focus:outline-none"
                            required
                        />
                    </div>

                    {/* Image URL */}
                    <div>
                        <label className="block text-white font-medium mb-2">Image URL</label>
                        <input
                            type="text"
                            name="image"
                            value={formData.image}
                            onChange={handleInputChange}
                            className="w-full p-2 rounded-md bg-[#2c2f32] text-white focus:outline-none"
                            placeholder="Enter image URL"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        className="w-full py-2 mt-4 text-white bg-[#4CAF50] rounded-lg hover:bg-[#45A049] focus:outline-none"
                    >
                        Submit Campaign
                    </button>
                </form>
            </div>}
        </div>
    );
};

export default CreateCampaign;
