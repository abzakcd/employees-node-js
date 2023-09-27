const express = require('express');
const router = express.Router()
module.exports = router;

router.get("/",(req, res) => {

    res.render("employees", {pageTitle:"בוקר טוב"});

});

router.post("/Add", function (req, res) {
    // קליטת הנתונים
    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;

    // יצירת שאילתה לשמירת שורה
    let Query = `INSERT INTO employees (FirstName,LastName) VALUES ('${FirstName}', '${LastName}')`;
    console.log(LastName);

    db_pool.query(Query, function (err, rows, fields) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            res.status(200).json({ message: "OK" });
        }
    });
});

router.delete("/Del",(req, res) => {
    let id=req.body.id;


    let q=`DELETE FROM \`employees\` WHERE id='${id}' `;

    db_pool.query(q, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;
        }else{
            res.status(200).json({message: "OK"});
            // res.status(200).json({message: "Added"});
            // res.status(200).json(req.crs_data_filtered);
        }

    });


    // res.send("good morning");
});


router.post("/Edit",(req, res) => {
    let id=req.body.id;
    let FirstName = req.body.FirstName;
    let LastName = req.body.LastName;

    let q=`UPDATE \`employees\`  SET \`FirstName\`='${FirstName}' , \`LastName\`='${LastName}'  WHERE id=${id} `;

    db_pool.query(q, function(err, rows, fields){

        if(err){
            res.status(500).json({message: err})
            // throw err;
        }else{
            res.status(200).json({message: "OK"});
        }
    });
});
router.get("/List",(req, res) => {

    let q="SELECT * FROM `employees`";

    db_pool.query(q, function(err, rows, fields){

        if(err)
        {
            res.status(500).json({message: err})
            // throw err;
        }
        else
        {
            res.status(200).json(rows );
        }

    });


    // res.send("good morning");
});