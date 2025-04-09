import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './config/db.js'
import jobRoutes from './routes/jobRoutes.js'
import errorHandler from './middlewares/errorHandler.js';

dotenv.config()
const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/jobs', jobRoutes)

app.use(errorHandler);

app.get('/', (req, res) => {
  res.send('Student Job Tracker API is running...')
})

connectDB().then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
});
