import axios from 'axios';

const getAnimesRequest = async (animesQueryStr) => {
	const query = animesQueryStr;
	const apiEndpoint = process.env.REACT_APP_API_ENDPOINT;

	let animes_data = [];

	const data = await axios.get(`${apiEndpoint}/animes/fetch`, {
		params: { query: query },
	});
	const data2 = data.data.data;
	data2.map((item) => {
		const anime = item.attributes;
		const title = anime.canonicalTitle;
		const thumbs = [];
		let poster = '';
		thumbs.push(anime.posterImage);
		if (thumbs[0] !== null) {
			poster = thumbs[0]['original'];
		}

		const n_dat = {
			id: data.id,
			title: title,
			poster: poster,
			averageRating: anime.averageRating,
			description: anime.description,
			startDate: anime.startDate,
			endDate: anime.endDate,
			subtype: anime.subtype,
			synopsis: anime.synopsis,
			status: anime.status,
			tba: anime.tba,
			totalLength: anime.totalLength,
			episodeCount: anime.episodeCount,
		};

		animes_data.push(n_dat);
	});

	return animes_data;
};

export default getAnimesRequest;
