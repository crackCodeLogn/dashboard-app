export class GetSessionData {
    fileName!: string
    fileData!: string

    constructor(fileName: string, fileData: string) {
        this.fileName = fileName;
        this.fileData = fileData;
    }

    toString(): string { // todo - is not working
        return `${this.fileName}\n${this.fileData}`
    }
}
