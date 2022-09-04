import React from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import stringToSlug from '../services/stringToSlug.js';

const NovelPage = ({ novels }) => {
	const params = useParams();

	const NovelDisplay = () =>
		novels.map((item, index) => {
			if (stringToSlug(item.title) == params.novelSlug) {
				const id = `${index}-${item.title}`;
				const title = item.title;
				const poster = item.poster;
				const averageRating = item.averageRating;
				const startDate = item.startDate;
				const endDate = item.endDate;
				const subtype = item.subtype;
				const synopsis = item.synopsis;

				return (
					<div key={id} className='novel-single'>
						<h2 className='novel-single--title'>{title}</h2>
						<div className='novel-single--left'>
							<img
								src={poster}
								alt={title}
								className='novel-img'
								width='266'
								height='400'
							/>
							<div className='novel-actions'>
								<Link to='/'>Add to My List</Link>
							</div>
						</div>
						<div className='novel-single--right'>
							<div className='novel-accent-row'>
								<div className='novel-score'>
									<div className='score-title'>Score:</div>
									<div className='score-rating'>{averageRating}</div>
								</div>
								<div className='novel-type'>
									<div className='type-title'>Type:</div>
									<div className='type-name'>{subtype}</div>
								</div>
								<div className='novel-dates'>
									<div className='dates-title'>Dates:</div>
									<div className='date-details'>
										{startDate} - {endDate}
									</div>
								</div>
							</div>
							<h3>Synopsis</h3>
							<p className='novel-synopsis'>{synopsis}</p>
						</div>
					</div>
				);
			}
		});

	return <NovelDisplay />;
};

NovelPage.propTypes = {
	novels: PropTypes.array,
};

export default NovelPage;
