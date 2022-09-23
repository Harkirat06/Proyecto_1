import axios from 'axios'

export async function getContent(path, token) {
    if (path !== "") {
        const response = await axios.get("/content", {
            params: {
                path: path
            },
            headers: {"Authorization" : `Bearer ${token}`}
        }).catch((e) => {
            const { response } = e
            return response
        })
        console.log(response)
        if(response.data.error === "Token Expired"){
            let dat = response.data.error
            const newPath = path
            return {dat, newPath}   
        }else{
        let dat = []
        dat = response.data.data
        const newPath = path
        return {dat, newPath}
        }
    } else {
        const newPath = path + "/uploads"
        const dat = []
        return { dat, newPath}
    }
}

export async function deleteFiles(path, token) {
    return axios.delete("/delete", {
        headers: {"Authorization" : `Bearer ${token}`},
        params: {
            path: path
        }
    })
}

export async function makeDir(path, token) {
    await axios.post("/createDir", null, {
        headers: {"Authorization" : `Bearer ${token}`},
        params: {
            path: path
        }
    })
}

export async function registerUser(user) {
    const res = await axios.post("/users", user).catch((e) => {
        const { response } = e
        return response
    })
    return res
}

export async function loginUser(user) {
    const res = await axios.post("/login", user).catch((e) => {
        const { response } = e
        return response
    })
    return res
}



