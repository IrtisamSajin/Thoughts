const User = require("../Models/usersModel");

async function updateThoughts(user_id, updatedThoughts) {

  await User.updateOne({ _id:user_id }, { thoughts: updatedThoughts })
    .then(() => {
      console.log("Thoughts Updated");
    })
    .catch((err) => {
      console.log(err);
    });
}

async function getThoughts(user_id){
  try{
    const user=await User.findOne({_id:user_id});
    const userDetails={
      fullName: user.fullName,
      thoughts: user.thoughts
    }
    return userDetails;
  }catch(err){
    console.log(err);
  }
}

module.exports={updateThoughts,getThoughts};