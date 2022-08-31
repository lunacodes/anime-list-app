import axios from 'axios';

const getNovelsRequest = async () => {
	const apiEndpoint =
		process.env.REACT_APP_API_ENDPOINT || 'http://localhost:8081';

	let novels_data = [];
	const data = await axios.get(`${apiEndpoint}/novels/fetch`);
	const data2 = data.data.data;
	data2.map((item) => {
		const novel = item.attributes;
		const title = novel.canonicalTitle;
		const thumbs = [];
		let poster = '';
		thumbs.push(novel.posterImage);
		if (thumbs[0] !== null) {
			poster = thumbs[0]['original'];
		}

		const n_dat = {
			id: data.id,
			title: title,
			poster: poster,
			averageRating: novel.averageRating,
			description: novel.description,
			startDate: novel.startDate,
			endDate: novel.endDate,
			subtype: novel.subtype,
			synopsis: novel.synopsis,
			status: novel.status,
			tba: novel.tba,
			totalLength: novel.totalLength,
		};

		novels_data.push(n_dat);
	});

	return novels_data;
};

export default getNovelsRequest;