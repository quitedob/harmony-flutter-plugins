const express = require('express');
const cors = require('cors');
const { PORT } = require('./lib/config');
const { migrateData } = require('./lib/data');
const { errorHandler } = require('./lib/errors');
const pluginsRouter = require('./routes/plugins');
const agentRouter = require('./routes/agent');
const reportsRouter = require('./routes/reports');
const exportRouter = require('./routes/export');
const settingsRouter = require('./routes/settings');
const providersRouter = require('./routes/providers');
const profileRouter = require('./routes/profile');
const mappingRouter = require('./routes/mapping');
const upgradeRouter = require('./routes/upgrade');
const modelTiersRouter = require('./routes/model-tiers');
const { runWithProfile } = require('./lib/profile');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static('frontend'));

// Allow per-request profile pinning without mutating the process-global default profile.
app.use((req, _res, next) => {
  const pid = req.query && (req.query.profileId || req.query.profile || req.query.p);
  if (!pid) return next();
  try {
    return runWithProfile(String(pid), next);
  } catch {
    return next();
  }
});

app.use('/api/plugins', pluginsRouter);
app.use('/api/plugins', agentRouter);
app.use('/api', reportsRouter);
app.use('/api', exportRouter);
app.use('/api/settings', settingsRouter);
app.use('/api/providers', providersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/mapping', mappingRouter);
app.use('/api/upgrade', upgradeRouter);
app.use('/api/model-tiers', modelTiersRouter);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Adapt Workflow server running at http://localhost:${PORT}`);
  await migrateData();
});
