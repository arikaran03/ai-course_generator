
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VideoBlock = ({ query }) => {
  // Creates a link to a YouTube search for the query
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  
  const [videoId, setVideoId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

    useEffect(() => {
    const fetchVideo = async () => {
      // Don't do anything if there's no query
      if (!query) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError('');
        const response = await axios.get(`http://localhost:5000/api/youtube/search?query=${encodeURIComponent(query)}`);
        setVideoId(response.data.videoId);
      } catch (err) {
        console.error('Failed to fetch video', err);
        setError('Could not load video.');
      } finally {
        setLoading(false);
      }
    };
    fetchVideo();
  }, [query]);


  if (loading) {
    return <div className="video-block-container"><p>Loading video...</p></div>;
  }

  if (error) {
    return <div className="video-block-container"><p className="error-message">{error}</p></div>;
  }

  return (
    <div className="video-block-container">
      <h4>Suggested Video: {query}</h4>
      <div className="video-responsive">
      <iframe
          width="560"
          height="315"
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
};
export default VideoBlock;