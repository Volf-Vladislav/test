import md5 from 'md5'
import rootURL from "./rootURL"

const postRequest = async (data: object) => {
    try {
        console.log(data)
        const password = "Valantis"
        const dateNow = new Date().toISOString().slice(0, 10).replace(/-/g, '')
        const token = md5(password + "_" + dateNow)

        return fetch(rootURL,
            {
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-Auth': token
                },
                method: "POST",
                body: JSON.stringify(data)
            })
            .then(responce => responce.json())
    }
    catch (error) {
        console.error(error)
        throw error
    }
}

export default postRequest
