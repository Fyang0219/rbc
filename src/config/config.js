module.exports = {
    
    server: {
        protocol: process.env.PROTOCOL || 'http',
        httpPort: process.env.PORT || 3000
    }
    
};