const useAuth = () => {
    const token = window.localStorage.getItem("jwt_token");
    return token ? token : false ;
};

export { useAuth }