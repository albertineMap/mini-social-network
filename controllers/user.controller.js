const UserModel = require("../models/user.model");
const ObjectID = require('mongoose').Types.ObjectId;

//retrieve all resources
module.exports.index = async(req, res) =>{
    const users = await UserModel.find().select('-password');
    console.log(users)
    res.status(200).json(users);
}

//show a resource
module.exports.show = async(req, res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('unknown ID'+req.params.id);

    UserModel.findById(req.params.id, (err,data) =>{
        if(!err) res.send(data)
        else console.log('unknown ID :'+ err)
    }).select('-password')
}


//update a resource
module.exports.update = async(req, res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('unknown ID'+req.params.id);

    try{
        await UserModel.findOneAndUpdate(
            {_id: req.params.id},
            {
                $set: {
                    bio: req.body.bio
                }
            },
            {new: true, upsert: true, setDefaultsOnInsert: true}
        ) 
        .then((docs) => res.send(docs))
        .catch((err) => res.status(500).send({ message: err }));
    }
    catch(err){
        res.status(500).json({ message: err }); 
    }
}

//delete a resource
module.exports.delete = async(req, res) =>{
    if(!ObjectID.isValid(req.params.id))
        return res.status(400).send('unknown ID'+req.params.id);

    try{
        await UserModel.deleteOne(
            {_id: req.params.id}, 
        ).exec()
        res.status(200).json({message: 'succeful deleted'})
    }
    catch(err){
        res.status(500).json({ message: err }); 
    }
}

//add a follow 
module.exports.follow = async(req, res) =>{
    if(!ObjectID.isValid(req.params.id) || !ObjectID.isValid(req.params.idToFollowing))
        return res.status(400).send('unknown ID'+req.params.id);

    try{
        await UserModel.findByIdAndUpdate(
            req.params.id, 
            {$addToSet: {following: req.body.idToFollowing}},
            {new: true, upsert:true},
            (err,docs) =>{
                if(!err) res.status(201).json(docs);
                else return res.status(400).json(err)
            }
        ) 
        //add to following
        await UserModel.findByIdAndUpdate(
            req.body.idToFollowing,
            {$addToSet: {followers: req.params.id}},
            {new: true, upsert:true},
            (err,docs) =>{
                if(err) res.status(400).json(err);
                // else return res.status(400).json(err)
            }
        )
    }
    catch(err){
        res.status(500).json({ message: err }); 
    }
}