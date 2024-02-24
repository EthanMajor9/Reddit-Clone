import { useState } from 'react';
import './App.css';
import Header from './components/header'
import Post from './components/post'

const redditURL = 'https://www.reddit.com/'

function App() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState('');
  const [viewIndicator, setViewIndicator] = useState('');

  const fetchPosts = async (subreddit) => {
    try {
      // Fetch from subreddit
        if(subreddit){
          const response = await fetch(redditURL + `r/${subreddit}/hot.json?limit=10`)
          const jsonData = await response.json();
          console.log(jsonData.data.children);
          setPosts(jsonData.data.children.slice(0, 10));
          setViewIndicator(`r/${subreddit}`);
        }
        setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  }

  const fetchFavorites = async () => {
    try {
      const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
      const favoritesData = []

      if(favorites.length > 0) {
        await Promise.all(favorites.map(async element => {
          try {
            const response = await fetch(redditURL + `api/info.json?id=t3_${element}`);
            if (!response.ok) {
              throw new Error('Error fetching data');
            }
            const data = await response.json();
            favoritesData.push(data.data.children[0]);
          } catch (error) {
            console.error('Error fetching data:', error);
            setError('Error fetching data. Please try again.');
          }
        }));
      }
      
      setPosts(favoritesData);
      setViewIndicator(`Favorites`);
      setError('');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Error fetching data. Please try again.');
    }
  }

  return (
    <div className='App'>
      <Header fetchPosts={fetchPosts} fetchFavorites={fetchFavorites}/>
      {viewIndicator && <h2>{viewIndicator}</h2>}
      {error && <p className="error">{error}</p>}
      <div className='posts'>
        {posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </div>
    </div>
  );
}

export default App;
