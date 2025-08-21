import React from 'react';

const VideoBlock = ({ query }) => {
  // Creates a link to a YouTube search for the query
  const youtubeSearchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
  
  return (
    <div className="video-block-container">
      <h4>Suggested Video</h4>
      <p>Watch a video about: 
        <a href={youtubeSearchUrl} target="_blank" rel="noopener noreferrer">
          {query}
        </a>
      </p>
    </div>
  );
};

export default VideoBlock;