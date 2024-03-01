// corsProxy.js
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';

export const fetchWithCorsProxy = async (url, options = {}) => {
    try {
        const response = await fetch(proxyUrl + url, options);
        return response;
    } catch (error) {
        console.error('Error fetching data with CORS proxy:', error);
        throw new Error('Failed to fetch data with CORS proxy');
    }
};
