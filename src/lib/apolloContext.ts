export const httpContext = async (req: any) => {
    console.log({ token: req.headers.authorization })
    return { token: req.headers.authorization }
}

export const wsContext = async (ctx: any, msg: any, args: any) => {
    console.log({ ctx: ctx, msg: msg, args: args })
    // return { token: req.headers.authorization }
    return
}

