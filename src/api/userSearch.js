import axios from 'axios'

/**
* @return {array} Array of admin table types 
*/
export function getUserByQuery({ query, per_page = 18, page = 1 }) {
    return axios.get('https://api.github.com/search/users', { params: { q: query, per_page, page } })
}

