onload = () => {
  const xhttp = new XMLHttpRequest();
  const diff = (a, b) => Math.abs(a - b);

  const responseGenerator = (team, pointsDiff) => {
    let response;
    if (pointsDiff < 5) {
      response = `Tiny ${team} edge`;
    } else if (pointsDiff >= 5 && pointsDiff < 8) {
      response = `${team} edge`;
    } else if (pointsDiff >= 8 && pointsDiff < 12) {
      response = `Decent ${team} lead`;
    } else if (pointsDiff >= 12 && pointsDiff < 15) {
      response = `Major ${team} lead`;
    } else if (pointsDiff >= 15) {
      response = `Dominant ${team} lead`;
    } else if (pointsDiff === 0) {
      response = 'Oh no it\'s tied';
    }
    return response;
  };
  return new Promise((resolve) => {
    xhttp.addEventListener('readystatechange', () => {
      if (xhttp.status === 200) {
        const respData = JSON.parse(xhttp.response);
        console.log(`YOOO: ${respData}`);
        const rangersData = respData[0];
        console.log(`Rangers ${rangersData}`);
        const flyersData = respData[1];
        console.log(`Flyers ${flyersData}`);
        document.getElementById('rangers-text').innerHTML = `${rangersData.wins}-${rangersData.losses}-${rangersData.ot}`;
        document.getElementById('rangers-points').innerHTML = `${rangersData.points} points`;
        document.getElementById('flyers-text').innerHTML = `${flyersData.wins}-${flyersData.losses}-${flyersData.ot}`;
        document.getElementById('flyers-points').innerHTML = `${flyersData.points} points`;
        const pointsDiff = diff(rangersData.points, flyersData.points);
        // const pointsDiff = 24;
        let widthModifier = (1.5 * pointsDiff);
        let fontModifier;

        if (pointsDiff < 12) {
          widthModifier = (1.9 * pointsDiff);
          fontModifier = (4 + (widthModifier / 3));
        } else if (pointsDiff >= 12) {
          widthModifier = (1.75 * pointsDiff);
          fontModifier = (widthModifier / 1.5);
        } else if (pointsDiff >= 25) {
          widthModifier = (pointsDiff / 4);
          fontModifier = (widthModifier / 1.5);
        } else if (pointsDiff >= 28) {
          widthModifier = (100 - pointsDiff / 100);
          fontModifier = (widthModifier / 1.5);
        }
        if (rangersData.points > flyersData.points) {
          document.getElementById('flyers-animate').style.width = `${50 - widthModifier}%`;
          document.getElementById('rangers-animate').style.width = `${50 + widthModifier}%`;
          document.getElementById('flyers-animate').style.fontSize = `${36 - fontModifier}px`;
          document.getElementById('rangers-animate').style.fontSize = `${36 + fontModifier}px`;
          document.getElementById('innerRangersSpan1').style.width = '500px';
          document.getElementById('innerRangersSpan2').style.width = '500px';
          document.getElementById('innerFlyersSpan1').style.border = '0px solid black';
          document.getElementById('innerFlyersSpan2').style.border = '0px solid black';
          document.getElementById('rangers-subtext').innerHTML = responseGenerator('Rangers', pointsDiff);
          document.getElementById('flyers-subtext').innerHTML = `${pointsDiff} points behind`;
        } else if (rangersData.points < flyersData.points) {
          document.getElementById('flyers-animate').style.width = `${50 + widthModifier}%`;
          document.getElementById('rangers-animate').style.width = `${50 - widthModifier}%`;
          document.getElementById('flyers-animate').style.fontSize = `${36 + fontModifier}px`;
          document.getElementById('rangers-animate').style.fontSize = `${36 - fontModifier}px`;
          document.getElementById('innerFlyersSpan1').style.width = '500px';
          document.getElementById('innerFlyersSpan2').style.width = '500px';
          document.getElementById('innerRangersSpan1').style.border = '0px solid black';
          document.getElementById('innerRangersSpan2').style.border = '0px solid black';
          document.getElementById('flyers-subtext').innerHTML = responseGenerator('Flyers', pointsDiff);
          document.getElementById('rangers-subtext').innerHTML = `${pointsDiff} points behind`;
        } else if (rangersData.points === flyersData.points) {
          document.getElementById('flyers-subtext').innerHTML = 'Oh no it\'s tied';
          document.getElementById('rangers-subtext').innerHTML = 'Oh no it\'s tied';
        }
        resolve(xhttp);
      }
    });
    xhttp.open('GET', '/homepage');
    xhttp.setRequestHeader('Content-Type', 'application/json');
    xhttp.send();
  });
};
