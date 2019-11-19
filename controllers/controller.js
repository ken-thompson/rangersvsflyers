/* eslint-disable no-multiple-empty-lines */
const rp = require('request-promise');
const DataModel = require('../models/model');

const nyrOptions = {
  method: 'GET',
  uri: 'https://statsapi.web.nhl.com/api/v1/teams/3/stats',
  json: true,
};

const phlOptions = {
  method: 'GET',
  uri: 'https://statsapi.web.nhl.com/api/v1/teams/4/stats',
  json: true,
};

const nyrPromise = rp(nyrOptions)
  .then((response) => {
    const { name } = response.stats[0].splits[0].team;
    const { wins } = response.stats[0].splits[0].stat;
    const { losses } = response.stats[0].splits[0].stat;
    const { ot } = response.stats[0].splits[0].stat;
    const { pts } = response.stats[0].splits[0].stat;
    const nyrModel = new DataModel(name, wins, losses, ot, pts);
    return nyrModel;
  })
  .catch(() => {
  });

const phlPromise = rp(phlOptions)
  .then((response) => {
    const { name } = response.stats[0].splits[0].team;
    const { wins } = response.stats[0].splits[0].stat;
    const { losses } = response.stats[0].splits[0].stat;
    const { ot } = response.stats[0].splits[0].stat;
    const { pts } = response.stats[0].splits[0].stat;
    const phlModel = new DataModel(name, wins, losses, ot, pts);
    return phlModel;
  })
  .catch(() => {
  });

const homepage = (req, res) => Promise.all([nyrPromise, phlPromise])
  .then((response) => {
    res.send(response);
  }).catch(() => {
    res.sendStatus('400');
    res.end();
  });

module.exports = {
  homepage,
};
