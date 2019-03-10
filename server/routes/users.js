var express = require('express');
var router = express.Router();
var admin = require('firebase-admin');

// var usersList = [];

setTimeout(()=>{
//  listAllUsers();
},2500)

router.post('/delete-user', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  admin.auth().deleteUser(req.body.uid)
  .then(function() {
    var refUser = admin.database().ref("Developer/" + req.body.uid);
      refUser.remove()
      .then(function() {
          res.json({"status": "ok", "data" : "Successfully deleted user"});
        })
        .catch(function(error) {
          res.json({"status": "error", "data" : error});
        });
      })
    })
    
router.post('/update-user', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  admin.database().ref("Developer/" + req.body.uid).update({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      status: req.body.status,
      rate: req.body.rate,
      rate_unit: req.body.rate_unit,
      currency: req.body.currency
  }, function(error) {
      if (error) {
        res.json({"status": "error", "data" : error});
      } else {
        res.json({"status": "ok", "data" : ""});
      }
    }
  );
  admin.auth().updateUser(req.body.uid, {
    phoneNumber: req.body.phone,
    emailVerified: true,
    role: req.body.role,
    displayName: req.body.firstName,
    disabled: false
  })
    .then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully updated user", userRecord.toJSON());
    })
    .catch(function(error) {
      console.log("Error updating user:", error);
    });

});


module.exports = router;
