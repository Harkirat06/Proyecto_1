const streamingRouter = require("express").Router()
const fs = require('fs')
const tokenExtractor = require("../middlewares/tokenExtractor")

streamingRouter.get("/:id", (req, res, next) => {
    const path = "./uploads/" + req.params.id
    const fileSize = fs.statSync(path).size
    const range = req.headers.range
    const CHUNK_SIZE = 10 ** 6
    if (range) {
        const start = Number(range.replace(/\D/g, ""))
        const end = Math.min(start + CHUNK_SIZE, fileSize - 1)
        const contentLength = end - start + 1
        const head ={
            "Content-Range": `bytes ${start}-${end}/${fileSize}`,
            "Accept-Ranges": "bytes",
            "Content-Length": contentLength,
            "Content-Type": "video/mp4",
        }
        
        if(end>=0){
            res.writeHead(206, head)
            const file = fs.createReadStream(path, { start, end })
            file.pipe(res)
        }else{
            res.sendStatus(206)
        }
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
}
)

module.exports = streamingRouter