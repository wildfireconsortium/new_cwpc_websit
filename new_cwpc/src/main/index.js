const express = require('express');
const session = require('express-session');
// const MongoStore = require('connect-mongo');
const bodyParser = require('body-parser');
const path = require('path');
var mongodb = require('mongodb');
const multer = require('multer');
const { Readable } = require('stream');
const { connectToDb } = require('./db');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const port = process.env.PORT || 5555;

app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the 'static_files' directory.
// equivalent to public files
app.use(express.static('static_files'));

// const dbstore = new MongoStore({
//   mongoUrl: process.env.CONNECTION_URI,
//   collection: process.env.SESSION_COLLECTION
// });

// app.use(session({
//   cookie: { maxAge: 86400000 },
//   store: dbstore,
//   secret: process.env.SESSION_KEY,
//   resave: false,
//   saveUninitialized: false,
// }));


// Define routes with consistent formatting and error handling
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/index.html'));
});

app.get('/using_the_scorecard', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/using_the_scorecard.html'));
});

app.get('/faq', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/faq.html'));
});

app.get('/press_release', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/press_release.html'));
});

app.get('/scorecard_info', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/scorecard_info.html'));
});

app.get('/about_us', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/about_us.html'));
});

app.get('/flyer', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/flyer.html'));
});

app.get('/subscribe', (req, res) => {
  res.sendFile(path.join(__dirname, 'views/subscribe.html'));
});

// //contact form directly
app.get('/contact_us', (req, res) => {
    res.sendFile(path.join(__dirname, 'views/contactus.html'));
});

//contact form pop-up
app.get('/get-contact-form', (req, res) => {
    const formPath = path.join(__dirname, 'views/contactform.html');
    res.sendFile(formPath, {isPopup: true});
});

app.get('/contactform', (req,res) => {
  res.sendFile(path.join(__dirname, 'views/contactform.html'));
});

app.get('/scorecardform', (req,res) => {
  res.sendFile(path.join(__dirname, 'views/scorecardform.html'));
});


app.get('/supportform', (req,res) => {
  const formPath = path.join(__dirname, 'views/supportCause.html');
  res.sendFile(formPath, {isPopup: true});
});

app.get('/collabform', (req,res) => {
  const formPath = path.join(__dirname, 'views/collaborateform.html');
  res.sendFile(formPath, {isPopup: true});
});

app.get('/involved', (req,res) => {
  const formPath = path.join(__dirname, 'views/getinvolved.html');
  res.sendFile(formPath, {isPopup: true});
});

app.get('/feedbackform', (req,res) => {
  const formPath = path.join(__dirname, 'views/feedbackform.html');
  res.sendFile(formPath, {isPopup: true});
});

