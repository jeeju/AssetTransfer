/* app.js
 * should listen and serve the site
 */
var http = require('http');
var express = require('express');
var app = express();
var url = require('url');
var fs = require('fs');
var path = require('path');
var Ibc = require ('ibm-blockchain-js');
var winston = require('winston');

var logger = new(winston.Logger)({
    transports: [
      new(winston.transports.Console)(),
      new(winston.transports.File)({filename: 'chaincode.log'})
    ]
 });
 var ibc = new Ibc(logger);
 var chaincode = {};

 // Read and process the credentials.json
 var credentialsFile;
 try{
   console.log(__dirname+'/../ServiceCredentials.json');
   credentialsFile = JSON.parse(fs.readFileSync(__dirname+'/../ServiceCredentials.json', 'utf8'));
 }catch(err){
   console.log("ServiceCredentials.json is missing, Please make it available");
   process.exit();
 }

 // Configure ibc-js sdk
logger.log('info', 'cofigureing ibc sdk with blockchain code!');
var options = {
  network:{
    peers: [{
      "api_host": credentialsFile.credentials.peers[0].api_host,
      "api_port": credentialsFile.credentials.peers[0].api_port,
      "api_port_tls": credentialsFile.credentials.peers[0].api_port_tls,
      "id": credentialsFile.credentials.peers[0].id
    }],
    usrers: [{
      "enrollId": credentialsFile.credentials.users[0].enrollId,
      "enrollSecret": credentialsFile.credentials.users[0].enrollSecret
    }],
    options:{
      quiet: true,
      timeout: 60000
    }
  },
  chaincode:{

    zip_url: 'https://github.ibm.com/competitive-analysis/cc126-blockchain/cc126-blockchain-master.zip',
    unzip_dir: 'blockchaincode/asset',
    git_url:'https://github.ibm.com/competitive-analysis/cc126-blockchain/bluemix/blockchaincode'
    /*zip_url: 'https://github.com/ibm-blockchain/marbles-chaincode/archive/master.zip',
    unzip_dir: 'marbles-chaincode-master/part2',
    git_url: 'https://github.com/ibm-blockchain/marbles-chaincode/part2'*/
  }
};
// web server code
//app.use(express.static('public'));
app.use(express.static(path.join(__dirname+'/../', 'public')));
app.get('/index.html', function (req, res) {
   res.sendFile(path.resolve(__dirname+"/../html/index.html"));
});

app.post('/deploy', function(req, res){
  ibc.load(options, cb_ready);
   //console.log("hello");
    //res.end( JSON.stringify('hello'));
  function cb_ready(err, cc){                             //response has chaincode functions
      // Step 4 ==================================
      if(cc.details.deployed_name === ""){                //decide if I need to deploy or not
        var deployTx=cc.deploy('init', [req.body.asset_hold], null, cb_deployed);
        // Print the deploy results
        deployTx.on('complete', function(results) {
            // Deploy request completed successfully
            testChaincodeID = results.chaincodeID;
            console.log("\nChaincode ID : " + testChaincodeID);
            console.log(util.format("\nSuccessfully deployed chaincode: response=%j", results));
            res.end( JSON.stringify(results));
        });

        deployTx.on('error', function(err) {
            // Deploy request failed
            console.log(util.format("\nFailed to deploy chaincode: error=%j", err));
            res.end( JSON.stringify(err));
        });
      }
      else{
        console.log('chaincode summary file indicates chaincode has been previously deployed');
        res.end('chaincode summary file indicates chaincode has been previously deployed');
      }
    }
});

app.post('/init_asset', function(req, res){
  var asset_id = req.body.asset_id;
  var price = req.body.price;
  var user_id = req.body.user_id;
  if(asset_id && price && user_id){
      chaincode.invoke.init_asset(asset_id, price, user_id);
  }
});

app.post('/set_user', function(req, res){
  var asset_id = req.body.asset_id;
  var user_id = req.body.user_id;
  if(asset_id && user_id){
    chaincode.invoke.set_user(asset_id, user_id);
  }
});

app.get('/query', function(req, res){
  var asset_id = req.query.asset_id;
  chaincode.query.read(asset_id);
});

app.post('/write', function(req, res){
  var asset_id = req.body.asset_id;
  var value = req.body.value;
  if(asset_id && value){
    chaincode.invoke.Write(asset_id, user_id);
  }
});
app.post('/remove', function(req, res){
  var asset_id = req.query.asset_id;
  chaincode.invoke.Delete(asset_id);
});

var server = app.listen(8081, function () {
   var host =server.address().address;
   var port =server.address().port;
   console.log("Example app listening at http://%s:%s", host, port)

});



/*
// Step 2 ==================================
ibc.load(options, cb_ready);

// Step 3 ==================================
function cb_ready(err, cc){                             //response has chaincode functions
    //app1.setup(ibc, cc);
    //app2.setup(ibc, cc);
    // Step 4 ==================================
    if(cc.details.deployed_name === ""){                //decide if I need to deploy or not
      cc.deploy('init', ['10'], null, cb_deployed);
    }
    else{
      console.log('chaincode summary file indicates chaincode has been previously deployed');
      cb_deployed();
    }
  }

// Step 5 ==================================
function cb_deployed(err){
  console.log('sdk has deployed code and waited');
  chaincode.query.read(['asset1']);
  //chaincode.invoke.init_asset('asset2', '100', 'maruthi');
  //chaincode.invoke.set_user('asset2', 'donthi');
}

ibc.chain_stats([stats_callback]);
function stats_callback(e, stats){
	console.log('got some stats', stats);
}
*/
