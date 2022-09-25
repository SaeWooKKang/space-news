function Card(plan) {
  const $wrapper = document.createElement('div');
  $wrapper.setAttribute('id', 'Card');
  
  const template = `
    <div>
      <img class='card-img' src='${ plan.rocket_img }'>
    </div>
    <div class='card-info'>
      <h2>${ plan.name }</h2>
      
      <div class='card-info-date'>
        <span class='card-info-date-launch'>Launch: </span>
        <span>${ plan.date_local }</span>
      </div>
    </div>
  `;

  $wrapper.innerHTML = template;

  return $wrapper;
};

export default Card;