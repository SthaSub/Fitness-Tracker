const router = require('express').Router();
const fitnessRoutes = require('./fitnessAPIRoutes');
const indexRoutes = require('./pageRoutes');

router.use('/api',fitnessRoutes);
router.use('/',indexRoutes);
module.exports = router;