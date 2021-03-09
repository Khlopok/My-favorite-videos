import express from 'express';
import passport from 'passport';
import cors from 'cors';
import morgan from 'morgan';
import passportMiddleware from './routes/passport';
import videoRoutes from './routes/video.routes';
import sessionRoutes from './routes/session.routes';
const app = express();

// Setting

app.set('appName', 'Video API');
app.set('port', process.env.PORT || 3500);

// Middlewares

/* app.use((req, res, next) => {
    res.status(404);
    res.redirect('/');
    return;
}) */
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