import React from 'react';

import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const VideoDetails = (props) => {
  const {
    videoId,
    channel,
    title,
    description,
    date,
    favoritesList,
    handleAddToFavorites,
    video,
  } = props;

  const inFavourites = favoritesList.find((i) => i.id.videoId === videoId) || null;
  let iconStyle = { color: 'gray' };
  let iconDisabled = false;
  if (inFavourites !== null) {
    iconStyle = { color: 'red' };
    iconDisabled = true;
  }

  return (
    <div style={{ alignItems: 'center' }}>
      <div
        style={{
          backgroundColor: 'white',
          margin: '3vw',
          width: '90%',
          height: '90%',
          padding: '20px 0px',
          borderRadius: '12px',
        }}
      >
        <div style={{ paddingLeft: '750px' }}>
          <IconButton disabled={iconDisabled} onClick={() => handleAddToFavorites(video)}>
            <FavoriteIcon style={iconStyle} />
          </IconButton>
        </div>
        <iframe
          title={videoId}
          src={`http://www.youtube.com/embed/${videoId}`}
          width="700"
          height="400"
        />
        <div>
          <div style={{ textAlign: 'left', padding: '10px 80px', width: '60vw' }}>
            <h3>{title}</h3>
            <div style={{ display: 'flex', color: 'gray', fontSize: '17px' }}>
              <div style={{ fontWeight: 'bold' }}>{channel}</div>
              <div style={{ marginLeft: '50px' }}>{`Published At: ${date}`}</div>
            </div>
            <p style={{ fontSize: '14px' }}>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoDetails;
