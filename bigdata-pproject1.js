use bank_db;


var department = {
    insert: function (document) {
        var dep_name_exists = check_if_exists(document.dep_name);

        if (!dep_name_exists.exists) {
            print(dep_name_exists.error + "dep_name");
            return;
        }
        db.department.insert(document);
    }
}


function check_if_unique(collection, field_name, field_value) {
    if (db.getCollection(collection).find({ [field_name]: field_value }).count() > 0) {
        return { unique: false, error: "Property with that value already exists: " };
    }
    else return { unique: true };
}

// function check_if_id_in_collection(collection, id_value) {
//     if (db.getCollection(collection).find({ _id: id_value }).count() == 0) {
//         return { exists: false, error: "No such id exists: " };
//     }
//     else return { exists: true };
// }

function check_if_exists(property) {
    if (!property || property == "") {
        return { exists: false, error: "Property is required: " };
    }
    return { exists: true };
}

var employee = {
    insert: function (document) {
        var first_name_exists = check_if_exists(document.first_name);
        var last_name_exists = check_if_exists(document.last_name);
        var address_exists = check_if_exists(document.address);
        var phone_number_exists = check_if_exists(document.phone_number);
        var email_exists = check_if_exists(document.email);
        var job_position_exists = check_if_exists(document.job_position);
        var department_exists = check_if_exists(document.department_id);
        // var department_id_exists = check_if_unique("department", document.department_id);
        // var manager_id_exists = check_if_exists(document.manager_id);
        // var manager_id_is_in_collection = check_if_unique("employee", document.manager_id);

        if (!first_name_exists.exists) {
            print(first_name_exists.error + "first_name");
            return;
        }
        if (!last_name_exists.exists) {
            print(last_name_exists.error + "last_name");
            return;
        }
        if (!address_exists.exists) {
            print(address_exists.error + "address");
            return;
        }
        if (!phone_number_exists.exists) {
            print(phone_number_exists.error + "phone_number");
            return;
        }
        if (!email_exists.exists) {
            print(email_exists.error + "email");
            return;
        }
        if (!job_position_exists.exists) {
            print(job_position_exists.error + "job_position");
            return;
        }
        if (!department_exists.exists) {
            print(department_exists.error + "department_id");
            return;
        }
        // if (!department_id_exists.exists) {
        //     print(department_id_exists.error + "department_id")
        //     return;
        // }
        // if (manager_id_exists.exists) {
        //     if (!manager_id_is_in_collection.exists) {
        //         print(manager_id_is_in_collection.error + "manager_id");
        //         return;
        //     }
        // }

        db.employee.insert(document);
    }
}

var client = {
    insert: function (document) {
        var first_name_exists = check_if_exists(document.first_name);
        var last_name_exists = check_if_exists(document.last_name);
        var address_exists = check_if_exists(document.address);
        var phone_number_exists = check_if_exists(document.phone_number);
        var email_exists = check_if_exists(document.email);
        var bank_account_exist = check_if_exists(document.bank_accounts);

        if (!first_name_exists.exists) {
            print(first_name_exists.error + "first_name");
            return;
        }
        if (!last_name_exists.exists) {
            print(last_name_exists.error + "last_name");
            return;
        }
        if (!address_exists.exists) {
            print(address_exists.error + "address");
            return;
        }
        if (!phone_number_exists.exists) {
            print(phone_number_exists.error + "phone_number");
            return;
        }
        if (!email_exists.exists) {
            print(email_exists.error + "email");
            return;
        }
        if (!bank_account_exist.exists) {
            print(bank_account_exist.error + "bank_accounts");
            return;
        }

        var problem_with_bank_account = false;
        document.bank_accounts.forEach(function (element) {
            print(element.name);
            if (db.client.find({ "bank_accounts.name": element.name }).count() > 0) {
                print("not unique bank account");
                problem_with_bank_account = true;
                return;
            }
            if (!(/(^[A-Za-z]+|^[0-9]+)$/.test(element.name))) {
                print("bank account name should contain letters or numbers");
                problem_with_bank_account = true;
                return;
            }
            element['currency'] = "BGN";
            if (!check_if_exists(element.currency)) {
            }
        });
        if (problem_with_bank_account) {
            return;
        }
        db.client.insert(document);
    }
}


department.insert({ _id: 1, dep_name: "IT" })
department.insert({ _id: 2, dep_name: "HR" })
department.insert({ _id: 3, dep_name: "Analitics" })
department.insert({ _id: 4, dep_name: "Customer support" })

employee.insert({ _id: 1, first_name: "Skyler", last_name: "Wagner", address: "9208 Grove Road London WC27 0QL", phone_number: "1515151515", email: "tarreau@icloud.com", job_position: "System Analyst", department_id: "3" })
employee.insert({ _id: 2, first_name: "German", last_name: "Reeves", address: "87 Windsor Road London SE40 1XZ", phone_number: "4825548215", email: "mcnihil@sbcglobal.net", job_position: "HR", department_id: "2" })
employee.insert({ _id: 3, first_name: "Greyson", last_name: "Green", address: "82 King Street London NW65 0RF", phone_number: "654665465", email: "msusa@yahoo.ca", job_position: "Computer Support Specialist", department_id: "1" })
employee.insert({ _id: 4, first_name: "Kane", last_name: "Chapman", address: "99 South Street London NW32 1CD", phone_number: "84848484", email: "kosact@outlook.com", job_position: "System Analyst", department_id: "4" })

client.insert({ "_id": "1", first_name: "Kane", last_name: "Green", address: "99 South Street London NW32 1CD", phone_number: "4468547141", email: "kosact@outlook.com", bank_accounts: [{ name: "one", balance: 65648 }, { name: "onebyobe", balance: 666, currency="RSD" }] })
client.insert({ "_id": "2", first_name: "Lorenzo", last_name: "Chapman", address: "90 West Street London NW34 8GU", phone_number: "2988877862", email: "mastinfo@me.com", bank_accounts: [{ name: "two", balance: 636 }] })
client.insert({ "_id": "3", first_name: "Maxim", last_name: "Larsen", address: "822 Park Road London E18 6LO", phone_number: "4359571472", email: "spadkins@att.net", bank_accounts: [{ name: "three", balance: 6658 }] })
client.insert({ "_id": "4", first_name: "Alonzo", last_name: "Thornton", address: "9857 North Street London SW35 2ZW", phone_number: "2298232334", email: "studyabr@comcast.net", bank_accounts: [{ name: "four", balance: 60, currency: "GBP" }] })


db.employee.aggregate([
    { $match: { _id: 1 } },{ $addFields: { "salary": 2564 } }])

find({ _id: 2 }).

db.client.find({ "bank_accounts.name": "aaa" })

client.insert({
    first_name: "edno", last_name: "edno", address: "edno", phone_number: "edno", email: "edno",

    bank_accounts: [{ name: "one", balance: 65648 }]     
bank_accounts: [{ name: "two", balance: 636 }]     
bank_accounts: [{ name: "three", balance: 6658 }]     
bank_accounts: [{ name: "four", balance: 60, currency: "GBP" }]     