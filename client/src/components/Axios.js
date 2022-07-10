import axios from 'axios'
import Axios from "axios"
import fileDownload from 'js-file-download'

export async function getContent(path) {
    const response = await axios.get("/content", {
        params: {
          path: path
        }})
    return response.data
}

export async function downloadFile(link, title) {
    await Axios({
        url: link,
        method: "GET",
        responseType: "blob"
    }).then((res) => {
        console.log(res.data)
        fileDownload(res.data, title)
    })
}



