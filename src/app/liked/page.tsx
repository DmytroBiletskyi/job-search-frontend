"use client"

import React, { useState, useEffect } from 'react';
import JobCard from '../../components/JobCard';
import { useRouter } from 'next/navigation';

const LikedJobsPage = () => {
  const [likedJobs, setLikedJobs] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const jobs = JSON.parse(localStorage.getItem('likedJobs') || '[]');
    setLikedJobs(jobs);
  }, [router]);

  const handleRemove = (id: string) => {
    const updatedJobs = likedJobs.filter((job: any) => job.job_id !== id);
    setLikedJobs(updatedJobs);
    localStorage.setItem('likedJobs', JSON.stringify(updatedJobs));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">Liked Jobs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {likedJobs.length === 0 && (
          <p className="text-center text-gray-600">You haven&apos;t liked any jobs yet.</p>
        )}
        {likedJobs.map((job: any) => (
          <div key={job.job_id} className="relative bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-shadow duration-300">
            <JobCard job={job} />
            <button
              onClick={() => handleRemove(job.job_id)}
              className="absolute top-2 right-2 bg-red-500 text-white p-2 rounded mt-4 shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LikedJobsPage;