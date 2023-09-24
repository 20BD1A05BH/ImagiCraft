const exp=require('express');
const expressAsyncHandler=require('express-async-handler');
const mClient=require('mongodb').MongoClient;
const app=exp();
const path=require('path');
const pApp=require('./APIs/postRoute');
const oApp=require('./APIs/openRoute');
const dotenv=require('dotenv').config();


app.use(exp.json({limit:'500mb'}));




const dburl=process.env.DB_URL;

mClient.connect(dburl)
.then((client)=>{

    const mini=client.db('mini');

    const pColl=mini.collection('pColl');

    app.set('pColl',pColl);
    console.log("database has started successfully");
},(err)=>{
    console.log("error has occured"+err);
})



app.use('/oapp',oApp);
app.use('/papp',pApp);

app.use(exp.static(path.join(__dirname,'../client/build')));

app.use('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'../client/build/index.html'));
})

app.use((req,res,next)=>{
    res.send({message:"invalid path"});
})

app.use((err,req,res,next)=>{
    res.send("synchronised error "+err.message);
})

app.listen(4000,()=>{
    console.log("server started successfully");
})