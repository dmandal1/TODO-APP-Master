const developement = {
    name: 'development',
    JWT_KEY: 'deepakmandal',
    MONGO: 'mongodb://localhost/todo_dev'
};

const production = {
    name: 'production',
    JWT_KEY: process.env.JWT_KEY,
    MONGO: process.env.MONGO_PROD
};
module.exports = process.env.NODE_ENV === undefined || 'development' ? developement : production;
