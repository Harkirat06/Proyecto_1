import React, { useState, useMemo} from 'react'

function StateProvider({ context, children }) {
    const StateContext = context
    const [archivos, setArchivos] = useState([])
    const [refrescar, setRefrescar] = useState(0)
    const [progress, setProgress] = useState(0)
    const [finish, setFinish] = useState(false)
    const [doc, setDoc] = useState(null)
    const [error, setError] = useState(false)
    const [path, setPath] = useState("/uploads")
    const [username, setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [login,setLogin] = useState(true)
    const [token, setToken] = useState(localStorage.getItem("token"))
    const [showUpload, setShowUpload] = useState(false)
    const [showDownload, setShowDownload] = useState(false)
    const [download, setDownload] = useState([])
    const [upload, setUpload] = useState([])
    
   
   

    const contextValue = useMemo(() => ({
        archivos, setRefrescar, progress, setProgress,
        finish, setFinish, error, setError, doc, setDoc,
        path, setPath,refrescar,login,setLogin,
        username, setUsername,password,setPassword,
        email,setEmail, setArchivos, token, setToken,
        showUpload, setShowUpload, download, setDownload,
        showDownload, setShowDownload,upload, setUpload
    }), [
        archivos,
        refrescar,
        progress,
        finish,
        error,
        doc,
        path,
        login,
        username,
        password,
        email,
        token,
        showUpload,
        download,
        showDownload, 
        upload
    ]);

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider