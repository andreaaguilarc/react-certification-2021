import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import { useAuth } from '../../providers/Auth';
import { YOUTUBE_DATA } from './mockYT';
import './Home.styles.css';
import Navigation from '../Header/Bar.component';
import Resultslist from '../ResultsList/Results.list.component';
import VideoView from '../VideoView/VideoView.component';

function HomePage() {
  const history = useHistory();
  const sectionRef = useRef(null);
  const { authenticated, logout } = useAuth();

  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState(YOUTUBE_DATA); // []
  const [showResults, setShowResults] = useState(true);
  const [videoView, setVideoView] = useState('');
  const [relatedList, setRelatedlist] = useState([]);
  const [favoritesList, setFavoritesList] = useState([]);
  const [showFavorites, setshowFavorites] = useState(false);
  const [flag, setFlag] = useState(false);

  function deAuthenticate(event) {
    event.preventDefault();
    logout();
    history.push('/login');
  }

  const handleSearchInput = (e) => {
    setSearch(e.target.value);
  };

  const YTKey = 'AIzaSyDcfF-JvKh6icuYtdegv7y4LRv10grxY3w';

  const fetchYTAPI = async () => {
    await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YTKey}&type=video&part=snippet&maxResults=10&q=${search}`
    )
      .then((response) => response.json())
      .then((data) => setSearchResults(data.items))
      .catch((err) => {
        console.error(err);
      });
    setshowFavorites(false);
    setShowResults(true);
    setVideoView('');
    setRelatedlist([]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchYTAPI();
  };

  const handleOpenVideo = async (video) => {
    const videoId = video.id.videoId;
    await fetch(
      `https://www.googleapis.com/youtube/v3/search?key=${YTKey}&type=video&part=snippet&maxResults=10&relatedToVideoId=${videoId}`
    )
      .then((response) => response.json())
      .then((data) => {
        setRelatedlist(data.items);
        setShowResults(false);
        setVideoView(video);
      });
  };

  const handleAddToFavourites = (video) => {
    const inFavourites =
      favoritesList.find((i) => i.id.videoId === video.id.videoId) || null;
    if (inFavourites === null) {
      const list = favoritesList;
      list.push(video);
      setFavoritesList(list);
      setFlag(!flag);
    }
  };

  const handleshowFavorites = () => {
    setshowFavorites(true);
    setVideoView('');
    setShowResults(true);
  };

  return (
    <section className="homepage" ref={sectionRef}>
      {authenticated && (
        <>
          <Grid container spacing={0}>
            <div>
              <Navigation
                deAuthenticate={deAuthenticate}
                handleSearchInput={handleSearchInput}
                handleSubmit={handleSubmit}
                search={search}
                handleshowFavorites={handleshowFavorites}
              />
            </div>
            <div>
              {showResults && (
                <Resultslist
                  flag={flag}
                  results={searchResults}
                  favoritesList={favoritesList}
                  handleOpenVideo={handleOpenVideo}
                  showFavorites={showFavorites}
                  handleAddToFavourites={handleAddToFavourites}
                />
              )}
              {videoView !== '' && (
                <VideoView
                  video={videoView}
                  relatedList={relatedList}
                  handleOpenVideo={handleOpenVideo}
                  favoritesList={favoritesList}
                  handleAddToFavourites={handleAddToFavourites}
                />
              )}
            </div>
          </Grid>
        </>
      )}
      {/* // : (
      //   <Link to="/login">let me in →</Link>
      // )} */}
    </section>
  );
}

export default HomePage;
