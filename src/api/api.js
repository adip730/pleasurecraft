import axios from 'axios';


const endpoint = process.env.REACT_APP_STRAPIURL;
const auth = process.env.REACT_APP_STRAPIAUTH;
export const getProjects = () => {
    let url = `http://${endpoint}/api/projects?populate=*`
    console.log(url);
    return axios.get(url, {
        headers: {
            'Authorization': `${auth}`,
        }
    });
       
};

export const getMedia = () => {
    let url = `http://${endpoint}/api/upload/files`
    return axios.get(url, {
        headers: {
            'Authorization': `${auth}`,
        }
    })
}

export const getConfig = () => {
    let url = `http://${endpoint}/api/config`
    return axios.get(url, {
        headers: {
            'Authorization': `${auth}`,
        }
    })
}
// export const getFolders = () => {
//     return axios.get('http://localhost:1337/api/upload/folders', {
//         headers: {
//             'Authorization': '6f330576281e3029f275a2315d91d11a9abf80bc810a4d7aca48034e72e9176df373a4aabb0e4fc0629f637f24374e95984505aada2ee05cae34c9516d609e4bd03ab67090f791303f5e2ae9849abdda0c0be52b1898d64290c771efb0d9616589f0927e9d4f1fc3624323eb86739b4b13c091036563364195410e953ebe551f',
//         }
//     })
// }
