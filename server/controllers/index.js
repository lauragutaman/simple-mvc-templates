// There is no reason for the name here except as an
// example of how to set something for the POST
let name = 'unknown';

const {cat, dog} = models; 

const hostIndex = (req, res) => {

};

const hostPage1 = (req, res) => {
  return res.sendFile(path.resolve(`${__dirname}../../views/page1.html`));
};

const hostPage2 = (req, res) => {
  return res.sendFile(path.resolve(`${__dirname}../../views/page2.html`));
};

const getName = (req, res) => {
  return res.json({ name });
};

const setName = (req, res) => {
  console.dir(req.body);
  if (!req.body.firstname || !req.body.lastname) {
    return res.status(400).json({
      error: 'Name is required',
      id: 'you dumb',
    });



  }
  name = `${req.body.firstname} ${req.body.lastname}`;
  return res.json({ name });

};

const hostPage4 = async(req, res)=>{
  try{
    const docs = await Dog.find({}).lean().exec();
    return res.render('page4',{dogs: docs});

  } catch(err){
    console.log(err); 
    return res.status(500).json({error: 'failed to find dogs'});
  }
};

const createDog = async (req,res) =>{
  if(!req.body.name || !req.body.breed || !req.body.age){
    return res.status(400).json({error: 'name, breed and age are all required'});
  }
  const dogData = {
    name: req.body.name, 
    breed: req.body.breed,
    age: req.body.age,
  };

  const newDog = new dog(dogData);

  try {
    await newDog.save();
    return res.status(201).json({
      name: newDog.name,
      breed: newDog.breed, 
      age: newDog.age, 
    }); 
  } catch (err){
    console.log(err);
    return res.status(500).json({error: 'failed to create dog'});
  }
};

const changeDogAge = async(req,res)=>{
  if(!req.body.name){
    return res.status(400).json({error: 'name is required'});
  }

  try{
    const doc = await Dog.findOneAndUpdate(
      {name: req.body.name},
      {$inc: {age:1}},
      {new:true},
    ).lean().exec();

    if(!doc){
      return res.status(404).json({error: `No dog named ${req.body.name} exsits`});
    }
    return res.json({name: doc.name, breed: doc.breed, age: doc.age});
  } catch(err){
    console.log(err);
    return res.status(500).json({error: 'Something went wrong'});
  }
};


const notFound = (req, res) => {
  return res.status(404).sendFile(path.resolve(`${__dirname}../../views/404.html`));
};

module.exports = {
  index: hostIndex,
  page1: hostPage1,
  page2: hostPage2,
  page3: hostPage3, 
  page4: hostPage4,
  createDog,
  changeDogAge,
  getName,
  setName,
  notFound,
};

