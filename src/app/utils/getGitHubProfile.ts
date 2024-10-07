import axios from "axios";


    export async function getGitHubProfile(){

    const USERNAME = 'felipe-marques-dev';
    const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        try{
        const response = await axios.get(`https://api.github.com/users/${USERNAME}`,{
            headers: {
                Authorization: `Bearer ${TOKEN}`,
                'Content-Type': 'application/json',
            }
        })
        const profileData = response.data;
        console.log('teste')
        console.log(profileData)
        return profileData
        }catch(error){
            console.error('error ao buscar perfil', error)
            throw error;
        }
    }