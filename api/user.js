import axios from 'axios';

// Develop server URL
const postBaseUrl = 'http://140.114.91.242:3000';

/* data should like this 
var data = qs.stringify({
  'account': 'apple',
  'email': 'Apple@apple.com',
  'name': 'Apple',
  'avatar_url': 'IIIIII',
  'password': 'banana' 
}); */
export function signIn(data) {
  let url = `${postBaseUrl}/user/signIn`;
  let headers = { 
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  
  return axios.post(url, data, {
    headers: headers
  })
  .then((response) => {
	return response.data;
  })
  .catch((error) => {
	return error
  });
}

/* data should like this 
var data = qs.stringify({
  'account': 'apple',
  'password': 'banana' 
}); */
export function logIn(data) {
  let url = `${postBaseUrl}/user/logIn`;
  let headers = { 
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  
  return axios.post(url, data, {
    headers: headers
  })
  .then((response) => {
	return response;
  })
  .catch((error) => {
	return error
  });
}


// getUser
export function getUser(userId) {
  let url = `${postBaseUrl}/user/getUser/`;
  url = url + userId;
  let headers = {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  
  return axios.get(url, {
    headers: headers
  })
  .then((response) => {
	return response.data;
  })
  .catch((error) => {
	return error
  });
}


/* data should like this 
var data = qs.stringify({
  'account': 'apple',
  'email': 'Apple@apple.com',
  'name': 'Apple',
  'avatar_url': 'IIIIII',
  'password': 'banana' 
}); */
export function modifyUser(userId, data) {
  let url = `${postBaseUrl}/user/modifyUser/`;
  url = url + userId;
  let headers = { 
    'Content-Type': 'application/x-www-form-urlencoded'
  }
  
  return axios.put(url, data, {
    headers: headers
  })
  .then((response) => {
	return response.data;
  })
  .catch((error) => {
	return error
  });
}