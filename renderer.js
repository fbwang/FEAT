// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
const electron = require('electron');
var Client = require('node-rest-client').Client;
var $ = require('jquery');

var drag = document.getElementById('Drag');
console.log(drag);
$('#btndownlod').click(function(e){
    console.log('btndownlod clicked');
    var Connection = require('./Connection');
    var conn = new Connection();
    conn.search();
    
});


drag.addEventListener('drop',function(e){
    e.preventDefault();
    e.stopPropagation();

    for(let f of e.dataTransfer.files){
        console.log(f.path);
    }
});

drag.addEventListener('dragover', function(e){
    e.preventDefault();
    e.stopPropagation();
});