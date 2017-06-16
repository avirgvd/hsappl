/**
 * Created by govind on 10/2/16.
 */

var child_process = require('child_process');

exports.triggerFileDigest=triggerFileDigest;

function triggerFileDigest () {
  
  var java_home = "/home/govind/HomeServer/jdk1.8.0_101";

  var fileDigesterPath = "/home/govind/HomeServer/SOURCES/HSFileDigester/out/artifacts/HSFileDigester_jar";


  // For JAVA use child_process,exec
  var execCmdln = 'java -jar ' + fileDigesterPath + '/HSFileDigester.jar';
  child_process.exec(execCmdln,
    function(error, stdout, stderr) {
      if (error) {
        console.log("triggerFileDigest: ERR error.cmd: error.message ", error.cmd, error.message);
      } else {
        console.log("triggerFileDigest: cmd: stdout", stdout);
        // This must be graceful termination so no need to update the ElasticSearch
        // but need to update _appliances with latest state
      }
    });

}