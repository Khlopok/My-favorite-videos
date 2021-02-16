import app from './app';
import './db';

app.listen(app.get('port'), () => console.log(`${app.get('appName')} ready on port ${app.get('port')}`));