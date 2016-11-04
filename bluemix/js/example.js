console.log("Now starting SDKFunctiontest.js");

// Starting out by requiring all dependancies
var Ibc = require ('ibm-blockchain-js');
 var ibc = new Ibc();
// Then define new instances that will be needed

var chaincode = {};


// configure ibc-js sdk by defining options
var options = {
    network:{
      peers: [{
        "api_host": "864acfab0a734673a4f99844a8b02129-vp0.us.blockchain.ibm.com",
        "api_port": 444,
        "api_port_tls": 444,
        "id": "864acfab0a734673a4f99844a8b02129-vp0",
      }],
      usrers: [{
        "enrollId": "user_type1_0",
        "enrollSecret": "f8dc752d3c"
      }],
      options:{
        quiet: true,
        timeout: 60000
      }
    },
    chaincode:{
            zip_url: 'https://github.com/ibm-blockchain/marbles-chaincode/archive/master.zip',
            unzip_dir: 'marbles-chaincode-master/part2',
            git_url: 'https://github.com/ibm-blockchain/marbles-chaincode/part1'
        }
  };
// Load the Marbles2 chaincode, with defined options, and return call-back-when-ready function.
ibc.load(options, cb_ready);

// Define the call-back-when-ready function returned above
// call-back-when-ready function has err
function cb_ready(err, cc){
	//response has chaincode functions
  //app1.setup(ibc, cc);
  //app2.setup(ibc, cc);
	// if the deployed name is blank, then chaincode has not been deployed
	if(cc.details.deployed_name === ""){
        cc.deploy('init', ['99'], null, cb_deployed);
  	}
  	else{
  		console.log('chaincode summary file indicates chaincode has been previously deployed');
      cb_deployed();
	}
}
// Step 5 ==================================
    function cb_deployed(err){
        console.log('sdk has deployed code and waited');
        chaincode.query.read(['a']);
    }
