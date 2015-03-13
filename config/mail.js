/**
 * Created by mbrune on 3/9/15.
 */

module.exports = {
    service: "SendGrid",
    host: "smtp.sendgrid.net",
    port: 587,
    secureConnection: false,
    //name: "servername",
    auth: {
        user: "bruneski",
        pass: "CloudBread123@"
    },
    ignoreTLS: false,
    debug: false,
    maxConnections: 5 // Default is 5
}