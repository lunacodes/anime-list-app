import React from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import getCurrentDate from '../services/dateService.js';
import stringToSlug from '../services/stringToSlug.js';
import AuthService from '../services/authService.js';
const API_URL = process.env.REACT_APP_API_ENDPOINT;

const AnimePage = ({ animes }) => {
	const params = useParams();

	const AddAnimeToUser = (animes) => {
		const today = getCurrentDate;
		const currentUser = AuthService.getCurrentUser();

		if (!currentUser) {
			window.alert('You need to login');
			console.log('No user logged in');
			return;
		}

		animes.map((anime) => {
			if (stringToSlug(anime.title) == params.animeSlug) {
				return axios.post(`${API_URL}/users/add-anime`, {
					id: currentUser.id,
					title: anime.title,
					thumb: anime.poster,
					episodes: anime.episodes,
					status: anime.status || 'plan to watch',
					eps_watched: anime.progress || 0,
					date_added: today,
					episodeCount: anime.episodeCount,
				});
			}
		});
	};

	const AnimeDisplay = () =>
		animes.map((item, index) => {
			if (stringToSlug(item.title) === params.animeSlug) {
				const id = `${index}-${item.title}`;
				const title = item.title;
				const poster = item.poster;
				const averageRating = item.averageRating;
				const startDate = item.startDate;
				const endDate = item.endDate;
				const subtype = item.subtype;
				const synopsis = item.synopsis;

				return (
					<div key={id} className='anime-single'>
						<h2 className='anime-single--title'>{title}</h2>
						<div className='anime-single--left'>
							<img
								src={poster}
								alt={title}
								className='anime-img'
								width='266'
								height='400'
							/>
							<div className='anime-actions'>
								{/* TODO: Add state check for "Already on list" */}
								<button onClick={() => AddAnimeToUser(animes)}>
									Add to My List
								</button>
							</div>
						</div>
						<div className='anime-single--right'>
							<div className='anime-accent-row'>
								<div className='anime-score'>
									<div className='score-title'>Score:</div>
									<div className='score-rating'>{averageRating}</div>
								</div>
								<div className='anime-type'>
									<div className='type-title'>Type:</div>
									<div className='type-name'>{subtype}</div>
								</div>
								<div className='anime-dates'>
									<div className='dates-title'>Dates:</div>
									<div className='date-details'>
										{startDate} - {endDate}
									</div>
								</div>
							</div>
							<h3>Synopsis</h3>
							<p className='anime-synopsis'>{synopsis}</p>
						</div>
					</div>
				);
			}
		});

	return <AnimeDisplay />;
};

AnimePage.propTypes = {
	animes: PropTypes.array,
};

export default AnimePage;
