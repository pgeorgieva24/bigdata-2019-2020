// use stu1601321001

function check_if_exists(property) {
    if (!property || property == "") {
        return { exists: false, error: "Property is required: " };
    }
    return { exists: true };
}


var vehicle = {
    insert: function (document) {
        var model_exists = check_if_exists(document.model);
        var wh_id_exists = check_if_exists(document.wh_id);

        if (!model_exists.exists) {
            print(model_exists.error + "model");
            return;
        }
        if (!wh_id_exists.exists) {
            print(wh_id_exists.error + "wh_id (warehouse id)");
            return;
        }
        if (db.vehicle.find({ wh_id: document.wh_id }).count() > 0) {
            print("wh_id already exists (warehouse id)");
            return;
        }

        // if(Object.keys(document).length  >2  ){
        //     print("only field *model* and *wh_id* are allowed ");
        //     return;
        // }

        db.vehicle.insert(document);
    }
}


vehicle.insert({ model: "BMW", wh_id: 7458884 })
vehicle.insert({ model: "VW", wh_id: 12 })
vehicle.insert({ model: "Peguot", wh_id: 566 })
vehicle.insert({ model: "Ope;", wh_id: 359 })
vehicle.insert({ model: "KIA", wh_id: 876 })


db.vehicle.updateMany({}, { $set: { "minimal_seating_space": 2 } })


var cargo = {
    insert: function (document) {
        var name_exist = check_if_exists(document.name);
        var category_exist = check_if_exists(document.category);
        var weight_exist = check_if_exists(document.weight);
        var vehicle_wh_id_exist = check_if_exists(document.vehicle_wh_id);

        if (!name_exist.exists) {
            print(name_exist.error + "name");
            return;
        }
        if (!category_exist.exists) {
            print(category_exist.error + "category");
            return;
        }
        if (!weight_exist.exists) {
            print(weight_exist.error + "weight");
            return;
        }
        if (!vehicle_wh_id_exist.exists) {
            print(vehicle_wh_id_exist.error + "vehicle_wh_id");
            return;
        }
        if (db.vehicle.find({ wh_id: document.vehicle_wh_id }).count() == 0) {
            print("vehicle_wh_id does not exist (warehouse id)");
            return;
        }

        db.cargo.insert(document);
        
        if (["fruits", "vegetables", "meat", "milk", "dairy"].includes(document.category)) {
            db.priorityCargo.insert(doc);

        }

    }
}


cargo.insert({ name: "krastavici", category: "vegetables", weight: 200, vehicle_wh_id: 12 })
cargo.insert({ name: "krastavici", category: "vegetables", weight: 200, vehicle_wh_id: 7458884 })
cargo.insert({ name: "domati", category: "fruits", weight: 200, vehicle_wh_id: 566 })
cargo.insert({ name: "kitkat", category: "chokolate", weight: 200, vehicle_wh_id: 876 })
cargo.insert({ name: "steak", category: "meat", weight: 200, vehicle_wh_id: 7458884 })


db.vehicle.aggregate([
    {
        $lookup:
        {
            from: "cargo",
            localField: "wh_id",
            foreignField: "vehicle_wh_id",
            as: "cargos shipped"
        }
    }
])



var priority_items = ["fruits", "vegetables", "meat", "milk", "dairy"]


db.cargo.find({ category: { $in: ["fruits", "vegetables", "meat", "milk", "dairy"] } }).forEach(function (doc) {
    db.priorityCargo.insert(doc);
});