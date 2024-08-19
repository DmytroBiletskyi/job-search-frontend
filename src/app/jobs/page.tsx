"use client";

import React, { useState, useEffect, useCallback } from 'react';
import JobSearch from '@/components/JobSearch';
import JobCard from '@/components/JobCard';
import { useJobs } from '@/services/useJobs';
import Cookies from 'js-cookie';



const JobsPage = () => {
  const [query, setQuery] = useState('');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { jobs, isLoading, isError } = useJobs(
    query
      ? `/search?query=${query}&page=${currentPage}&limit=10`
      : profile
      ? `/search?query=${profile.desiredJobTitle}&page=${currentPage}&limit=10`
      : null
  );

  useEffect(() => {
    const savedProfile = Cookies.get('profile');
    if (savedProfile) {
      const parsedProfile: UserProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
    }
  }, []);

  useEffect(() => {
    if (jobs?.total) {
      setTotalPages(Math.ceil(jobs.total / 10));
    }
  }, [jobs]);

  const handleSearch = useCallback((searchQuery: string) => {
    setQuery(searchQuery);
    setCurrentPage(1);
  }, []);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Job Search</h1>
      <JobSearch onSearch={handleSearch} />
      {isLoading && <p>Loading...</p>}
      {isError && <p>Error loading jobs.</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {Array.isArray(jobs?.data) && jobs.data.length > 0 ? (
          jobs.data.map((job: Job) => (
            <JobCard key={job.job_id} job={job} />
          ))
        ) : (
          <p>No jobs found.</p>
        )}
      </div>
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`p-2 rounded ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Previous
        </button>
        <span className="text-gray-700">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`p-2 rounded ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default JobsPage;
