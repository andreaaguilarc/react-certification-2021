import React from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles({
  root: {
    minHeight: 380,
    padding: 5,
  },
  content: {
    minHeight: 320,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  subtitle: {
    fontSize: 14,
    alignItems: 'left',
  },
  title: {
    marginTop: 10,
    marginBottom: 12,
    fontSize: 15,
  },
  videoList: {
    marginTop: '80px',
    marginLeft: '2px',
    width: '100vw',
  },
});

const Resultslist = (props) => {
  const classes = useStyles();
  const { results, handleAddToFavorites } = props;

  const renderResults = () => {
    //const list = showFavorites? favoritesList : results;
    return (
      <>
        {results.map((item) => {
          const dateFormat = new Date(item.snippet.publishedAt).toLocaleDateString(
            'en-US'
          );
          // const inFavourites =
          //   favoritesList.find((i) => i.id.videoId === item.id.videoId) || null;
          let iconStyle = { color: 'gray' };
          let iconDisabled = true;
          // if (inFavourites !== null || showFavorites) {
          //   iconStyle = { color: 'red' };
          //   iconDisabled = true;
          // }
          return (
            <Grid key={item.id.videoId} item xs={3}>
              <Card className={classes.root}>
                <CardContent className={classes.content}>
                  <div style={{ display: 'flex' }}>
                    <img
                      src={item.snippet.thumbnails.medium.url}
                      alt={item.snippet.title}
                      width={item.snippet.thumbnails.medium.width - 20 || 180}
                      height={item.snippet.thumbnails.medium.height - 20 || 190}
                      // onClick={()=>handleOpenVideo(item)}
                    />
                  </div>
                  <div style={{ marginTop: '20px', fontSize: '16px', textAlign: 'left' }}>
                    {item.snippet.title}
                  </div>
                  <div style={{ fontSize: '14px', textAlign: 'left', color: 'gray' }}>
                    {item.snippet.channelTitle}
                  </div>
                  <div style={{ fontSize: '14px', textAlign: 'left', color: 'gray' }}>
                    {`Published At: ${dateFormat}`}
                  </div>
                </CardContent>
                <CardActions>
                  <IconButton
                    disabled={iconDisabled}
                    onClick={() => handleAddToFavorites(item)}
                  >
                    <FavoriteIcon style={iconStyle} />
                  </IconButton>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </>
    );
  };
  return (
    <React.Fragment>
      <Grid item container spacing={3} xs={12} className={classes.videoList}>
        {renderResults()}
      </Grid>
    </React.Fragment>
  );
};

export default Resultslist;
