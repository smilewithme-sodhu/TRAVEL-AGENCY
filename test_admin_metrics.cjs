const axios = require('axios');
axios.get('http://localhost:5000/api/admin/dashboard/metrics').then(res => console.log(res.data)).catch(err => console.error(err.response ? err.response.data : err.message));
