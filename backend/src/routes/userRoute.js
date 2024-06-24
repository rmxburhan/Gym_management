const route = require("express").Router();


// TODO : admin function : CRUD for users collections (pending)

route.get("/", function(req,res)  {
    res.status(200).json({
        status : "success",
        message : "Get gym data success!"
    });
})


route.get("/:id", function(req,res)  {
    const {id} = req.params;
    res.status(200).json({
        status : "success",
        message : `Get gym data with id ${id} success!`
    });
})

route.post("/", function(req,res)  {
    res.status(200).json({
        status : "success",
        message : "Gym has been added!"
    });
})

route.put("/:id", function(req,res) {
    res.status(200).json({
        status : "success",
        message : "Gym has been updated!"
    })
})

route.delete("/:id",function (req, res) {
    res.status(204).end();
})


module.exports = route;