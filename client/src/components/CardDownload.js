import React, { useContext, useEffect, useState } from 'react'
import { ProgressBar, Button, Modal, Card } from 'react-bootstrap'
import "bootstrap/dist/css/bootstrap.min.css"

export default function ({titulo,progres,context}) {
    const {progreso, setProgreso} = useContext(context)
    useEffect(()=>{setProgreso(progres)},[progres])
    return (
        <div>
            <Card>
                <Card.Body>
                    <Card.Title>{titulo}</Card.Title>
                    <ProgressBar animated now={progreso} label={`${progreso}%`} />
                </Card.Body>
            </Card>
        </div>
    )
}
