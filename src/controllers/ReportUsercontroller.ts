import { ReportUsers } from './../models/reportUsers.entity';

import moment from "moment";


class ReportUserController {
    constructor(){

    }
    async get(query: any){
        let match: any = null;

        if(query.select_date === 'custom' && query.initial_date !== "" && query.final_date !== ""){
            match  = {
                    "$match": {
                        "date": {
                            "$gte": new Date(query.initial_date),
                            "$lte": new Date(query.final_date)
                        }
                    }
                }
        }
        else if(query.select_date !== 'custom' && query.select_date !== 'all'){
            let dateFrom = moment().subtract(parseInt(query.select_date),'d').format('YYYY-MM-DD');
            match = {
                "$match": {
                    "date": {
                        "$gte": new Date(dateFrom)
                    }
                }
            };
        }
        
        let params: any = []
        if(match){
            params.push(match);
        }

        params.push(
            {
                "$group": {
                    "_id": "$date",
                    "sum": {
                        "$sum": {
                            "$toInt": "$value"
                        }
                    }
                }
            }
        )
        params.push(
            { 
                "$sort": { 
                    "sum": -1
                } 
            }
        )

        return await ReportUsers.aggregate(params);
        
    }
}


export default ReportUserController;