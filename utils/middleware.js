const authentication = (req,res,next) => {
const token = "ok";
if(token === "ok")
{
   console.log("Authenticated");
   next();
}
else
{
  res.status(401).send("Cannot Auth");
}
}

module.exports={
    authentication
}