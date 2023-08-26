import * as fs from 'fs'
import * as pth from 'path'

const args: string[] = process.argv
const numArgs: number = args.length

if (numArgs != 4) {
    console.log("arguments: [directory name] [directory name for converted data]")
    process.exit()
}

const path: string = args[2]
const newPath: string = pth.join(path, args[3])
console.log(newPath)

fs.readdir(path, readDirectoryCallback)

function readDirectoryCallback (err: NodeJS.ErrnoException | null, files: string[]): void {
    if(err) {
        console.log(err)
        return
    }
    for(let i: number = 0; i < files.length; i++) {
        fs.readFile(pth.join(path, files[i]), readFileCallback(files[i]))
    }
}

function readFileCallback (file: string): (err: NodeJS.ErrnoException | null, data: Buffer) => void {
    return (err, data) => {
        if(err) {
            console.log(err)
            return
        }
        let newFilePath: pth.ParsedPath = pth.parse(pth.join(newPath, file))
        newFilePath.base = newFilePath.name + '.txt'
        fs.mkdir(newFilePath.dir, errorHandleCallback)
        let a = pth.format(newFilePath)
        fs.writeFile(a , data, errorHandleCallback)
    }
}

function errorHandleCallback (err: NodeJS.ErrnoException | null): void {
    if (err) {
        console.log(err)
        return
    }
}