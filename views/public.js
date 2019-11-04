onload = () => {
  const xhttp = new XMLHttpRequest();
  function diff(a, b) { return Math.abs(a - b); }

  const responseGenerator = (team, pointsDiff) => {
    let response;
    if (pointsDiff < 5) {
      response = `Tiny ${team} edge`;
    } else if (pointsDiff >= 5 && pointsDiff < 8) {
      response = `Solid ${team} edge`;
    } else if (pointsDiff >= 8 && pointsDiff < 12) {
      response = `Definite ${team} lead`;
    } else if (pointsDiff >= 12 && pointsDiff < 15) {
      response = `Major ${team} lead`;
    } else if (pointsDiff >= 15) {
      response = `Dominant ${team} lead`;
    } else if (pointsDiff === 0) {
      response = 'Oh no it\'s tied';
    }
    return response;
  };
  return new Promise((resolve, reject) => {
    xhttp.addEventListener('readystatechange', () => {
      if (xhttp.status === 200) {
        const respData = JSON.parse(xhttp.response);
        const rangersData = respData[0];
        const flyersData = respData[1];
        document.getElementById('rangers-text').innerHTML = `${rangersData.wins}-${rangersData.losses}-${rangersData.ot}`;
        document.getElementById('rangers-points').innerHTML = `${rangersData.points} points`;
        document.getElementById('flyers-text').innerHTML = `${flyersData.wins}-${flyersData.losses}-${flyersData.ot}`;
        document.getElementById('flyers-points').innerHTML = `${flyersData.points} points`;
        const pointsDiff = diff(rangersData.points, flyersData.points);
        let widthModifier = (1.5 * pointsDiff);
        let fontModifier;

        if (pointsDiff >= 12) {
          widthModifier = (1.9 * pointsDiff);
          fontModifier = (4 + (widthModifier / 3));
        } else {
          widthModifier = (1.75 * pointsDiff);
          fontModifier = (widthModifier / 1.5);
        }
        if (rangersData.points > flyersData.points) {
          $(document).ready(() => {
            document.getElementById('flyers').id = 'flyers-animate';
            document.getElementById('rangers').id = 'rangers-animate';
            document.getElementById('flyers-animate').style.width = `${50 - widthModifier}%`;
            document.getElementById('rangers-animate').style.width = `${50 + widthModifier}%`;
            document.getElementById('flyers-animate').style.fontSize = `${36 - fontModifier}px`;
            document.getElementById('rangers-animate').style.fontSize = `${36 + fontModifier}px`;
            document.getElementById('rangers-subtext').innerHTML = responseGenerator('Rangers', pointsDiff);
          });
        } else if (rangersData.points < flyersData.points) {
          $(document).ready(() => {
            document.getElementById('flyers').id = 'flyers-animate';
            document.getElementById('rangers').id = 'rangers-animate';
            document.getElementById('flyers-animate').style.width = `${50 + widthModifier}%`;
            document.getElementById('rangers-animate').style.width = `${50 - widthModifier}%`;
            document.getElementById('flyers-animate').style.fontSize = `${36 + fontModifier}px`;
            document.getElementById('rangers-animate').style.fontSize = `${36 - fontModifier}px`;
            document.getElementById('flyers-subtext').innerHTML = responseGenerator('Flyers', pointsDiff);
          });
        } else if (rangersData.points === flyersData.points) {
          document.getElementById('flyers-subtext').innerHTML = 'Oh no it\'s tied';
          document.getElementById('rangers-subtext').innerHTML = 'Oh no it\'s tied';
        }
        resolve(xhttp);
      } else {
        reject(xhttp.response);
      }
    });
    xhttp.open('GET', '/homepage');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  });
};
