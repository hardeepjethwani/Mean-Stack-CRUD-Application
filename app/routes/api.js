var User = require('../models/user')
var Associate = require('../models/associate')
var jwt = require('jsonwebtoken');
var secret = 'hardeep';

module.exports = function (router) {

    //Register the user
    router.post('/users', function (req, res) {
        var user = new User();
        user.username = req.body.username;
        user.password = req.body.password;
        user.email = req.body.email;

        if (req.body.username == null || req.body.username == "" || req.body.password == null || req.body.password == "" || req.body.email == null || req.body.email == "") {
            res.json({
                success: false,
                message: "Ensure that Email, Password and Username are provided"
            });
        } else {
            user.save(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        message: "Username  or Email already exist"
                    });
                } else {
                    res.json({
                        success: true,
                        message: "user created"
                    });
                }
            });
        }
    });

    //Add associate

    router.post('/newAssociate', function (req, res) {
        var associate = new Associate();
        associate.empid = req.body.empid;
        associate.skills = req.body.skills;
        associate.email = req.body.email;
        associate.name = req.body.name;
        associate.contact = req.body.contact;

        if (req.body.empid == null || req.body.empid == "" || req.body.skills == null || req.body.skills == "" || req.body.email == null || req.body.email == "" || req.body.name == null || req.body.name == "" || req.body.contact == null || req.body.contact == "") {
            res.json({
                success: false,
                message: "Ensure that empid, Name, Email, contact and  skills are provided"
            });
        } else {
            associate.save(function (err) {
                if (err) {
                    res.json({
                        success: false,
                        message: "empid  or Email or contact already exist"
                    });
                } else {
                    res.json({
                        success: true,
                        message: "associate created"
                    });
                }
            });
        }

    });

    //View Associate list
    router.post('/listAssociate', function (req, res) {
        Associate.find({}, function (error, documents) {
            res.send(documents);
        });
    });

    //getAssociate
    router.post('/getAssociateData', function (req, res) {

        Associate.findOne({
            empid: req.body.emp
        }, function (err, documents) {
            res.send(documents);
        })
    })


    //deleteAssociate
    router.post('/deleteAssociate', function (req, res) {
    console.log("abc")
        Associate.deleteOne({
            "empid": req.body.emp
        }, function () {
            res.json({
                success: true,
            });
        })
    })


    //Update Associate Details
    router.post('/updateDetails', function (req, res) {
        Associate.update({
            "empid": req.body.empid
        }, {
            $set: {
                "skills": req.body.skills,
                "name": req.body.name,
                "email": req.body.email,
                "contact": req.body.contact
            }
        }, function(){
            res.json({
                success: true,
                message: "Details Updated"
            });
        })

    })



    //Login
    router.post('/authenticate', function (req, res) {
        User.findOne({
            username: req.body.username
        }).select('email username password').exec(function (err, user) {
            if (err) throw err;

            if (!user) {
                res.json({
                    success: false,
                    message: "could not authenticate user"
                });
            } else if (user) {
                if (req.body.password) {
                    var validPassword = user.comparePassword(req.body.password);
                } else {
                    res.json({
                        success: false,
                        message: "Password not provided"
                    });
                }
                if (!validPassword) {
                    res.json({
                        success: false,
                        message: "could not authenticate password"
                    });
                } else {
                    var token = jwt.sign({
                        username: user.username,
                        email: user.email
                    }, secret, {
                        expiresIn: '1h'
                    })
                    res.json({
                        success: true,
                        message: "User Authenticated",
                        token: token
                    });
                }
            }
        })
    });




    router.use(function (req, res, next) {
        var token = req.body.token || req.headers['x-access-token']; // take the token from client header
        if (token) {
            //verify token
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    res.json({
                        Success: false,
                        message: "Token Invalid"
                    });
                } else {
                    req.decoded = decoded;
                    next(); // continue the application on this route
                }
            });
        } else {
            res.json({
                Success: false,
                message: "No token provided"
            });
        }
    })

    router.post("/currentUser", function (req, res) {

        res.send(req.decoded)
    })

    return router;
}