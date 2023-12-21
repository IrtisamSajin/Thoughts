const express=require('express');
const cors = require('cors');
const dotenv=require('dotenv');
const mongoose=require('mongoose');

const thoughtsRoute=require('./Routes/thoughtsRoute')
const loginRoute=require('./Routes/loginRoutes')
const signupRoute=require('./Routes/signupRoute');
const authenticate=require('./middlewares/authenticate')

const app=express();
app.use(express.json());
//app.use(express.urlencoded({ extended: true }));
app.use(cors());
dotenv.config();


//db connection
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database connected");
  })
  .catch((err) => {
    console.log("Server Side Error");
  });

 
//routes
app.get("/",(req,res) => {
  res.json({
    message: "Server Reached"
  })
})
app.use("/thoughts",authenticate,thoughtsRoute); //
//app.use("/guest/thoughts,thoughtsRoute")
app.use("/login", loginRoute);
app.use("/signup", signupRoute);

// Your code
if (process.env.NODE_ENV === "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, 'client', 'build')));
  app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'),function (err) {
          if(err) {
              res.status(500).send(err)
          }
      });
  })
}
// Your code


//default error handler
app.use("/",(err,req,res,next)=>{
  if (res.headersSent) {
    return next(err);
  }
  const error=err.message?err.message:"Server error";
  res.status(500).json({ error: error });
})


app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port ${process.env.PORT}`)
})