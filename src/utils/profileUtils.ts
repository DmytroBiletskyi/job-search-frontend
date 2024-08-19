import axios from 'axios';
import Cookies from 'js-cookie';

export const fetchAndSaveUserProfile = async (email: string) => {
  try {
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}profile`, {
      params: { email },
    });
    const userProfile = res.data;
    Cookies.set('profile', JSON.stringify(userProfile));
    return userProfile;
  } catch (error) {
    console.error("Failed to fetch profile", error);
    throw error;
  }
};