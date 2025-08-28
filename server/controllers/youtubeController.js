import {google} from 'googleapis'; 
import dotenv from 'dotenv'; 

dotenv.config(); 
const youtube = google.youtube({
    version : 'v3',
    auth : process.env.YOUTUBE_API_KEY, 
}); 


const searchVideos = async(req, res) => {
    const { query } = req.query; 
    if(!query){
        return res.status(400).json({message : 'A search query is require to fetch the videos'}); 
    }

    try {
        const response = await youtube.search.list({
            part: 'snippet',
            q: query,
            maxResults: 1, // We only need the top result
            type: 'video',
            videoEmbeddable: 'true',
        }); 
        if(response.data.items.length == 0){
            return res.status(404).json({ message: 'No video found for this query.' });
        }
        const videoId = response.data.items[0].id.videoId;  
        res.status(200).json({ videoId });
    } catch (error) {
        console.error('Error searching YouTube:', error.message);
        res.status(500).json({ message: 'Failed to search for videos. in youtubeController.js' });
    }
}; 

export { searchVideos };