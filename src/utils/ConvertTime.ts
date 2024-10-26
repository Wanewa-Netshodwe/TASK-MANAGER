import moment from 'moment'
export const convertTime = (date_string:string)=>{
    return moment(date_string).format('llll')
}

