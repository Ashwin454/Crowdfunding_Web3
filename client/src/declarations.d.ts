declare module './pages' {
    export const CampaignDetails: React.FC;
    export const CreateCampaign: React.FC;
    export const Home: React.FC;
    export const Profile: React.FC;
}
declare module '*.svg' {
    const content: any;
    export default content;
}
declare module '*.png' {
    const content: any;
    export default content;
}
// src/declarations.d.ts

declare module './constants' {
    export const navlinks: {
      name: string;
      imgUrl: string;
      link: string;
      disabled?: boolean;
    }[];
  }
  
  declare module './assets' {
    const assets: {
      createCampaign: string;
      dashboard: string;
      logout: string;
      payment: string;
      profile: string;
      withdraw: string;
    };
    export default assets;
  }
  
  // Add more declarations for other modules if necessary
  