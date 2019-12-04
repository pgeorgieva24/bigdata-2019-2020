var fs = require('fs');

var dir = './wallets';

var getCurrentUserWallet = function (walletId) {
    let rawdata = fs.readFileSync('wallets/' + walletId + '/wallet.json');
    return JSON.parse(rawdata);
};

// var getBitcoinWallets = function(){
//     fs.READ.readdirSync(testFolder).forEach(file => {
//     console.log(file);
//     });
// }

var saveWallet = function (walletObject) {

    var walletStringRepresentation = JSON.stringify(walletObject);
    fs.writeFileSync('_meta/_wallet', walletStringRepresentation);
};

var createWallets = function () {
    fs.mkdirSync(dir);
    var names = [
        'Plamena',
        'Stoyan',
        'Nikolai',
        'Yavor',
        'Vasil',
    ];
    var encryptedIds = [];
    for (const n of names) {
        encryptedIds.push(myUtil.encryptWith.sha256(n));
    }

    var wallet1 = {
        walletId: encryptedIds[0],
        currencies: {
            bitcoin: 50,
            litecoin: 50
        }
    };
    var wallet2 = {
        walletId: encryptedIds[1],
        currencies: {
            litecoin: 150
        }
    };
    var wallet3 = {
        walletId: encryptedIds[2],
        currencies: {
            ethereum: 250,
        }
    };
    var wallet4 = {
        walletId: encryptedIds[3],
        currencies: {
            ethereum: 10,
            litecoin: 300
        }
    };
    var wallet5 = {
        walletId: encryptedIds[4],
        currencies: {
            bitcoin: 170
        }
    };

    var wallets = [wallet1, wallet2, wallet3, wallet4, wallet5];

    for (var i = 0; i < 5; i++) {
        var encryptedWalletId = encryptedIds[i];
        var wallet = wallets[i];

        fs.mkdirSync(dir + '/' + encryptedWalletId);
        var walletPath = dir + '/' + encryptedWalletId + '/' + 'wallet.json'
        fs.writeFileSync(walletPath, JSON.stringify(wallet));
    }
}

module.exports = {
    getCurrentUserWallet: getCurrentUserWallet,
    saveWallet: saveWallet,
    createWallets: createWallets
}
