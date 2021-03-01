import axios from 'axios';




export const getGeoCodingData = async (location: string) => {
    try {

        const geoData = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${location},+CA&key=AIzaSyAVelI0unlQntDvCyRVypfIgZyh0LU5nPk`);
        if (!geoData.data) {
            throw "No data received"
        }
        if (!geoData.data.results || geoData.data.results.length === 0) {
            throw "No results received"
        }

        return geoData.data.results[0];
    } catch (error) {
        throw error;
    }
}