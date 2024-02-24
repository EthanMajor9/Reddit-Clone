import React, { useState } from 'react';
import './header.css'

function Header({fetchPosts, fetchFavorites}) {
	const [subreddit, setSubreddit] = useState('');

	const handleKeyPress = (event) => {
		if (event.key === 'Enter') {
		  event.preventDefault();
		  if (subreddit.trim() !== '') {
			fetchPosts(subreddit);
		  }
		}
	};

	return (
		<header>
			<div class="search-container">
				<input 
					type='search' 
					placeholder="Enter a subreddit name..."
					onChange={(e) => setSubreddit(e.target.value)}
					onKeyPress={handleKeyPress}
					className='search-bar'
				/>
				<input
					type='button'
					value='Favorites'
					onClick={fetchFavorites}
					className='favorite-btn'
				/>
			</div>
		</header>
	);
}

export default Header;