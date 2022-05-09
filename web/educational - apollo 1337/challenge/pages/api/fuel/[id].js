import fuelPumps from '../../../data/fuelPumps';

export default function handler(req, res) {
  const id = parseInt(req.query.id);
  if (id === null || id >= fuelPumps.length || id < 0) {
    res.send('invalid fuel pump id');
    return;
  }

  res.json(fuelPumps[id]);
}
