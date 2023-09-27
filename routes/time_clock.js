const express = require('express');
const router = express.Router()
module.exports = router;


router.get("/",(req, res) => {

    res.render("time_clock", {pageTitle:"בוקר טוב"});

});

router.post("/Add", function (req, res) {
    // קליטת הנתונים
    let fullname = req.body.employeeID;
    let entryTime = req.body.entryTime;
    let exitTime = req.body.exitTime;

    console.log(fullname);


    // יצירת שאילתה לשמירת שורה
    let Query = `INSERT INTO times (fullname, start, end) VALUES ('${fullname}', '${entryTime}', '${exitTime}')`;

    console.log(fullname);

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


    let q=`DELETE FROM \`users\` WHERE id='${id}' `;

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




router.get("/List",(req, res) => {

    let q="SELECT * FROM `employees` ";

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


