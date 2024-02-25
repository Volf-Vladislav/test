const createRequest = (action:string, params:object,) => {
    const data = {
        action,
        params: {...params}
    }

    return  data
}

export default createRequest