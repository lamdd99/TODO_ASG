'use strict';
var getRawBody = require('raw-body');
var list = [];
exports.handler = (req, resp, context) => {
    console.log('hello world');
let path = req.path.slice(1);
let para2 = "";
if(path.indexOf("/")>0){
    para2 = path.slice(path.indexOf("/")+1);
    path = path.substring(0, path.indexOf("/"));
}
///5. All endpoints should be applied with suitable request method (GET, POST,
///PUT, DELETE) [Note: you may require updating the serverless configuration
//file (5 marks)
///switch case by method "POST" for add_item,"GET" for list_all,"PUT" for change list[] one or all as delete
 switch(req.method){
            case "POST":
            ///1. An endpoint that can add an item to the list which is not allowed to duplicate
            ///and case sensitive. (5 marks)              
                getRawBody(req, (err, body) => {
                    let idx = list.indexOf(body.toString());
                    if(idx <0){
                    list.push(body.toString());
                     resp.send(JSON.stringify({'code': 200, 'Status':'add item','item': body.toString()})); 
                    }else 
                    resp.send(JSON.stringify({'code': 200, 'Status':'this item is add or not support'}));
                    
                })
            break;

            case "GET":
            ///2. An endpoint that can list all item from the todo list. (5 marks)
            resp.send(JSON.stringify({'code': 200,'Status':'list all item','list':JSON.stringify(list)}));
            break;

            case "PUT":
            ///3. An endpoint that can remove one of the items in the list. (5 marks)
            if(path=="delete_one"){
            if(parseInt(para2)){if(parseInt(para2)<list.length){list.splice(parseInt(para2),1);
            resp.send(JSON.stringify({'code': 200,'Status':'delete one item'}))}}
            else  resp.send( JSON.stringify({'code': 200, 'Status':'delete all item'}));}

            ///4. An endpoint that can remove all items in the lists. (5 marks)
            else if(path=="delete_all"){
            list=[];}
            else  resp.send( JSON.stringify({'code': 400, 'Status': 'Bad Request'}));
            break;



 default:
 resp.send( JSON.stringify({'code': 400, 'Status': 'Bad Request'}));
 }

}