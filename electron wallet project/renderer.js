var wallets = require('./src/wallet');
var myBlockchain = require('./src/blockchain');
var myUtil = require('./util/util');

var fs = require('fs');

var currentWalletId = null;

if (!fs.existsSync('./wallets')) {
    wallets.createWallets();
}

//encryptedWalletId will come from login
currentWalletId = '7aa156d75967960cf972604ab752934651af6c537eef0035f3c58399e4f70b8d';

var currentWallet = wallets.getCurrentUserWallet(currentWalletId);

document.getElementById("wallet-id").innerHTML = currentWallet.walletId;

var stringBuilder = [];
var template = '';
for (let [key, value] of Object.entries(currentWallet.currencies)) {
    template = '<div>' + key + ' / ' + value + '</div>';
    stringBuilder.push(template);
}

document.getElementById('currencies').innerHTML = stringBuilder.join('');

var currencies = JSON.parse(fs.readFileSync('src/currencies.json'));

stringBuilder = [];
for (let c of currencies.currencies) {
    template = '<button id="' + c.toLowerCase() + '">' + c + '</button>';
    stringBuilder.push(template);
}

document.getElementById('currencies-menu').innerHTML = stringBuilder.join('');

//we have 3 separete lists prepared for each currency
var bitcoinWallets = [];
var litecoinWallets = [];
var ethereumWallets = [];

fs.readdirSync('./wallets').forEach(directory => {
    var wallet = JSON.parse(fs.readFileSync('./wallets/' + directory + '/wallet.json'));
    for (var key in wallet.currencies) {
        if (wallet.walletId == currentWalletId) {
            continue;
        }
        if (key == 'bitcoin') {
            bitcoinWallets.push(wallet.walletId);
        }
        else if (key == 'litecoin') {
            litecoinWallets.push(wallet.walletId);
        }
        else if (key == 'ethereum') {
            ethereumWallets.push(wallet.walletId);
        }
        else console.log("No such currency should exist: " + currency)
    }
});


var currencyBtns = document.querySelectorAll("#currencies-menu button");
for (var i = 0; i < currencyBtns.length; i++) {
    currencyBtns[i].addEventListener('click', function (event) {
        stringBuilder = [];
        var currencyName = this.id;
        switch (currencyName) {
            case 'bitcoin':
                for (let walletId of bitcoinWallets) {
                    template = '<button id="' + walletId + '" onclick="openSendingMoneyForm(this.id, \'' + currencyName + '\')">' + walletId + '</button>';
                    stringBuilder.push(template);
                }
                break;
            case 'litecoin':
                for (let walletId of litecoinWallets) {
                    template = '<button id="' + walletId + '" onclick="openSendingMoneyForm(this.id, \'' + currencyName + '\')">' + walletId + '</button>';
                    stringBuilder.push(template);
                }
                break;
            case 'ethereum':
                for (let walletId of ethereumWallets) {
                    template = '<button id="' + walletId + '" onclick="openSendingMoneyForm(this.id, \'' + currencyName + '\')">' + walletId + '</button>';
                    stringBuilder.push(template);
                }
                break;
            default:
                break;
        }
        document.getElementById('wallets-list').innerHTML = stringBuilder.join('');
    });
}

function openSendingMoneyForm(wallet_id, currencyName) {
    document.getElementById("send-money-form").style.display = "block";
    document.querySelector("#send-money-form h1").innerHTML = 'Send ' + currencyName + ' to wallet ' + wallet_id;
    document.getElementById("curerncy-name").value = currencyName;

}

function checkForm() {
    var form = document.getElementById("send-money-form");
    var sendingCurrency = form.curerncy.value;
    console.log(sendingCurrency);
    { console.log('no') }
    var currentAmount = currentWallet.currencies[sendingCurrency];
    if (currentAmount != null) {
        console.log(currentAmount);
        if (currentAmount < form.amount.value) {
            alert("Insufficien amount of " + sendingCurrency + "!");
            form.amount.focus();
            return false;
        }
        else return true;


    }
    else {
        alert("No currency of kind: " + sendingCurrency + " is found!");
        return false;
    }
}


function closeSendingMoneyForm() {
    document.getElementById("send-money-form").style.display = "none";
}
// var walletsListBtns = document.querySelectorAll('#wallets-list button');
// for (var i = 0; i < walletsListBtns.length; i++) {
//     walletsListBtns[i].addEventListener('click', function (event) {
//         console.log(this.id);

//     });

// }


// console.log(myUtil.generate.blockId());


// // get HTML element by ID identificator

// // get amount data
// document.getElementById("wallet-amount").innerHTML = currentWallet.amount;

// var uiWalletTransaction = document.getElementById("wallet-transaction-panel");

// // get active wallet collection 
// var walletCollection = myBlockchain.syncWalletCollection();

// var stringBuilder   = [];
// var template        = '';
// for(var i = 0; i < walletCollection.length; i++) {

//     var id      = walletCollection[i].id;
//     var amount  = walletCollection[i].amount;
//     template    = '<div>' + id + ' / ' + amount + '</div>';
//     stringBuilder.push(template);
// }

// uiWalletTransaction.innerHTML = stringBuilder.join('');