//Importation express-rate-limit
const expressRateLimit = require('express-rate-limit');

//Configuration
const loginLimiter = expressRateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limite 100 requests pour 15 minutes
  });

//Exportation de limiter
module.exports = { loginLimiter };