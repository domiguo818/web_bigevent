$.ajaxPrefilter((Option)=>{
    Option.url =`http://www.liulongbin.top:3007`+ Option.url
    if(Option.url.includes("/my/")){
        Option.headers = {
            Authorization:localStorage.getItem("token")
        }
    }
    Option.complete =(res) =>{
        if(
            res.responseJSON.status === 1&&
            res.responseJSON.message === "身份认证失败！"
        ){
            localStorage.removeItem("token");
            location.href ="/login.html"
        }
    }
})