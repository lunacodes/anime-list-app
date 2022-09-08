import fetch from 'cross-fetch';

// Fetch animes
export function fetchAnimes(res, queryStr) {
	const base = '//kitsu.io/api/edge/anime';
	const url =
		queryStr && queryStr.length > 0 ? `${base}?filter[text]=${queryStr}` : base;

	fetch(url)
		.then((res) => {
			if (res.status >= 400) {
				console.error(`Bad response from server: ${res.status}`);
				throw new Error(`Bad response from server: ${res.status}`);
			}
			return res.json();
		})
		.then((anime) => {
			res.json(anime);
		})
		.catch((err) => {
			console.error(err);
		});
}
