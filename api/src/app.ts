import express from 'express';
import passport from 'passport';
import passportMiddleware from './routes/passport';
import videoRoutes from './routes/video.routes';
import sessionRoutes from './routes/session.routes';
import morgan from 'morgan';
import cors from 'cors';
const app = express();

// Setting

app.set('appName', 'Video API');
app.set('port', process.env.PORT || 3500);

// Middlewares

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(sessionRoutes);
app.use(videoRoutes);
app.use(passport.initialize());
passport.use(passportMiddleware);

// Export

export default app;