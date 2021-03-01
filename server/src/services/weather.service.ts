import axios from 'axios';




export const getWeatherData = async (lat:number,lng:number) => {
    try {
        const weatherData = await axios.request({
            method: 'GET',
            url: `https://dark-sky.p.rapidapi.com/${lat},${lng}`,
            params: { lang: 'en', units: 'auto' },
            headers: {
                'x-rapidapi-key': '9b78a17c50mshe0a16b54095ef6cp149842jsn1e4117a5663d',
                'x-rapidapi-host': 'dark-sky.p.rapidapi.com'
            }
        });
        return weatherData.data;
    } catch (error) {
        throw error;
    }
}