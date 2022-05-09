export default function handler(req, res) {
  const status = {
    status: 'health',
    longStatus: 'Healthy. All routes are functioning properly.',
    version: '1.0.0',
  };

  // if verbose is defined, enumerate the endpoints
  if (req.query.verbose)
    status.routes = [
      { path: '/status', status: 'healthy' },
      { path: '/rocketLaunch', status: 'healthy' },
      { path: '/fuel', status: 'healthy' },
    ];

  // wait a whole ass second
  setTimeout(() => res.json(status), 1000);
}
