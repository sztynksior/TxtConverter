import * as fs from 'fs'
import * as pth from 'path'
import * as pc from './utils/path-convert'

const args: string[] = process.argv
const numArgs: number = args.length

if (numArgs != 3) {
    console.log("arguments: [directory name]")
    process.exit()
}

const path: string = args[2]

fs.readdir(path, readAllFilesInDirecotry(path))

function readAllFilesInDirecotry (path: string): (err: NodeJS.ErrnoException | null, files: string[]) => void {
    return (err, files) => {
        if(err) {
            console.log(err)
            return
        }
        for(let i: number = 0; i < files.length; i++) {
            const filePath: string = pth.join(path, files[i])
            fs.readFile(filePath, saveFileData(pc.changeFilePathExtension(filePath, ".txt")))
        }
    }
}

function saveFileData (filePath: string): (err: NodeJS.ErrnoException | null, data: Buffer) => void {
    return (err, data) => {
        if(err) {
            console.log(err)
            return
        }
        fs.writeFile(filePath, data, handleError)
    }
}

function handleError (err: NodeJS.ErrnoException | null): void {
    if (err) {
        console.log(err)
        return
    }
}