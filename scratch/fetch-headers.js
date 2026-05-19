const https = require('https');

https.get('https://mgschool.in', (res) => {
  console.log('HTTP Status:', res.statusCode);
  console.log('Headers:', JSON.stringify(res.headers, null, 2));
  process.exit(0);
}).on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
