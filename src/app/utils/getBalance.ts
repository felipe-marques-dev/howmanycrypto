import axios from 'axios';

export const fetchBalances = async (address: string, chainName: string) => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY
      const response = await axios.get(`https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_v2/?key=${apiKey}`);
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