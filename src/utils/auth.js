export function profileAuth(req, res, next) {
    if(req.session?.user){
        return next();
    }

    return res.status(401).send('No user detected');
}