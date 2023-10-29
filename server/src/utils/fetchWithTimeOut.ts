import axios from "axios";

export const fetchData = async (url: string) => {
    try {
      const response = await axios.get(url);
      return response.data; // Return the response data
    } catch (error:any) {
      console.error('Fetch error:', error.message);
      return null; // Handle the error appropriately
    }
  };