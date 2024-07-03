const route = require("express").Router();
const {
    getAllMembers,
    getMemberById,
    filterMemberRules,
    updateProfileRules,
    updateUserProfile
} = require("../controllers/userController")
const validate = require("../utils/validationRules")

// TODO : admin function : CRUD for users collections (pending)

route.get("/",filterMemberRules(), validate, getAllMembers);

route.get("/:id", getMemberById)

// route.post("/", function(req,res)  {
//     res.status(200).json({
//         status : "success",
//         message : "Gym has been added!"
//     });
// })

route.put("/:id", updateProfileRules(), validate, updateUserProfile);

// route.delete("/:id",function (req, res) {
//     res.status(204).end();
// })

// TODO : member section for userRoute


module.exports = route;