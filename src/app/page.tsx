"use client";
/* eslint-disable */

// pages/index.tsx
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { fetchBalances } from "./utils/getBalance";
import { fetchCovertedPrices } from "./utils/getExchangeRate";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Particles from "@/components/ui/particles";
import Author from "@/components/Author";
import CryptoGrid from "@/components/CryptoGrid";
import { twMerge } from "tailwind-merge";


const Home = () => {
  const [balances, setBalances] = useState<any[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("0");
  const [chainName, setChainName] = useState<string>('');
  const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
  const [fiatId, setFiatId] = useState<string>('usd')
  const [prices, setPrices]= useState<number[]>([])

  const apiKey = process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY
  const url = `https://api.covalenthq.com/v1/${chainName}/address/${walletAddress}/balances_v2/?key=${apiKey}`;

  const chainClasses = twMerge('backdrop-blur-sm', 'h-12')

  useEffect(() => {
    setColor("#ffffff");
  }, [theme]);
 
  useEffect(() => {
    const getBalances = async () => {
      if (chainName && walletAddress){
        const fetchedBalances = await fetchBalances(url);
        setBalances(fetchedBalances)
      }
    }
    getBalances()
  }, [chainName, walletAddress]) 

  useEffect(() => {
    const convertPrices = async () => {
      if(balances.length > 0 && fiatId){
        const pricePromises = balances.map(async (token) => {
          const response = await fetchCovertedPrices('usd', fiatId, token.quote)
          const parsedPrice= parseFloat(response)
          if(isNaN(parsedPrice)){
            return 0;
          }
          return isNaN(parsedPrice)? 0 : Number(parsedPrice.toFixed(2))
          }
        )
        const prices = await Promise.all(pricePromises)
        setPrices(prices)
      }
      
    }
    convertPrices()
  },[fiatId, balances])


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    
    setChainName(value);
  };

  const handleFiatChange = (value: string ) => {
    setFiatId(value)
  }


  return (
    <div className=" flex flex-col min-h-screen w-full overflow-y items-center bg-background rounded-lg border md:shadow-xl">
      <span className="my-12 pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-800 to-gray-100 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        How Many Crypto?
      </span>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={90}
        color={color}
        refresh
        size={2}
      />
      <div className="my-16 min-h-screen backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-3xl font-bold text-white text-center">Wallet Viewer</h1>
        
        <Input 
          placeholder="Enter wallet address"
          onChange={handleInputChange}
          className="rounded-xl h-12 border-white/50 text-white placeholder-white/70"
        />
        
        <Select value={chainName} onValueChange={handleSelectChange}>
          <SelectTrigger className=" border-white/50 h-12 text-white rounded-xl ">
            <SelectValue placeholder="Select chain" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem className={chainClasses} value="btc-mainnet">Bitcoin</SelectItem>
            <SelectItem className={chainClasses} value="eth-mainnet">Ethereum</SelectItem>
            <SelectItem className={chainClasses} value="bsc-mainnet">BNB Smart Chain (BSC)</SelectItem>
            <SelectItem className={chainClasses} value="solana-mainnet">Solana</SelectItem>
          </SelectContent>
        </Select>
        
        <div className="space-y-4">
          <div className="flex justify-between text-center items-center mt-12">
            <h2 className="text-2xl font-semibold text-white">Wallet Contents</h2>
            <Select value={fiatId} onValueChange={handleFiatChange}>
              <SelectTrigger className=" border-white/50 h-12 w-1/4 text-white rounded-xl ">
                <SelectValue placeholder="Select Fiat" />
              </SelectTrigger>
              <SelectContent >
                <SelectItem className="backdrop-blur-sm h-12" value="usd">USD</SelectItem>
                <SelectItem className="backdrop-blur-sm h-12"value="eur">EUR</SelectItem>
                <SelectItem className="backdrop-blur-sm h-12" value="brl">BRL</SelectItem>
                <SelectItem className="backdrop-blur-sm h-12"value="jpy">JPY</SelectItem>
                <SelectItem className="backdrop-blur-sm h-12"value="gbp">GBP</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <CryptoGrid address={walletAddress} chainName={chainName} fiatId={fiatId} prices={prices} />
        </div>
        <div className="my-12" >
        <Author />

        </div>
      </div>
    </div>
  );
};

export default Home;
