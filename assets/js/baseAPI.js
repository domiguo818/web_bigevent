$.ajaxPrefilter((Option)=>{
    Option.url =`http://big-event-api-t.itheima.net`+ Option.url
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