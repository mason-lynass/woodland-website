// Fails the build if required REACT_APP_* vars aren't set, so a
// deploy can't silently ship with missing events/Instagram/band data
// (see README for where to get these values).
//
// Loaded standalone via `node`, not through react-scripts, so .env
// isn't picked up automatically the way it is for build/start.
require('dotenv').config();

const required = [
    'REACT_APP_GOOGLE_SHEET_URL',
    'REACT_APP_BEHOLD_URL',
    'REACT_APP_SANITY_PROJECT_ID',
];

const missing = required.filter((name) => !process.env[name]);

if (missing.length > 0) {
    console.error(
        `\nMissing required environment variable(s): ${missing.join(', ')}\n` +
        'These must be set (e.g. in a local .env file) before building/deploying, ' +
        'or the events, Instagram gallery, and band data will silently fail in production. ' +
        'See README.md for where to get these values.\n'
    );
    process.exit(1);
}
