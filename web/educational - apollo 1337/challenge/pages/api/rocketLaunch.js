import fuelPumps from "../../data/fuelPumps";
import flag from "../../data/flag";
import token from "../../data/token";

export default function handler(req, res) {
  if (req.headers["content-type"] !== 'application/json') {
    res.status(400).send('request body must be json');
    return;
  }

  if (!req.body || typeof req.body !== 'object') {
    res.status(400).send('Request must be an object');
    return;
  }

  if (req.body.rocket === undefined) {
    res.status(400).send('rocket not specified');
    return;
  }

  if (typeof req.body.rocket !== 'string') {
    res.status(400).send('rocket must be a string');
    return;
  }

  if (req.body.rocket !== 'triton') {
    res.status(400).send('rocket not recognized (available: triton)');
    return;
  }

  if (req.body.launchTime === undefined) {
    res.status(400).send('launchTime not specified');
    return;
  }

  if (typeof req.body.launchTime !== 'string') {
    res.status(400).send('launchTime must be a string');
    return;
  }

  if (!req.body.launchTime.match(/^\d\d:\d\d$/)) {
    res.status(400).send('launchTime not in hh:mm format');
    return;
  }

  if (req.body.launchTime !== "12:00") {
    res.status(400).send('launchTime unapproved');
    return;
  }

  if (req.body.pumpID === undefined) {
    res.status(400).send('fuel pumpID not specified');
    return;
  }

  if (typeof req.body.pumpID !== 'number') {
    res.status(400).send('fuel pumpID must be a number');
    return;
  }

  if (req.body.pumpID < 0 || req.body.pumpID >= fuelPumps.length) {
    res.status(400).send('fuel pumpID out of bounds');
    return;
  }

  if (fuelPumps[req.body.pumpID].remaining < 50 || fuelPumps[req.body.pumpID].status !== 'active') {
    res.status(400).send('/fuel/' + req.body.pumpID + ' is either not active or not above 50% capacity');
    return;
  }

  if (req.body.token === undefined) {
    res.status(400).send('frontend authorization token not specified');
    return;
  }

  if (req.body.token !== token) {
    res.status(400).send('frontend authorization token invalid');
    return;
  }

  res.send('rocket launched. ' + flag);
}
