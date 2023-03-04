export const signUp =  (req, res) => {
    res.render('signup.handlebars')
}

export const login = (req, res) => {
    res.render('login.handlebars');
}

export const logout = (req, res) => {
    req.session.destroy(err => {
        if(err){
            return res.json({status: 'Logout Error'})
        }
    })

    res.render('logout.handlebars');
}