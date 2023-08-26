import * as pth from 'path'

export function changeFilePathExtension (filePath: string, extension: string): string {
    let filePathObject = pth.parse(filePath)
    filePathObject.base = filePathObject.name + extension
    const newFilePath: string = pth.format(filePathObject)
    return newFilePath
} 