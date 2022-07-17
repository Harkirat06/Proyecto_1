import React, { useState, useEffect, useMemo } from 'react'
import { getContent } from './Axios'

function StateProvider({ context, children }) {
    const StateContext = context
    const [archivos, setArchivos] = useState([])
    const [refrescar, setRefrescar] = useState(0)
    const [progress, setProgress] = useState(0)
    const [finish, setFinish] = useState(false)
    const [doc, setDoc] = useState(null)
    const [error, setError] = useState(false)
    const [path, setPath] = useState("/uploads")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [register,setRegister] = useState(false)
    useEffect(async () => {
        const {dat, newPath} = await getContent(path)
        setArchivos(dat)
        setPath(newPath)
    }, [refrescar, path])

    const contextValue = useMemo(() => ({
        archivos, setRefrescar, progress, setProgress,
        finish, setFinish, error, setError, doc, setDoc,
        path, setPath,refrescar,register,setRegister
    }), [
        archivos,
        refrescar,
        progress,
        finish,
        error,
        doc,
        path,
        register
    ]);

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider