API_KEY = '15c76d70913f48d58c1175424242003';
BASE_URL = 'http://api.weatherapi.com/v1';
const CONTENT = $('#content');
const form = $('#location-form');
const weather = {};
const scale = 'c';

form.submit((e) => {
	e.preventDefault();
	let location = $('#location').val();
	$('#location').val('');
	CONTENT.empty();

	getCurrentWeather(location);
});

const getCurrentWeather = async (location) => {
	const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${location}&aqi=no`;

	try {
		const res = await fetch(url);
		const json = await res.json();

		if (res.status == 400) {
			const error = `<span id='error'>${json.error.message}</span>`;
			CONTENT.append(error);
		} else {
			weather.locationName = json.location.name;
			weather.country = json.location.country;
			weather.temp_c = json.current.temp_c;
			weather.temp_f = json.current.temp_f;
			weather.condition = json.current.condition;
			weather.is_day = json.current.is_day;
			changeUI(weather);
		}
	} catch (e) {
		console.error(e);
	}
};

const changeUI = () => {
	CONTENT.append(`<div id='current-weather-container'></div>`);
	const currWeatherCont = $('#current-weather-container');
	currWeatherCont.append(`<div id='visual'></div>`);
	const visual = $('#visual');
	const locationName = `<h2 id='location-name'>${weather.locationName}</h2>`;

	const currWeather = `<span id='current-weather'>${
		weather[`temp_${scale}`]
	}${String.fromCharCode(176)}${scale.toUpperCase()}</span>`;

	const icon = `<img src='${weather.condition.icon.replace(
		'//cdn.weatherapi.com/weather/64x64',
		'/icons'
	)}' alt='${weather.condition.text}' />`;

	currWeatherCont.prepend(locationName);
	visual.append(icon, currWeather);
};
