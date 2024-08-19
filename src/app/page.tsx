"use client"

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';

const Home = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const savedProfile = Cookies.get('profile');
        
        if (savedProfile) {
          setProfile(JSON.parse(savedProfile));
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto p-6">
        <h1 className="text-4xl font-bold mb-6">Welcome to Our Job Portal</h1>
        {profile ? (
          <div className="mb-6 bg-white p-4 rounded shadow">
            <h2 className="text-2xl font-semibold">Hello, {profile.name}!</h2>
            <p className="text-lg text-gray-600">
              Looking for {profile.desiredJobTitle} positions?
            </p>
          </div>
        ) : (
          <p className="text-lg mb-4">
            Please log in to see personalized job recommendations.
          </p>
        )}
        <p className="text-lg mb-4">
          We help you find the perfect job. Search for jobs that match your skills and apply today!
        </p>
        <p className="text-lg mb-4">
          Our company connects professionals with top employers across various industries. Start your career journey with us.
        </p>
        <Link href="/jobs" className="text-blue-500 underline">
          Go to Job Search
        </Link>
      </div>
    </div>
  );
};

export default Home;
