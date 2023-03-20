import http from 'http';
import express, { Express } from 'express';
import routes from './routes/closest';

const app: Express = express();

/* Parse the request */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/* Set CORS */
app.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'POST');
        return res.status(200).json({});
    }
    next();
});

/* Use the routes specified in the routes directory */
app.use('/', routes);

/* Error handling */
app.use((req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(app);
const PORT = 5000
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));