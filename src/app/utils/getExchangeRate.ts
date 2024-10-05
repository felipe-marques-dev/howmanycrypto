import axios from "axios";
export const fetchCovertedPrices = async (fiat1: string, fiat2: string, amount: number ) => {
    try{
        const apiKey = process.env.NEXT_PUBLIC_EXCHANGERATE_API_KEY
        const response = await axios.get(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fiat1}/${fiat2}/${amount}`)
        const data = response.data.conversion_result;
        
        return data
    }
    catch(error){
        return error
    }
}