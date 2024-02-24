import { useState, useEffect } from 'react';
import './post.css'

function Post({ post }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setIsFavorite(favorites.includes(post.data.id));
  }, [post.data.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favorites')) || [];

    if (isFavorite) {
      const updatedFavorites = favorites.filter((id) => id !== post.data.id);
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    } else {
      const updatedFavorites = [...favorites, post.data.id];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
      <div className="post">
          <a href={`https://reddit.com/u/${post.data.author}`} target='_blank' rel="noreferrer" className='author'>u/{post.data.author}</a>
          <h3>{post.data.title}</h3>
          {post.data.thumbnail !== 'self' && post.data.thumbnail !== 'default' && post.data.thumbnail !== 'nsfw' && post.data.thumbnail !== 'spoiler' && (
              <img src={post.data.thumbnail} alt="Thumbnail" />
          )}
          <br />
          <a href={`https://reddit.com${post.data.permalink}`} target="_blank" rel="noopener noreferrer" className='readmore-btn'>
              Read More
          </a>
          {isFavorite !== true && (
              <button onClick={toggleFavorite}>
                  Add to favorites
              </button>
          )}
          {isFavorite === true && (
              <button onClick={toggleFavorite}>
                  Remove From Favorites
              </button>
          )}
          <h3>↑{post.data.score}</h3>
      </div>
  );
}

export default Post;
