
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
console.log("here");
const DealerNewSchema = new Schema({
	"user": {
			"type": mongoose.Schema.Types.ObjectId,
			"ref": "User"
		},
    "applicationNumber": {
            type: String
        },
    "d_name": {
        "type": String, 
        required: true, 
        max: 100
    },
    "d_contact_no":{"type":String},
    "d_dob":{"type":String},
    "d_doa":{"type":String},
    "d_head_address":{"type":String},
    "d_contact_person_name":{"type":String},
    "d_contact_person_no":{"type":String},
    "d_showroom_address":{"type":String},
    "d_country":{"type":String},
    "d_showroom_age":{"type":String},
    "d_monthy_sales":{"type":String},
    "d_monthly_profit":{"type":String},
    "d_car_inventory_count":{"type":String},
    "d_loan_approval_amount":{"type":String},
    "d_showroom_status":{"type":String},
    "d_showroom_total":{"type":String},
    "d_warehouse":{"type":String},
    "d_car_molels":{"type":String},
    "d_warrenty":{"type":String},
    "d_usd_bank":{"type":String},
    "d_employee_amout":{"type":String},
    "d_employee_salary":{"type":String},
    "d_other_business":{"type":String},
    "branchName":{"type":String},
    "branchCode":{"type":String},
    "documentStatus":{"type": String},
    "rmName":{"type": String},
    "status":{"type": String},
    "startDate":{"type": String},
    "endDate":{"type": String},
    "final":{"type": String},

},{timestamps:true});


const DealerNew = mongoose.model('DealerNew',DealerNewSchema);

// Export the model
module.exports = DealerNew;