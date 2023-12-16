import React from 'react';
import YouTube from 'react-youtube';

interface VideoPlayerProps {
  videoId: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoId }) => {
  return (
    <YouTube
      videoId={videoId}
      opts={{
        width: "100%",
        height: "300",
        playerVars: {
          modestbranding: 1 // 컨트롤 바에 youtube 로고를 표시하지 않음
        },
      }}
      onEnd={(e)=>{e.target.stopVideo(0);}}      
    />
  );
};

export default VideoPlayer;
