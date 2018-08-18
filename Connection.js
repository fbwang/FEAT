module.exports = Connection;
var Client = require('node-rest-client').Client;
var searchArgs = {};
var hostaddress;
var issues;
var user ="fbwang";
var pwd = "qwerty$12345";


var hostaddr = 'http://ontrack-internal.amd.com'
var loginArgs = {
    data: {
        "username": user,
        "password": pwd
    },
    headers: {
        "Content-Type": "application/json"
    }
};

client = new Client();
function Connection(){
    this.searchArgs={};
}
Connection.prototype.search = function(){
    client.post(hostaddr+"/rest/auth/1/session", loginArgs,function (data, response) {
        if (response.statusCode === 200){
            session = data.session;
            this.searchArgs = {
                headers: {
                    cookie: session.name + '=' + session.value,
                    "Content-Type": "application/json"
                },
                data: {
                    jql: "project = FEAT AND Program = \"Bristol Ridge FM2+ [PRG-000244]\"",
                    startAt: 0,
                    maxResults: 50,
                    fields: [
                        "summary",
                        "status",
                        "assignee",
                        "customfield_16001"
                    ]
    
                }
            };
            client.post(hostaddr+"/rest/api/2/search", this.searchArgs, function (req,res) {
                // console.log(this.searchArgs);
                var Excel = require('exceljs');
                var workbook = new Excel.Workbook();
                var worksheet = workbook.addWorksheet('test');
                var issues = req.issues
                console.log(issues[1]);
                worksheet.columns = [
                    {header:'Key', key:'key'},
                    {header:'Summary', key:'summary'},
                    {header:'Status', key:'status'},
                    {header:'Percent', key: 'percent'}
                ];
                for (i = 0;i <issues.length;i++){
                    worksheet.addRow({key: issues[i].key, summary: issues[i].fields.summary, status: issues[i].fields.status.name, percent: issues[i].fields.customfield_16001});
                }
                workbook.xlsx.writeFile('TextTrackList.xlsx').then(function(){
     
                })
     
             });
            
    
    
            // console.log(searchArgs);
        }
        
        else{
            console.log(response.statusCode)
        }
        // console.log(this.searchArgs);
    });


}