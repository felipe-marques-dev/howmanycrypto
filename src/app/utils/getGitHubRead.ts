import axios from "axios";
import { marked } from 'marked';

export default async function getProfileRead(){
        const USERNAME = 'felipe-marques-dev';
        const TOKEN = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
            try{
            const response = await axios.get(`https://api.github.com/repos/${USERNAME}/${USERNAME}/contents/README.md`,{
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    'Content-Type': 'application/json',
                }
            })

            const encondedContent = response.data.content;
            const decodedContent = Buffer.from(encondedContent,`base64`).toString('utf-8');
            const htmlContent = marked(decodedContent)
            console.log(htmlContent)
            return htmlContent;    
            }catch(error){
                console.error('erro ao capturar readme!', error)
                throw error;
            }
}