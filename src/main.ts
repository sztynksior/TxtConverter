import * as fs from 'fs'
import * as pth from 'path'
import * as pc from './utils/path-convert'

const args: string[] = process.argv
const numArgs: number = args.length

if (numArgs != 3) {
    console.log("arguments: [directory name]")
    process.exit()
}

interface File {
    path: string
    data: Buffer
}

const path: string = args[2]
let filePaths: string[] = []
let files: File[] = []

fs.readdir(path, convertFiles)

function convertFiles (err: NodeJS.ErrnoException | null, fileNames: string[]): void {
    filePaths = pc.getFilePaths(path, fileNames)
    readFiles(filePaths, onReadFile)
}

function saveFileDataToArray (file: File, files: File[]) {
    files.push(file)
}

function readFiles (filesPaths: string[], operation: (err: NodeJS.ErrnoException | null, data: Buffer) => void): void {
    filesPaths.forEach((filePath: string): void => {
        fs.readFile(filePath, operation)
    })
}

function writeFiles (files: file[], operation: (err: NodeJS.ErrnoException | null) => void): void {
    files.forEach((file) => {
        fs.writeFile(file.filePath, file.data, operation)
    })
}