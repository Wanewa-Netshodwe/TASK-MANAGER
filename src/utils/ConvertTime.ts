import moment from 'moment'
export const convertTime = (date_string:string)=>{
    return moment(date_string).format('llll')
}
export const convertT =(dateStr)=>{

    const formattedDate = moment(dateStr).format('YYYY-MM-DD HH:mm:ss');
    return formattedDate
}

