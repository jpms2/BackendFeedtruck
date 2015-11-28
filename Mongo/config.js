/**
 * Created by filipe on 11/25/15.
 */
module.exports = {
    connectionString : 'mongodb://admin:2-IArblmZrha@$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/projetaomaneiro',
    port : process.env.OPENSHIFT_NODEJS_PORT || 8080,

};
