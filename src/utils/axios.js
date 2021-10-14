import axios from 'axios'
const instance = axios.create({
    baseURL:'https://alonepluto.info/api/cloud/v1',
    headers:{
        'SecretKey': 'GR4VDO3930EZA2',
        'Authorization': ' '
    },
    timeout:'3000'
})
export default instance