import * as pth from 'path'

export function changeFilePathExtension (filePath: string, extension: string): string {
    let filePathObject = pth.parse(filePath)
    filePathObject.base = filePathObject.name + extension
    const newFilePath: string = pth.format(filePathObject)
    return newFilePath
} 

export function getFilePaths (directory: string, fileNames: string []): string[] {
    let filesPaths: string [] = []
    fileNames.forEach((fileName): void => {
        filesPaths.push(pth.join(directory, fileName))
    })
    return filesPaths
}