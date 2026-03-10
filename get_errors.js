const { execSync } = require('child_process');
const fs = require('fs');
try {
  execSync('npx tsc --noEmit', {encoding: 'utf8', maxBuffer: 10*1024*1024});
  console.log('TS OK');
} catch (e) {
  fs.writeFileSync('ts.txt', e.stdout || e.message);
}
try {
  execSync('npm run lint', {encoding: 'utf8', maxBuffer: 10*1024*1024});
  console.log('LINT OK');
} catch (e) {
  fs.writeFileSync('lint.txt', e.stdout || e.message);
}
