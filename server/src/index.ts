//require('dotenv').config();

import { app } from "./app";

const PORT = process.env.PORT || 3003;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});