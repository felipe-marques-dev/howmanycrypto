import axios from 'axios';

export const fetchBalances = async (url: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY
      const response = await axios.get(url);
      const data = await response.data;
      if (data && data.data && data.data.items) {
        return data.data.items;
      } else { 
        return []; 
      } 
    }catch (error) {
      return [];
    }
  };