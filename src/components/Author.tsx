import { getGitHubProfile } from "@/app/utils/getGitHubProfile";
import axios from "axios";
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";


export default function Author(){
    const [profile, setProfile] = useState(Object)
    const [readme, setReadme] = useState(Object)
    
    useEffect(() => {
        getGitHubProfile()
        .then((profileInfo) =>{
        setProfile(profileInfo)
    })
    }, [])

    const handleClick = () => {
  console.log("Link clicked");
    };

    

    return (
            <div className="flex-col mx-1 border-white/50 rounded-xl my-12">
                <h1 className="text-5xl font-bold justify-center flex">Author</h1>
                <div className="flex items-center justify-center space-x-3 my-8">
                    <Avatar style={{ width: '130px', height: '130px' }}>
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback>Profile</AvatarFallback>
                    </Avatar>
                    <div className="flex-col">
                        <p className="text-3xl">{profile.name}</p>
                        <p className="text-slate-400">{profile.bio}</p>
                        <div className="flex space-x-2">
                            <a href="https://www.github.com/felipe-marques-dev" target="_blank" rel="noreferrer" onClick={handleClick}>
                                <picture>
                                    <source media="(prefers-color-scheme: dark)" srcSet="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github-dark.svg" />
                                    <source media="(prefers-color-scheme: light)" srcSet="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" />
                                    <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/github.svg" width="32" height="32" alt="GitHub" />
                                </picture>
                            </a>
                            <a href="https://www.linkedin.com/in/felipe-marques-a748b9299/" target="_blank" rel="noreferrer">
                                <picture>
                                    <source media="(prefers-color-scheme: dark)" srcSet="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin-dark.svg" />
                                    <source media="(prefers-color-scheme: light)" srcSet="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg" />
                                    <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/linkedin.svg" width="32" height="32" alt="LinkedIn" />
                                </picture>
                            </a>
                            <a href="https://www.youtube.com/@FelipeMarques-Computação" target="_blank" rel="noreferrer">
                                <picture>
                                    <source media="(prefers-color-scheme: dark)" srcSet="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/youtube-dark.svg" />
                                    <source media="(prefers-color-scheme: light)" srcSet="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/youtube.svg" />
                                    <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/socials/youtube.svg" width="32" height="32" alt="YouTube" />
                                </picture>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="grid gap-3 grid-cols-8 grid-rows-3 place-self-center">
                    <a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" />
                    </a>
                    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/javascript-colored.svg" width="36" height="36" alt="JavaScript" />
                    </a>
                    <a href="https://www.python.org/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/python-colored.svg" width="36" height="36" alt="Python" />
                    </a>
                    <a href="https://git-scm.com/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/git-colored.svg" width="36" height="36" alt="Git" />
                    </a>
                    <a href="https://code.visualstudio.com/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/visualstudiocode.svg" width="36" height="36" alt="VS Code" />
                    </a>
                    <a href="https://reactjs.org/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" />
                    </a>
                    <a href="https://vitejs.dev/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/vite-colored.svg" width="36" height="36" alt="Vite" />
                    </a>
                    <a href="https://developer.mozilla.org/en-US/docs/Glossary/HTML5" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/html5-colored.svg" width="36" height="36" alt="HTML5" />
                    </a>
                    <a href="https://www.w3.org/TR/CSS/#css" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/css3-colored.svg" width="36" height="36" alt="CSS3" />
                    </a>
                    <a href="https://getbootstrap.com/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/bootstrap-colored.svg" width="36" height="36" alt="Bootstrap" />
                    </a>
                    <a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/nodejs-colored.svg" width="36" height="36" alt="NodeJS" />
                    </a>
                    <a href="https://www.mysql.com/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/mysql-colored.svg" width="36" height="36" alt="MySQL" />
                    </a>
                    <a href="https://www.linux.org" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/linux-colored.svg" width="36" height="36" alt="Linux" />
                    </a>
                    <a href="https://www.docker.com/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/docker-colored.svg" width="36" height="36" alt="Docker" />
                    </a>
                    <a href="https://www.djangoproject.com/" target="_blank" rel="noreferrer">
                        <img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/django-colored.svg" width="36" height="36" alt="Django" />
                    </a>
                </div>
            </div>
    );
}