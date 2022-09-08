import React, { useState, useMemo} from 'react'

function StateProvider({ context, children }) {
    const StateContext = context
    const [archivos, setArchivos] = useState([])
    const [refrescar, setRefrescar] = useState(0)
    const [progress, setProgress] = useState(0)
    const [finish, setFinish] = useState(false)
    const [doc, setDoc] = useState([])
    const [error, setError] = useState(false)
    const [path, setPath] = useState("/uploads")
    const [login,setLogin] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [showUpload, setShowUpload] = useState(false)
    const [showDownload, setShowDownload] = useState(false)
    const [showVideo, setShowVideo] = useState(false)
    const [download, setDownload] = useState([])
    const [upload, setUpload] = useState([])
    const [titulo, setTitulo] = useState("")
    
   
   

    const contextValue = useMemo(() => ({
        archivos, setRefrescar, progress, setProgress,
        finish, setFinish, error, setError, doc, setDoc,
        path, setPath,refrescar,login,setLogin,
        setArchivos, token, setToken,
        showUpload, setShowUpload, download, setDownload,
        showDownload, setShowDownload,upload, setUpload,
        showVideo, setShowVideo, titulo, setTitulo
    }), [
        archivos,
        refrescar,
        progress,
        finish,
        error,
        doc,
        path,
        login,
        token,
        showUpload,
        download,
        showDownload, 
        upload,
        showVideo,
        titulo
    ]);

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider