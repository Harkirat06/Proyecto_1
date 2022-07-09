import axios from 'axios'
import { useContext } from 'react'

export async function getContent() {
    const response = await axios.get("/content")
    return response.data
}
export function PostFiles(data, context) {
    const {setProgress} = useContext(context)
    const {setRefrescar} = useContext(context)
    const {setFinish} = useContext(context)
    axios.post("/uploadFile", data, {
        onUploadProgress: data => {
        setProgress(Math.round((100 * data.loaded) / data.total))
        }
    }).then(() => {
        setFinish(true)
        setRefrescar(prev => prev + 1)
        setTimeout(() => { setProgress(0) }, 5000)
    })
}


