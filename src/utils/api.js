export const BASE_URL = 'https://api.spacexdata.com';

export const get = async url => {
  const response = await fetch(url);

  if (!response.ok) {
    alert('에러가 발생했습니다.');
    console.error('에러가 발생했습니다.');
  }
  
  return response.json();
}
export const getRocketImg = async id => {
  return get(`${ BASE_URL }/v4/rockets/` + id)  
    .then(res => res.flickr_images[1]);
}