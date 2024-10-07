import { getGitHubProfile } from "@/app/utils/getGitHubProfile";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";


export default function Author(){
    const [profile, setProfile] = useState(Object)
    const [readme, setReadme] = useState(Object)
    
    useEffect(() => {
        getGitHubProfile()
        .then((profileInfo) =>{
        setProfile(profileInfo)
    })
    }, [])
    

    return (
        <>
       <div className="flex flex-col justify-center mx-3 border-white/50 rounded-xl">
        <h1 className="text-5xl font-bold justify-center flex">Author</h1>
        <div className="flex items-center justify-center space-x-3 my-8">
        <Avatar style={{width: '130px', height:'130px'}}>
            <AvatarImage  src={profile.avatar_url} />
            <AvatarFallback>Profile</AvatarFallback>
        </Avatar>
        <div className="flex-col">
            <p className="text-3xl">{profile.name}</p>
            <p>{profile.location}</p>
            <p className="text-slate-400">{profile.bio}</p>
        </div>
        
        </div>
      </div> 
        </>
    )
}