import * as fs from 'fs'
import * as pth from 'path'

const args: string[] = process.argv
const numArgs: number = args.length

if (numArgs != 3) {
    console.log("arguments: [directory name]")
    process.exit()
}

const path: string = args[2]

fs.readdir(path, (err: NodeJS.ErrnoException | null, files: string[]): void => {
    if(err) {
        console.log(err)
        return
    }
    for(let i: number = 0; i < files.length; i++) {
        fs.readFile(pth.join(path, files[i]), (err: NodeJS.ErrnoException | null, data: Buffer) => {
            if(err) {
                console.log(err)
                return
            }
            console.log(data.toString())
        })
    }
})