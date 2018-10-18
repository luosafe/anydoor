const http = require('http');
const conf = require('./Defaultconfig.js');
const chalk =require('chalk');
const path =require('path');
const route =require('./route.js');

const server = http.createServer((req,res) =>{
  const filepath = path.join(conf.root,req.url);
  route(req,res,filepath);
   
});

server.listen(conf.port,conf.hostname,() =>{
const addr = `http://${conf.hostname}:${conf.port}`;
console.info(`server start at ${chalk.green(addr)}`);
});