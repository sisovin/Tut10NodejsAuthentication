// Cross origin resource sharing and Enable All CORS Requests
const whitelist = [
     'https://www.yoursite.com',
     'http://127.0.0.1:5500',
     'http://localhost:3500',
     'http://localhost:3000'
];
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSuccessStatus: 200
};
module.exports = corsOptions;
