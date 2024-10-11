'use client';
import { fetchBalances } from '@/app/utils/getBalance';
import useSWR from 'swr';
import { Card, CardContent } from './ui/card';
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, AwaitedReactNode, useMemo } from 'react';

interface CryptoGridProps{
    address: string;
    chainName: string; 
    fiatId: string;
    prices: number[];
}

export default function CryptoGrid({ address, chainName, prices, fiatId}: CryptoGridProps){
    const apiKey = process.env.NEXT_PUBLIC_GOLDRUSH_API_KEY

    const url = useMemo(() => {
    return address && chainName ? `https://api.covalenthq.com/v1/${chainName}/address/${address}/balances_v2/?key=${apiKey}` : null;
  }, [address, chainName, apiKey]);

    const { data, isLoading, error} = useSWR(url, fetchBalances)
    if(isLoading) return(
        <p>Loading...</p>
    )

    if(error) return(
        <p>Error! {error.message}</p>
    )


    return(
        <div className="grid grid-cols-1 gap-4 h-auto w-full">
            {data ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full ">
                {data.map((token: { logo_url: string | undefined;
                 contract_name: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                 contract_ticker_symbol: string | number | bigint | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<AwaitedReactNode> | null | undefined;
                 balance: string;
                 contract_decimals: number;
                 }, index: number) => (
                  <Card key={index} className="border-white/50 backdrop-blur-sm">
                    <CardContent className="p-4">
                      <div className="flex py-1 justify-between">
                        <div className="flex flex-row">
                          <img
                            width={60}
                            src={token.logo_url}
                            className="rounded-full"
                          />
                          <div className="max-w-fit" >
                            <div className="text-2xl max-w-fit px-2 font-medium text-white">{token.contract_name}</div>
                            <div className="flex">
                              <p className="px-2 ">{token.contract_ticker_symbol}</p>
                              <p>{(parseFloat(token.balance) / Math.pow(10, token.contract_decimals)).toFixed(6)}</p>
                            </div>
                          </div>
                        </div>
                        <p className="md:text-2xl sm:text-2xl">
                           {prices[index]} {fiatId.toUpperCase()}
                           </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p style={{ color: 'red' }} className="text-lg font-bold">Insert a valid address to see the balance</p>
            )}
          </div>
    )
}