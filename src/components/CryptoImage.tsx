import React from "react";

interface ImageProps {
    data: string | undefined;
}


const CryptoImage: React.FC<ImageProps> = ({data}) => {
    if(data){
        console.log(data)
        if(data.length > 1){
        return(
            <img className="w-12 h-12 rounded-full" src={data} alt="crypto-logo"/>
        ) 
        }
    }
    return <p>Logo not found</p>
}

export default CryptoImage;