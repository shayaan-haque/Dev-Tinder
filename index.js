const express = require("express");
const app = express();
const { connectDB } = require("./config/database");
const {userModel} = require("./models/users");

app.use(express.json());

app.post("/signup", async (req, res) => {

   const User = new userModel(req.body);
  
   console.log(req.body);

   try{
     await User.save();
     res.send("saved successfully"); 
   }
   catch(err)
   {
    res.status(400).send(err.message);
   }
});

app.get("/find",async(req,res)=> {
     
  const email = await userModel.findOne({email:"Sac@gmail.com"});
  if(email.length ===  0)
  {
      res.send("No email found");
  }
  else
  {
      res.send(email);
  }
});


app.get("/feed", async(req,res)=>{
    
  try{
      
    const feed = await userModel.find({});
    res.send(feed);
    console.log("Showing all the feed");
  }catch(err)
  {
      res.status(400).send(err.message);
  }
});

app.delete("/delete", async(req,res)=>{
      const id = req.body.userId;
      try{
        const delet = await userModel.findOneAndDelete({ _id: id });
        res.send("deleted successfully");
      }
      catch(err)
      {
        res.status(400).send(err.message);
      }
});
 
connectDB()
  .then(() => {
    console.log("Connected");
    app.listen(7777, () => {
      console.log("Active on port 7777");
    });
  })
  .catch((err) => console.log("Did not connect"));
