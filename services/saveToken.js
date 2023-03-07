function SaveToken(token){
    document.cookie = `token=${token}; path=/`;
}