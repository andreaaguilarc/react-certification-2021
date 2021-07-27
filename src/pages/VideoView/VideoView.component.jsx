import React from 'react';
import Grid from '@material-ui/core/Grid';
import VideoDetails from './VideoDetails.component';
import RecommendationList from './VideoRecomentadion.component';

const VideoView = (props) => {
  const { video, relatedList, handleOpenVideo, favoritesList, handleAddToFavorites } =
    props;
  const videoId = video.id.videoId;
  const dateFormat = new Date(video.snippet.publishedAt).toLocaleDateString('en-US');

  return (
    <Grid item container xs={12} style={{ height: '92vh' }}>
      <Grid item xs={8}>
        <VideoDetails
          date={dateFormat}
          videoId={videoId}
          title={video.snippet.title}
          channel={video.snippet.channelTitle}
          description={video.snippet.description}
          video={video}
          handleAddToFavorites={handleAddToFavorites}
          favoritesList={favoritesList}
        />
      </Grid>
      <Grid item xs={4}>
        <RecommendationList
          relatedList={relatedList}
          handleOpenVideo={handleOpenVideo}
          handleAddToFavorites={handleAddToFavorites}
          favoritesList={favoritesList}
        />
      </Grid>
    </Grid>
  );
};

export default VideoView;
