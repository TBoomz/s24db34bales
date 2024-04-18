const { ExplainVerbosity } = require('mongodb');
var Fossil = require('../models/fossil'); 
exports.fossil_list = async function(req,res){
    try{
        theFossils = await Fossil.find();
        res.send(theFossils);
    }
    catch(err){
        res.status(500);
        res.send(`{"error":${err}}`);
    }
};

exports.fossil_detail = async function(req,res){
    console.log("detail" + req.params.id);
    try{
        result = await Fossil.findById(req.params.id);
        res.send(result);
    }catch(error)
    {
        res.status(500);
        res.send(`{"error":document for id ${req.params.id} not found`);
    }
};

exports.fossil_create_post = async function(req, res) {
    console.log(req.body)
    let document = new Fossil();
    document.era = req.body.era;
    document.species = req.body.species;
    document.age = req.body.age;
    try{
        let result = await document.save();
        res.send(result);
    }
    catch(err){
        res.status(500);
        res.send(`{"error":${err}}`);
    }

};

exports.fossil_delete = async function(req,res){
    console.log("delete" + req.params.id)
    try{
        result = await Fossil.findByIdAndDelete(req.params.id)
        console.log("Removed" + result)
        res.send(result)
    }catch(err){
        res.status(500)
        res.send(`{"error": Error deleting ${err}}`);
    }
};

exports.fossil_update_put = async function(req, res){
    console.log(`Updated on id ${req.params.id} with body ${JSON.stringify(req.body)}`);
    try{
        let toUpdate = await Fossil.findById(req.params.id);
        if(req.body.era)
            toUpdate.era = req.body.era;
        if(req.body.species)
            toUpdate.species = req.body.species;
        if(req.body.age)
            toUpdate.age = req.body.age;
        let result = await toUpdate.save();
        console.log("Success" + result)
        res.send(result)
    }catch (err){
        res.status(500);
        res.send(`{"error": ${err}: Update for id ${req.params.id} failed`);
    }
};

exports.fossil_view_all_Page = async function(req,res) {
    try {
        theFossils = await Fossil.find();
        res.render('fossil', {title:'Fossil Search Result', results:theFossils});
    }
    catch(err){
        res.status(500);
        res.send(`"error";${err}`);
    }
};

exports.fossil_view_one_Page = async function(req, res){
    console.log("Single view for id" + req.query.id)
    try{
        result = await Fossil.findById(req.query.id)
        res.render('fossildetail', { title:'Fossil Detail',toShow:result});
    }
    catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.fossil_create_Page = function(req, res){
    console.log("Create view")
    try{
        res.render('fossilcreate', {title:'Fossil Create'});
    }catch (err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.fossil_update_Page = async function(req, res){
    console.log("Update view for item" + req.query.id)
    try{
        let result = await Fossil.findById(req.query.id)
        res.render('fossilupdate', {title: 'Fossil Update',toShow:result});
    }catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
};

exports.fossil_delete_Page = async function(req, res){
    console.log("Delete view for id" + req.query.id)
    try {
        result = await Fossil.findById(req.query.id)
        res.render('fossildelete', {title: 'Fossil Delete',toShow:result});
    }catch(err){
        res.status(500)
        res.send(`{'error': '${err}'}`);
    }
    };