app.post('/submit-contact-form', async (req, res) => {
    // Process form data, save to MongoDB, send response
    const pageName = req.body.pageName;
    try{
        const db = await connectToDb();
        
        const contactCollection = db.collection('contactUs'); // Using specified collection
        
        const formData = req.body;
        delete formData._id; // Remove any potential _id field
        
        await contactCollection.insertOne(formData);

        if(pageName === 'index'){
          res.redirect('/?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('contact'));
        }
        else{
          res.redirect('contact_us?status=' +encodeURIComponent('success') + '&form=' + encodeURIComponent('contact'));
        }
    }
    catch(error){
        console.error(error);
        if(pageName === 'index'){
          res.redirect('/?status=' + encodeURIComponent('error') + '&form=' + encodeURIComponent('contact'));
        }
        else{
          res.redirect('contact_us?status=' +encodeURIComponent('error') + '&form=' + encodeURIComponent('contact')); 
        }
    }
});

app.post('/submit-subscribe-form', async (req, res) => {
  // Process form data, save to MongoDB, send response
  const pageName = req.body.pageName;
  try{
      const db = await connectToDb();
      const subsCollection = db.collection('subscribe'); // Using specified collection
      
      const formData = req.body;
      delete formData._id; // Remove any potential _id field
      
      await subsCollection.insertOne(formData);

      if(pageName === 'index'){
        res.redirect('/?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('subscribe'));
      }
      else{
        res.redirect('subscribe?status=' +encodeURIComponent('success') + '&form=' + encodeURIComponent('subscribe'));
      }
  }
  catch(error){
      console.error(error);
      if(pageName === 'index'){
        res.redirect('/?status=' + encodeURIComponent('error') + '&form=' + encodeURIComponent('subscribe'));
      }
      else{
        res.redirect('subscribe?status=' +encodeURIComponent('error') + '&form=' + encodeURIComponent('subscribe')); 
      }
  }
});

app.post('/submit-involved-form', async (req, res) => {
  // Process form data, save to MongoDB, send response
  const pageName = req.body.pageName;
  try{
      const db = await connectToDb();
      const subsCollection = db.collection('involved'); // Using specified collection
      
      const formData = req.body;
      delete formData._id; // Remove any potential _id field
      
      await subsCollection.insertOne(formData);

      if(pageName === 'index'){
        res.redirect('/?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('involved'));
      }
      else{
        res.redirect('involved?status=' +encodeURIComponent('success') + '&form=' + encodeURIComponent('involved'));
      }
  }
  catch(error){
      console.error(error);
      if(pageName === 'index'){
        res.redirect('/?status=' + encodeURIComponent('error') + '&form=' + encodeURIComponent('involved'));
      }
      else{
        res.redirect('involved?status=' +encodeURIComponent('error') + '&form=' + encodeURIComponent('involved')); 
      }
  }
});

app.post('/submit-download-form', async (req, res) => {
  // Process form data, save to MongoDB, send response
  const pageName = req.body.pageName;
  try{
      const db = await connectToDb();
      const formCollection = db.collection('downloadScorecard'); // Using specified collection
      
      const formData = req.body;
      delete formData._id; // Remove any potential _id field
      
      await formCollection.insertOne(formData);
  
      if (pageName === 'index') {
        res.redirect('/?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('download'));
      } else {
        res.redirect(pageName+'?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('download'));
      }
    }
  catch(error){
      console.error(error);
      if(pageName === 'index'){
        res.redirect('/?status=' + encodeURIComponent('error') + '&form=' + encodeURIComponent('download'));
      }
      else{
        res.redirect(pageName+'?status=' +encodeURIComponent('error') + '&form=' + encodeURIComponent('download')); 
      }
  }
});

app.post('/submit-support-form', async (req, res) => {
  // Process form data, save to MongoDB, send response
  const pageName = req.body.pageName;
  try{
      const db = await connectToDb();
      const formCollection = db.collection('supportCause'); // Using specified collection
      
      const formData = req.body;
      delete formData._id; // Remove any potential _id field
      
      await formCollection.insertOne(formData);
  
      if (pageName === 'index') {
        res.redirect('/?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('support'));
      } else {
        res.redirect(pageName+'?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('support'));
      }
    }
  catch(error){
      console.error(error);
      if(pageName === 'index'){
        res.redirect('/?status=' + encodeURIComponent('error') + '&form=' + encodeURIComponent('support'));
      }
      else{
        res.redirect(pageName+'?status=' +encodeURIComponent('error') + '&form=' + encodeURIComponent('support')); 
      }
  }
});

app.post('/submit-collab-form', async (req, res) => {
  // Process form data, save to MongoDB, send response
  const pageName = req.body.pageName;
  try{
      const db = await connectToDb();
      const formCollection = db.collection('collaborate'); // Using specified collection
      
      const formData = req.body;
      delete formData._id; // Remove any potential _id field
      
      await formCollection.insertOne(formData);
  
      if (pageName === 'index') {
        res.redirect('/?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('collab'));
      } else {
        res.redirect(pageName+'?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('collab'));
      }
    }
  catch(error){
      console.error(error);
      if(pageName === 'index'){
        res.redirect('/?status=' + encodeURIComponent('error') + '&form=' + encodeURIComponent('collab'));
      }
      else{
        res.redirect(pageName+'?status=' +encodeURIComponent('error') + '&form=' + encodeURIComponent('collab')); 
      }
  }
});

// app.post('/submit-involved-form', async (req, res) => {
//   // Process form data, save to MongoDB, send response
//   const pageName = req.body.pageName;
//   try{
//       const db = await connectToDb();
//       const formCollection = db.collection('involved'); // Using specified collection
      
//       const formData = req.body;
//       delete formData._id; // Remove any potential _id field
      
//       await formCollection.insertOne(formData);
  
//       if (pageName === 'index') {
//         res.redirect('/?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('involved'));
//       } else {
//         res.redirect(pageName+'?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('involved'));
//       }
//     }
//   catch(error){
//       console.error(error);
//       if(pageName === 'index'){
//         res.redirect('/?status=' + encodeURIComponent('error') + '&form=' + encodeURIComponent('involved'));
//       }
//       else{
//         res.redirect(pageName+'?status=' +encodeURIComponent('error') + '&form=' + encodeURIComponent('involved')); 
//       }
//   }
// });


const upload = multer({
  fileFilter: (req, file, cb) => {
    // Validate file type based on extension and MIME type
    const allowedExtensions = ['jpg', 'jpeg', 'png', 'pdf', 'doc', 'docx','svg','ppt','xlsx','xls'];
    const allowedMimetypes = ['image/jpeg', 'image/png', 'application/pdf', 'image/svg+xml', 
    'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.ms-powerpoint','application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'];

    if (!allowedExtensions.includes(file.originalname.split('.').pop().toLowerCase())) {
        return cb(new Error('Invalid file extension'));
    }

    if (!allowedMimetypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file mimetype'));
    }
    cb(null, true);
  },
  limits: {
      fileSize: 20 * 1024 * 1024 // 20MB maximum
  }
});

app.post('/submit-feedback-form', upload.array('files'),async (req, res) => {
  // Process form data, save to MongoDB, send response
  const pageName = req.body.pageName;
  const uploadedFiles = req.files;
  console.log(uploadedFiles)
  
  const db = await connectToDb();
  try{
    const bucket = new mongodb.GridFSBucket(db);
    const formCollection = db.collection('feedback');

    const fileIds = [];

    // Upload files to GridFS
    for (const file of uploadedFiles) {
      console.log("in for");
      let {fieldname, originalname, mimetype, buffer} = file
      console.log("file infor")
      console.log(fieldname)
      console.log(originalname)
      console.log(mimetype)
      console.log(buffer)

      let fileInfo = {
        filename: originalname,
        contentType: mimetype,
        length: buffer.length,
      }
      let uploadStream = bucket.openUploadStream(fieldname);
      let readBuffer = new Readable()
      readBuffer.push(buffer)
      readBuffer.push(null)

      const isUploaded = await new Promise((resolve, reject)=> {
        readBuffer.pipe(uploadStream)
        .on('finish',resolve("Upload Successful."))
        .on('error',reject("error occured while file upload"))
      });
    
      fileIds.push(uploadStream.id);
    }

    console.log(fileIds)
    
    const formData ={
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      organization: req.body.organization,
      role: req.body.role,
      zipCode: req.body.zipCode,
      subscribe: req.body.subscribe,
      message: req.body.message,
      links: req.body.links,
      fileIds: fileIds
    }
    delete formData._id; // Remove any potential _id field
    
    await formCollection.insertOne(formData);

    if (pageName === 'index') {
      res.redirect('/?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('feedback'));
    } else {
      res.redirect(pageName+'?status=' + encodeURIComponent('success') + '&form=' + encodeURIComponent('feedback'));
    }
  }
  catch(error){
    console.error(error);
    if(pageName === 'index'){
      res.redirect('/?status=' + encodeURIComponent('error') + '&form=' + encodeURIComponent('feedback'));
    }
    else{
      res.redirect(pageName+'?status=' +encodeURIComponent('error') + '&form=' + encodeURIComponent('feedback')); 
    }
  }
});

//download files (will be used later)
// Route to download files from GridFS
// app.get('/download/:fileId', async (req, res) => {
//   const fileId = req.params.fileId;

//   try {
//       const gfsFile = await gfs.files.findOne({ _id: mongodb.ObjectId(fileId) });
//       if (!gfsFile) {
//           return res.status(404).send('File not found');
//       }

//       res.setHeader('Content-Type', gfsFile.contentType);
//       res.setHeader('Content-Disposition', `attachment; filename="${gfsFile.filename}"`);

//       const readStream = gfs.createReadStream(gfsFile._id);
//       readStream.pipe(res);
//   } catch (error) {
//       console.error(error);
//       res.status(500).send('Error downloading file');
//   }
// });

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
