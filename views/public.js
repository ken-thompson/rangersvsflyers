/* eslint-disable default-case */
/* eslint-disable no-empty */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable indent */
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
            console.log('tuied');
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
                //const pointsDiff = 20;
                let widthModifier = (1.5 * pointsDiff);
                let fontModifier;

                if (pointsDiff >= 12) {
                    widthModifier = (1.9 * pointsDiff);
                    fontModifier = (4 + (widthModifier / 3));
                } else {
                    widthModifier = (1.75 * pointsDiff);
                    fontModifier = (widthModifier / 1.5);
                }
                console.log(`width: ${50 + widthModifier}, and ${50 - widthModifier}`);

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
//   fetch('/homepage')
//     .then((response) => {
//       console.log(`response: ${response[0].name}`);
//       const rangers = document.getElementById('rangers-text');
//       const { name, wins, losses, ot, points } = response[0];
//       rangers.innerHTML = `${name} ${wins} ${losses} ${ot} ${points}`;
//     })
//     .catch((error) => {
//       console.log(`nope: ${error}`);
//     });
//   const rangers = document.getElementById('rangers-text');
//   rangers.style.color = 'red';
//   // };

