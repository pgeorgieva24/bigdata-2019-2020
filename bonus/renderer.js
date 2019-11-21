// =====================================================================================
var wallet={email:'', pass:''}
const button = document.getElementById('myButton');


var emailPass = '';

function onClick(){
    emailPass+= document.getElementById('email').value;
    emailPass+= document.getElementById('password').value;
    var fs = require('fs');
    var dir = './my-wallet';
    
    if (!fs.existsSync(dir)){
        fs.mkdirSync(dir);
    }
    
    const crypto = require('crypto')
    
    var hash = crypto.createHash('sha256').update(emailPass).digest('hex')
    console.log(emailPass)
    console.log(hash)
    var wallet = {walletId : hash};

    if(!fs.existsSync('my-wallet/wallet.json')) {
        fs.writeFileSync('my-wallet/wallet.json', JSON.stringify(wallet) );
        console.log('The file does not exist.');
    } else {
        console.log("The file exists.");
    }
    
    return false;
  }

  //za da proveri dali heshe e sushtiq
  //get input from some view 
  //var inputHash = document.getElementById('hashId').value;
//   var content;
//   fs.readFile('my-wallet/wallet.json', function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     content = JSON.parse(data);
//     });

//     if(content.walletId == inputHash){
//         console.log("Congrats");
//     }
//     else{
//         console.log("nay, wrong hash")
//     }

