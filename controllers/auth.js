import User from "../models/auth.js";
import jwt from "jsonwebtoken";
import Aws from 'aws-sdk';

const s3 = new Aws.S3({
  accessKeyId:process.env.AWS_ACCESS_KEY_ID,              // accessKeyId that is stored in .env file
  secretAccessKey:process.env.AWS_ACCESS_KEY_SECRET       // secretAccessKey is also store in .env file
})

  export const register = async (req, res) => {
    console.log(req.file)  // to check the data in the console that is being uploaded
  
    // Definning the params variable to uplaod the photo
    
    const params = {
        Bucket:process.env.AWS_BUCKET_NAME,      // bucket that we made earlier
        Key:req.file.originalname,               // Name of the image
        Body:req.file.buffer,                    // Body which will contain the image in buffer format
        ACL:"public-read-write",                 // defining the permissions to get the public link
        ContentType:"image/jpeg"                 // Necessary to define the image content-type to view the photo in the browser with the link
    };
  
   // uplaoding the photo using s3 instance and saving the link in the database.
    s3.upload(params,(error,data)=>{
        if(error){
            res.status(500).send({"err":error})  // if we get any error while uploading error message will be returned.
        }
   // If not then below code will be executed
        
    console.log(data)
    // this will give the information about the object in which photo is stored 
    
   // saving the information in the database.   
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
            userImage: data.Location
        });
        user.save()
            .then(result => {
                res.status(200).send({
                    _id: result._id,
                    username: result.username,
                    email: result.email,
                    password: result.password,
                    userImage: data.Location,
                })
            })
            .catch(err => {
                res.send({ message: err })
          })
    })
}


// Render the registration page
export const registerPage = async (req, res) => {
  return res.render('register', { msg: '' });
};

// Render the login page
export const loginPage = async (req, res) => {
  return res.render('login', { msg: '' });
};

// Render the dashboard page
export const dashboardPage = async (req, res) => {
  const token = req.cookies.token;
  const payload = jwt.verify(token, process.env.JWT_SECRET);
  const username = payload.username.toString().toLocaleUpperCase();
  return res.render('dashboard', { msg: username, layout: '../views/layouts/dash' });
};

// Handle user registration
// export const register = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     if (!username || !email || !password) {
//       return res.status(400).render('register', { msg: 'Please provide all required parameters' });
//     }

//     const user = await User.findOne({ email });

//     if (user) {
//       console.log('User already exists');
//       return res.status(400).render('register', { msg: `A user with ${req.body.email} already exists` });
//     }

//     const newUser = await User.create({ ...req.body });

//     const token = newUser.createJWT();
//     res.cookie('token', token, { httpOnly: true, secure: true });

//     return res.status(201).redirect('login');
//   } catch (error) {
//     console.log(error);
//     return res.status(500).render('register', { msg: error.message });
//   }
// };

// Handle user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Checking for an already existing email
    const user = await User.findOne({ email });
    if (!user) {
      console.log('User does not exist');
      return res.status(400).render('login', { msg: `A user with ${req.body.email} does not exist` });
    }

    // Checking for incorrect password
    const isPasswordCorrect = await user.comparePasswords(password);
    if (!isPasswordCorrect) {
      console.log('Incorrect Password');
      return res.status(400).render('login', { msg: 'Incorrect Password' });
    }

    const token = user.createJWT();
    res.cookie('token', token, { httpOnly: true, secure: true });

    return res.status(200).redirect('dashboard');
  } catch (error) {
    console.log(error);
    return res.status(500).redirect('login', { msg: error.message });
  }
};




