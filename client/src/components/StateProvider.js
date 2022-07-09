import React, { useState,useEffect, useMemo } from 'react'
import {getContent} from './Axios'

function StateProvider({context, children}) {
    const StateContext = context
    const [archivos, setArchivos] = useState([])
    const [refrescar, setRefrescar] = useState(0)
    const [progress, setProgress] = useState(0)
    const [finish, setFinish] = useState(false)
    useEffect(async () => {
        /*axios.get("/content").then(response => {
            const { data } = response
            setArchivos(data)
        })*/
        const data = await getContent()
        setArchivos(data)
    }, [refrescar])

    const contextValue = useMemo(() => ({ archivos, setRefrescar, progress, setProgress, finish, setFinish}), [
        archivos,
        refrescar,
        progress, 
        finish
      ]);

    return (
        <StateContext.Provider value={contextValue}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider