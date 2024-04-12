var express = require('express');
var router = express.Router();

var api_controller = require('../controllers/api');
var fossil_controller = require('../controllers/fossils'); 

router.get('/', api_controller.api);
router.post('/fossils', fossil_controller.fossil_create_post);
router.delete('/fossils/:id', fossil_controller.fossil_delete);
router.put('/fossils/:id', fossil_controller.fossil_update_put);
router.get('/fossils/:id', fossil_controller.fossil_detail);
router.get('/fossils', fossil_controller.fossil_list);

module.exports = router;
