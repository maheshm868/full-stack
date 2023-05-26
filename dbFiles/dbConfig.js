const config = {
    user: 'devUser1',
    password: 'Welcome@123',
    server: 'localhost',
    database: 'TestData',
    options: {
        trustServerCertificate: true,
        trustedConnection: false,
        instancename: 'localhost'
    },
    port: 1433
}

module.exports = config;