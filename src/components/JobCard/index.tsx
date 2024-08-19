import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import img from '../../../public/not-found.png';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';


const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [liked, setLiked] = useState(() => {
    const likedJobs = JSON.parse(localStorage.getItem('likedJobs') || '[]');
    return likedJobs.some((likedJob: any) => likedJob.job_id === job.job_id);
  });

  const fallbackImage = img;
  const descriptionLength = 100;

  const handleToggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const handleLike = () => {
    let likedJobs = JSON.parse(localStorage.getItem('likedJobs') || '[]');
    if (liked) {
      likedJobs = likedJobs.filter((likedJob: any) => likedJob.job_id !== job.job_id);
    } else {
      likedJobs.push(job);
    }
    localStorage.setItem('likedJobs', JSON.stringify(likedJobs));
    setLiked(!liked);
  };

  return (
    <div className="border p-4 rounded shadow-sm relative">
      {job.employer_logo ? (
        <Image 
          src={job.employer_logo} 
          alt={job.job_title} 
          width={500} 
          height={300} 
          className="w-full h-32 object-cover rounded"
          priority
        />
      ) : (
        <Image 
          src={fallbackImage} 
          alt="Fallback Image" 
          width={500} 
          height={300} 
          className="w-full h-32 object-cover rounded"
          priority
        />
      )}
      <div className="absolute top-2 right-2 cursor-pointer" onClick={handleLike}>
        {liked ? (
          <AiFillHeart className="text-red-500 text-2xl" />
        ) : (
          <AiOutlineHeart className="text-gray-500 text-2xl" />
        )}
      </div>
      <h2 className="text-xl font-semibold mt-2">{job.job_title}</h2>
      <p>{job.employer_name}</p>
      <p className="text-sm text-gray-600 mt-2">
        {isExpanded
          ? job.job_description
          : `${job.job_description.slice(0, descriptionLength)}...`}
        {job.job_description.length > descriptionLength && (
          <button
            onClick={handleToggleDescription}
            className="text-blue-500 underline ml-1"
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </p>
      <Link href={`/job-details/${job.job_id}`}>
        <button className="bg-blue-500 text-white p-2 rounded mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">Details</button>
      </Link>
    </div>
  );
};

export default JobCard;
