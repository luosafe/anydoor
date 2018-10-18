const fs   =require('fs');
const promisify =require('util').promisify;
const stat = promisify(fs.stat);
const readdir =promisify(fs.readdir);


module.exports=async function(req,res,filepath){
 try {
    const stats =await stat(filepath);
     if(stats.isFile()){
     res.statusCode =200;
     res.setHeader('Content-Type','text/plain');
     fs.createReadStream(filepath).pipe(res);
    }
    else if(stats.isDirectory()) {
     fs.readdir(filepath,(err,files) =>{
      res.statusCode =200;
      res.setHeader('Content-Type','text/plain');
      res.end(files.join(','));
     });
   }
}

  catch(ex){
     res.statusCode =404;
     res.setHeader('Content-Type','text/plain');
     res.end(`${filepath} is not a directory or file`);
   }

}