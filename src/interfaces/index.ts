interface Job {
    job_id: string;
    job_title: string;
    employer_name: string;
    job_description: string;
    employer_logo: string | null;
    job_employment_type: string;
    job_posted_at_datetime_utc: string;
    job_city: string;
    job_country: string;
    job_state: string;
    job_is_remote: boolean;
    employer_website?: string;
    job_apply_link: string;
};

interface UserProfile {
    name: string;
    desiredJobTitle: string;
    aboutMe: string;
};

interface JobCardProps {
    job: {
        job_id: string;
        job_title: string;
        employer_name: string;
        job_description: string;
        employer_logo: string | null;
    };
};

interface SearchFormProps {
    onSearch: (query: string) => void;
};

interface AuthContextProps {
    isLoggedIn: boolean;
    setIsLoggedIn: (value: boolean) => void;
};
