// 카드 형태로 <[이미지] 설명> 형식으로 만들자 
  // 이미지에는 공통적으로 존재하는 이미지인 로켓 이미지를 사용하자

// // 데이터는 받아지고 (cors 문제 x)
// header에 담아줬음
// access-control-allow-origin: *
// fetch('https://api.spacexdata.com/v5/launches/upcoming')
//   .then(res => res.json()) 

// // 로켓 api
// // https://api.spacexdata.com/v4/rockets/:id
// // 5e9d0d95eda69973a809d1ec
// fetch('https://api.spacexdata.com/v4/rockets/5e9d0d95eda69973a809d1ec')
//   .then(res => res.json())
//   .then(res => console.log(res));

// 모든 이미지 존재하는지 확인
  // type에 cors라고 응답 됐는데 header 부분 보니깐 
  // access-control-allow-origin: * 담겨 있음
    // -> 그렇다면 json으로 변경 안해서임!
// -> 이미지 모두 존재
fetch('https://api.spacexdata.com/v5/launches/upcoming')
  .then(res => res.json())
  .then(res => res.map(obj => obj.rocket)) // rockek id 추출,['id1','id2', ...] 
  .then(rockets => Promise.all(
    rockets.map(key => 
      fetch(`https://api.spacexdata.com/v4/rockets/${ key }`))))
  .then(res => res.map(v => v.json())) // [promise, promise, ...]
  .then(res => res.forEach(v => v.then(value => console.log(value.flickr_images))))
  