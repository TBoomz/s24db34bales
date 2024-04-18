var express = require('express');
const pizza_controller = require('../controllers/fossils');
var router = express.Router();

const secured = (req,res,next)=>{
    if(req.user){
        return next();
    }
    res.redirect("/login");
}

/* GET home page. */
router.get('/', fossil_controller.fossil_view_all_Page);
router.get('/detail', fossil_controller.fossil_view_one_Page);
router.get('/create', secured, fossil_controller.pizza_create_Page);
router.get('/update', secured, fossil_controller.fossil_update_Page);
router.get('/delete', secured, fossil_controller.fossil_delete_Page);


module.exports = router;
