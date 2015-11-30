/**
 * Created by filipe on 11/25/15.
 */
module.exports = {
    connectionString : 'mongodb://adm:12345@ds054288.mongolab.com:54288/projetao',
    port : process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip : process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1'
};
