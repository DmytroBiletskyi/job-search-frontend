"use client";

import { useParams } from 'next/navigation';
import { useJobs } from '@/services/useJobs';
import Image from 'next/image';
import React from 'react';
import img from '../../../../public/not-found.png';


const JobDetails: React.FC = () => {
  const params = useParams();
  const job_id = decodeURIComponent(params.id as string);

  const { jobs, isLoading, isError } = useJobs(`/job-details?job_id=${job_id}`);

  if (isLoading) {
    return <p>Loading job details...</p>;
  }

  if (isError || !jobs || jobs.data.length === 0) {
    return <p>Error loading job details or no job found.</p>;
  }

  const job: Job = jobs.data[0];
  const fallbackImage = img;

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row items-start">
        {job.employer_logo ? (
          <Image
            src={job.employer_logo}
            alt={job.job_title}
            width={200}
            height={200}
            className="object-cover rounded"
          />
        ) : (
          <Image
            src={fallbackImage}
            alt="Fallback Image"
            width={200}
            height={200}
            className="object-cover rounded"
          />
        )}
        <div className="ml-4">
          <h1 className="text-3xl font-bold mb-2">{job.job_title}</h1>
          <p className="text-lg">{job.employer_name}</p>
          <div className="text-md mt-2">
            <strong>Location:</strong>
            <ul>
              <li>City: {job.job_city}</li>
              <li>State: {job.job_state}</li>
              <li>Country: {job.job_country}</li>
            </ul>
          </div>
          <p className="text-md mt-2"><strong>Job Type:</strong> {job.job_employment_type}</p>
          <p className="text-md mt-2"><strong>Remote:</strong> {job.job_is_remote ? 'Yes' : 'No'}</p>
          <p className="text-md mt-2"><strong>Posted on:</strong> {new Date(job.job_posted_at_datetime_utc).toLocaleDateString()}</p>
          {job.employer_website && (
            <p className="text-md mt-2"><strong>Website:</strong> <a href={job.employer_website} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer">{job.employer_website}</a></p>
          )}
          <p className="mt-4 text-gray-600">{job.job_description}</p>
          <p className="text-md mt-2"><a href={job.job_apply_link} className="text-blue-500 underline" target="_blank" rel="noopener noreferrer"><strong>Click to apply</strong></a></p>
        </div>
      </div>
    </div>
  );
};

export default JobDetails;