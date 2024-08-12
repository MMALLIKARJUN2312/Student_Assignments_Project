require('dotenv').config();

const mysql = require('mysql2');
const redis = require('redis');

const redisPort = process.env.REDIS_PORT || 6379;

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST || 'localhost'}:${redisPort}`
});

redisClient.on('error', (err) => {
    console.error('Redis error:', err);
});

redisClient.on('ready', () => {
    console.log('Redis client connected and ready');
});

redisClient.on('end', () => {
    console.log('Redis client disconnected, attempting to reconnect...');
    reconnectRedis();
});

const reconnectRedis = () => {
    console.log('Attempting to reconnect to Redis...');
    redisClient.connect().catch(err => {
        console.error('Redis reconnection error:', err);
        setTimeout(reconnectRedis, 5000);
    });
};

redisClient.connect().catch(err => {
    console.error('Initial Redis connection error:', err);
    reconnectRedis();
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to the MySQL database:', err);
        return;
    }
    console.log('Connected to the MySQL database');
    connection.release();
});

module.exports = { db: pool.promise(), redisClient };
