import fuelPumps from '../../../data/fuelPumps';

export default function handler(req, res) {
  res.json(fuelPumps.map(pump => ({ name: pump.name, id: pump.id })));
}
