const isAuth = (req,res,next) => {
    console.log("isAuth");
    
    if(req.isAuthenticated()){
        return next();
    }else{
        res.redirect('/login')
    }

}

module.exports = isAuth;