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
        const dat = response.data
        const newPath = path
        const status = response.status
        return { dat, newPath, status}
    } else {
        const newPath = path + "/uploads"
        const arr = []
        return { arr, newPath }
    }
}

export async function downloadFile(title, path, directory) {
    await Axios({
        url: "/download",
        method: "GET",
        responseType: "blob",
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

export async function deleteFiles(path) {
    return axios.delete("/delete", {
        params: {
            path: path
        }
    })
}

export async function makeDir(path) {
    await axios.post("/createDir", null, {
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


