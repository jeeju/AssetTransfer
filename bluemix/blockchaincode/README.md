## Intercting with BlockChain code from Bluemix DashBoard
The fastest way to test your chaincode is to use the REST interface on your peers. The Swagger UI on your Bluemix dashboard monitor allows you to experiment with deploying chaincode, without writing any additional code.

## Complete the following steps to use bluemix Swagger API on Bluemix
1. Create the Blockchain Application and Luanch it on Bluemix.
2. Implement secure enrollment. Calls to the /chaincode endpoint in the REST interface require a secure context ID. For most REST calls to be accepted, you must pass a registered enrollID from the service credentials list:
  
  a.Click + Network's Enroll IDs to expand the list of enrollID values and their secrets.
  
  b.Copy the set of credentials to a text file for later use.
  
  c.Expand the Registrar API section.
  
  d.Expand the POST /registrar section.
  
  e.Populate the Value field with JSON that specifies an enrollID and `enrollSecret' from your credentials:
    
  #### Sample Request
       
      
        {
           "enrollId": "user_type1_XXxXXXXXX",
            "enrollSecret": "XXXXXXXX"
        }
       
  #### Sample Successful Response

       {
          "OK": "string",
          "message": "string"
        }
        
## Deploying your ChainCode
  1. Expand the ChainCode API section and then Expand the POST /chaincode section
    
  2. Set the DeploySpec text field with sample code below ( pecifying your chaincode repository path, and the enrollID from the previous /registrar step. The "path": should look similar to: "https://github.com/johndoe/learn-chaincode/finished". This is the path to your repository fork, plus the path to your chaincode_finished.go file )
       
    #### Sample Request 
        {
          "jsonrpc": "2.0",
          "method": "deploy",
          "params": {
            "type": 1,
            "chaincodeID": {
            "path": "https://github.com/****/learn-chaincode/finished"
          },
          "ctorMsg": {
          "function": "init",
            "args": [
              "1"
            ]
          },
          "secureContext": "user_type1_0"
          },
          "id": 1
        }
        
    #### Successful Response
        {
          "jsonrpc": "2.0",
          "result": {
            "status": "OK",
            "message": "094dc99915eb875bf161fad855064892a581eb184a629c96057dd1aacf0ea70302b5c403c053cae8a9ddd34beb0581b16e459baa12733ef438f020ecad01e28d"
          },
          "id": 1
        }

  3. Initialize the asset values. Write following in the InvokeSpec text field, specifying the chaincode ID from the previous deployment step
    #### Sample Request
        {
          "jsonrpc": "2.0",
          "method": "invoke",
          "params": {
            "type": 1,
            "chaincodeID": {
              "name": "094dc99915eb875bf161fad855064892a581eb184a629c96057dd1aacf0ea70302b5c403c053cae8a9ddd34beb0581b16e459baa12733ef438f020ecad01e28d"
            },
            "ctorMsg": {
              "function": "init_asset",
              "args": [
                "asset1",
                "10",
                "donthi"
              ]
            },
            "secureContext": "user_type1_0"
          },
          "id": 0
        }

    #### Successful Response
        {
          "jsonrpc": "2.0",
          "result": {
            "status": "OK",
            "message": "aaf405ab-03ff-47f3-841b-a69dd7cb2cc1"
          },
          "id": 0
        }

  4.Query your chaincode for the value of the asset1 key, which you set with the Init function, Use follwing code in QuerySpec Text filed.
   #### Sample Request
        {
          "jsonrpc": "2.0",
          "method": "query",
          "params": {
            "type": 1,
            "chaincodeID": {
              "name": "094dc99915eb875bf161fad855064892a581eb184a629c96057dd1aacf0ea70302b5c403c053cae8a9ddd34beb0581b16e459baa12733ef438f020ecad01e28d"
            },
            "ctorMsg": {
              "function": "read",
              "args": [
                "asset1"
              ]
            },
            "secureContext": "user_type1_0"
          },
          "id": 0
        }
        
    This Sample calls read function with given Key and retires the asset associated with it.
    #### Successful Response
        {
          "jsonrpc": "2.0",
          "result": {
            "status": "OK",
            "message": "{\"assetId\": \"asset1\", \"price\": 10, \"userId\": \"donthi\"}"
          },
          "id": 0
        }
  5. Make asset transfer by setting up new user(owner) for particular asset, Which can done by invoking set_user function. Write the following code in INVOKESPEC text Field  
    #### Sample Request
        {
          "jsonrpc": "2.0",
          "method": "invoke",
          "params": {
            "type": 1,
            "chaincodeID": {
              "name": "094dc99915eb875bf161fad855064892a581eb184a629c96057dd1aacf0ea70302b5c403c053cae8a9ddd34beb0581b16e459baa12733ef438f020ecad01e28d"
            },
            "ctorMsg": {
              "function": "set_user",
              "args": [
                "asset1",
                "maruthi"
              ]
            },
            "secureContext": "user_type1_0"
          },
          "id": 0
        }

    #### Successful Response
        {
          "jsonrpc": "2.0",
          "result": {
            "status": "OK",
            "message": "a9e837e3-f0ba-4239-be9b-4aea0671f561"
          },
          "id": 0
        }      
  6. Verify the new user(owner) for given asset by quering. Write the following code in Query Spec text field.
   #### Sample Request
        {
          "jsonrpc": "2.0",
          "method": "query",
          "params": {
            "type": 1,
            "chaincodeID": {
              "name": "094dc99915eb875bf161fad855064892a581eb184a629c96057dd1aacf0ea70302b5c403c053cae8a9ddd34beb0581b16e459baa12733ef438f020ecad01e28d"
            },
            "ctorMsg": {
              "function": "read",
              "args": [
                "asset1"
              ]
            },
            "secureContext": "user_type1_0"
          },
          "id": 0
        }
        
    This Sample calls read function with given Key and retires the asset associated with it.
    #### Successful Response
        {
          "jsonrpc": "2.0",
          "result": {
            "status": "OK",
            "message": "{\"assetId\": \"asset1\", \"price\": 10, \"userId\": \"maruthi\"}"
          },
          "id": 0
        }
 We can see the owner(User) for a given assetID has changed, And asset Transfer has completed. All Invoke Function can be saved into hyperledger. Similarly We can do the same for delete and write asset functions.

