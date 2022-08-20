import axios from 'axios'
import Axios from "axios"
import fileDownload from 'js-file-download'

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
        let dat = []
        const newPath = path
        const status = response.status
        if(status!==401){
            dat = response.data
        }
        return { dat, newPath}
    } else {
        const newPath = path + "/uploads"
        const arr = []
        return { arr, newPath }
    }
}

export async function downloadFile(title, path, directory, token) {
    await Axios({
        url: "/download",
        method: "GET",
        responseType: "blob",
        headers: {"Authorization" : `Bearer ${token}`},
        params: {
            title: title,
            path: path,
            directory: directory
        }
    }).then((res) => {
        console.log(res.data)
        if (directory) {
            fileDownload(res.data, title + ".zip")
        } else {
            fileDownload(res.data, title)
        }
    })
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


