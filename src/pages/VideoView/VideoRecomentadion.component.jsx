import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    minHeight: 60,
    maxWidth: 420,
    margin: '15px 0px',
  },
  content: {
    minHeight: 50,
  },
});

const RecommendationList = (props) => {
  const classes = useStyles();
  const { relatedList, favoritesList, handleAddToFavorites } = props;

  const renderList = () => {
    return (
      <>
        {relatedList.map((item) => {
          if (item.snippet !== undefined) {
            const dateFormat = new Date(item.snippet.publishedAt).toLocaleDateString(
              'en-US'
            );
            const inFavourites =
              favoritesList.find((i) => i.id.videoId === item.id.videoId) || null;
            let iconStyle = { color: 'gray' };
            let iconDisabled = false;
            if (inFavourites !== null) {
              iconStyle = { color: 'red' };
              iconDisabled = true;
            }
            return (
              <Card className={classes.root}>
                <CardContent className={classes.content}>
                  <div style={{ display: 'flex' }}>
                    <div>
                      <img
                        src={item.snippet.thumbnails.default.url}
                        alt={item.snippet.title}
                        width={item.snippet.thumbnails.default.width}
                        height={item.snippet.thumbnails.default.height}
                        // onClick={() => props.handleOpenVideo(item)}
                      />
                    </div>
                    <div style={{ display: 'block' }}>
                      <div
                        style={{
                          textAlign: 'left',
                          fontSize: '14px',
                          paddingLeft: '10px',
                        }}
                      >
                        {item.snippet.title}
                      </div>
                      <div style={{ display: 'flex' }}>
                        <div
                          style={{
                            textAlign: 'left',
                            fontSize: '14px',
                            paddingLeft: '10px',
                            color: 'gray',
                            fontWeight: 'bold',
                          }}
                        >
                          {item.snippet.channelTitle}
                        </div>
                        <div
                          style={{ fontSize: '14px', marginLeft: '15px', color: 'gray' }}
                        >
                          {dateFormat}
                        </div>
                      </div>
                      <div style={{ paddingLeft: 230 }}>
                        <IconButton
                          disabled={iconDisabled}
                          onClick={() => handleAddToFavorites(item)}
                        >
                          <FavoriteIcon style={iconStyle} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }
        })}
      </>
    );
  };

  return (
    <div style={{ height: '92vh', padding: '20px 25px', overflow: 'scroll' }}>
      {renderList()}
    </div>
  );
};

export default RecommendationList;
