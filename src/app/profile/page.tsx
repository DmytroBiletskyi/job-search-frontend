"use client"

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

const Profile = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const userProfile = Cookies.get('profile');
    
    if (userProfile) {
      try {
        const parsedProfile: UserProfile = JSON.parse(userProfile);
        setProfile(parsedProfile);
      } catch (error) {
        console.error('Error parsing user profile', error);
        setProfile(null); 
      }
    } else {
      setProfile(null);
    }
  }, []);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">{profile.name}</h1>
        <p className="mb-2">About Me: {profile.aboutMe}</p>
        <p className="mb-2">Desired Job Title: {profile.desiredJobTitle}</p>
      </div>
    </div>
  );
};

export default Profile;