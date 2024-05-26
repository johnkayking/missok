const asyncwrapper = (f) => {

    return async (req,res,next) => {
        try {
            await f(req,res,next)

        } catch (error) {
            console.log(error)
            next(error)


        }
    }
}


module.exports = asyncwrapper