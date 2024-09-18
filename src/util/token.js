export default function getToken(){
    const token = JSON.parse(localStorage.getItem('tokenUser'));
    return token
}