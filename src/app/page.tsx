"use client";
/* eslint-disable */

// pages/index.tsx
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import AnimatedGridPattern from "@/components/ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { fetchBalances } from "./utils/getBalance";
import { useTheme } from "next-themes";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import Particles from "@/components/ui/particles";

const Home = () => {
  const [balances, setBalances] = useState<any[]>([]);
  const [walletAddress, setWalletAddress] = useState<string>("");
  const [chainName, setChainName] = useState<string>('');
  const [btcImage, setBtcImage] = useState<boolean>(true)
   const { theme } = useTheme();
  const [color, setColor] = useState("#ffffff");
 
  useEffect(() => {
    setColor("#ffffff");
  }, [theme]);
  
  useEffect(() => {
    const getBalances = async () => {
      console.log(chainName)
      if (walletAddress && chainName) {
        const response = await fetchBalances(walletAddress, chainName);
        setBalances(response)
        if(chainName == "btc-mainnet"){
            setBtcImage(true)
        }else{
            setBtcImage(false)
        }
      }

    }
    getBalances();
  }, [walletAddress, chainName]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWalletAddress(e.target.value);
  };

  const handleSelectChange = (value: string) => {
    console.log(value)
    
    setChainName(value);
  };


  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background md:shadow-xl">
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-gray-800 to-gray-100 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        How Much Crypto?
      </span>
      <Particles
        className="absolute inset-0"
        quantity={100}
        ease={90}
        color={color}
        refresh
      />
      <div className="my-16 w-full max-w-md backdrop-blur-sm rounded-xl shadow-lg p-6 space-y-6">
        <h1 className="text-2xl font-bold text-white text-center">Wallet Viewer</h1>
        
        <Input 
          placeholder="Enter wallet address"
          onChange={handleInputChange}
          className="rounded-xl  border-white/50 text-white placeholder-white/70"
        />
        
        <Select value={chainName} onValueChange={handleSelectChange}>
          <SelectTrigger className=" border-white/50 text-white rounded-xl ">
            <SelectValue placeholder="Select chain" />
          </SelectTrigger>
          <SelectContent >
          <SelectItem className="backdrop-blur-sm" value="btc-mainnet">Bitcoin</SelectItem>
            <SelectItem className="backdrop-blur-sm"value="eth-mainnet">Ethereum</SelectItem>
            <SelectItem className="backdrop-blur-sm"value="bsc-mainnet">BNB Smart Chain (BSC)</SelectItem>
            <SelectItem className="backdrop-blur-sm"value="solana-mainnet">Solana</SelectItem>
            
          </SelectContent>
        </Select>
        
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-white">Wallet Contents</h2>
          <div className="grid grid-cols-1 gap-4">
          {balances.length > 0 ? (
          <ul>
            {balances.map((token, index) => (
              <Card key={index} className=" border-white/50 backdrop-blur-sm my-2 " >
                <CardContent className="p-3 px-4">
                <div className="flex py-1 justify-between">
                
                  <div className="flex flex-row">
                  <img width={60} src={btcImage? 'https://w7.pngwing.com/pngs/634/449/png-transparent-btc-cryptocurrencies-icon.png':token.logo_url} className="rounded-full" />
                  <div>
                    <div className="text-2xl px-2 font-medium text-white">{token.contract_name}</div>
                    <div className="flex">
                    <p className="px-2 ">{token.contract_ticker_symbol}</p>
                    <p >{parseFloat(token.balance) / Math.pow(10, token.contract_decimals)}</p>
                    </div>
                  </div>
                </div>
                  <p className="text-2xl">{token.pretty_quote}</p>
                </div>
               
                </CardContent>
              </Card>
            ))}
          </ul>
        ) : (
          <p style={{color: 'red'}} className=" text-lg font-bold ">Insert a valid address to see the balance</p>
        )}
          </div>
        </div>
      </div>
      </div>

      );
      {/*<div className="h-1/4 my-24 px-8 rounded-2xl py-8 flex justify-center items-center backdrop-blur-sm bg-white/5 ">
       <div className="text-center">
      <p className="text-3xl py-8" >Enter you Wallet Address</p>
      <Input
        className="brightness-200 rounded-xl backdrop-blur-sm bg-white/5 "
        type="text"
        value={walletAddress}
        onChange={handleInputChange}
        placeholder="Digite o endereço da carteira"
      />
      <div className="my-4">
        {balances.length > 0 ? (
          <ul>
            {balances.map((token, index) => (
              <li key={index}>
                {token.contract_name}: {parseFloat(token.balance) / Math.pow(10, token.contract_decimals)}
                <img width={20} src={token.logo_url} ></img> 
              </li>
            ))}
          </ul>
        ) : (
          <p style={{color: 'red'}}>Insira um endereço válido para ver os saldos</p>
        )}
      </div>
      </div>
    </div>
    </div> */}
  {/*return (
    <div>
      <div className="relative flex h-[500px] w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-background">
      <Meteors number={30} />
      <span className="pointer-events-none whitespace-pre-wrap bg-gradient-to-b from-black to-gray-300/80 bg-clip-text text-center text-8xl font-semibold leading-none text-transparent dark:from-white dark:to-slate-900/10">
        Meteors
      </span>
      </div>
      <h1>Verificador de Saldo de Ethereum</h1>
      <input
        type="text"
        value={walletAddress}
        onChange={handleInputChange}
        placeholder="Digite o endereço da carteira"
      />
      <p>Saldo: {balance !== null ? `${balance} ETH` : "Insira um endereço válido"}</p>
    </div>
  ); */}
};

export default Home;
