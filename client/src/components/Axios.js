import axios from 'axios'
import Axios from "axios"
import fileDownload from 'js-file-download'

export async function getContent(path) {
    if (path !== "") {
        const response = await axios.get("/content", {
            params: {
                path: path
            }
        })
        const dat = response.data
        const newPath = path
        return { dat, newPath }
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

export async function deleteFiles(path){
    axios.delete("/delete",{params: {
        path: path
    }})
}

export async function makeDir(path){
    await axios.post("/createDir",null,{params: {
        path: path
    }})
}

