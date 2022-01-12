import axios from 'axios'

/**
* @return {array} Array of admin table types 
*/
export function getUserByQuery(query) {
    return axios.get('https://api.github.com/search/users', { params: { q: query } })
}

