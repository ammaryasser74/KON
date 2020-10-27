import { Injectable } from '@angular/core';
import { WebApiService } from "./webApi.service";
@Injectable()
export class FilesUploadService {
	private controller: string = '/File';
	constructor(private webApi: WebApiService) { }
	Upload(body: Object) {
		return this.webApi.fileUpload(`${this.controller}/Upload`, body)
	}
	Delete(fileName: string) {
		return this.webApi.delete(`${this.controller}/Delete/${fileName}`);
	}
	ConverExcelToJson(fileName: string) {
		return this.webApi.post(`/ExcelSheet/ConverExcelToJson`, { Name: fileName });
	}
}