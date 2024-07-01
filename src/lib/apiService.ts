// apiService.js

const BASE_URL = 'http://localhost:1337/api';
const TOKEN = '8b449e9bf7981fdf771156e0bdc31b58079b05e81c2c5f8999ebd2207f07ec5cd6a8c84ada69c65acec18b1d75ad96da8871785d161531b23622abd8238024790d861cc0ccf9483c7e8e8d82ab0963429b07366656f11677a2925c504258eeea9d225f9fa7112ca8c4be8fa54dec69a12ad051b35e853c9a756509d57e61c133';

async function fetchData(categoryId, page, limit = 6) {
    try {
        let url = `${BASE_URL}/showcases?_page=${page}&_limit=${limit}`;
        if (categoryId) {
            url += `&filters[category_id][$eq]=${categoryId}`;
        }
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return await response.json();
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
// api to get categories
async function fetchCategories() {
    try {
        const response = await fetch(`${BASE_URL}/categories`, {
            headers: {
                'Authorization': `Bearer ${TOKEN}`
            }
        });
        return await response.json();
    }
    catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
}
export { fetchData, fetchCategories };