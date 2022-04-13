const auth = {
    isLoggedIn:false,
    onAuthentication(){
        this.isLoggedIn=true;
    },
    getLogInStatus(){
        return this.isLoggedIn;
    },
    saveToken(userToken) {
        console.log(userToken);
        localStorage.setItem('token', JSON.stringify(userToken));
    },
    getToken(){
        const tokenString = localStorage.getItem('token');
        const userToken = JSON.parse(tokenString);

        return userToken;
    }
}
export default auth;