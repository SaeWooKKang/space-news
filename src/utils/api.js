export const get = async url => {
  const response = await fetch(url);
  if (!response.ok) {
    alert('에러가 발생했습니다.');
    console.error('에러가 발생했습니다.');
  }
  return response.json();
}