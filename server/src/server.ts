import { app } from './app';
import { startBinaryCycleCron } from './jobs/binaryCycleJob';

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Wanderlust API server is running on http://localhost:${PORT}`);
  
  // Initialize Background Jobs
  startBinaryCycleCron();
});
