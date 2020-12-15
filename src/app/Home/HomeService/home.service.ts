import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { RestServiceReferenceModel } from "../Models/service-ref-temp.model";

@Injectable({
    providedIn: 'root'
})
export class HomeService {

    baseUrl : string = "http://localhost:2798/RestApiGladiator/";

    constructor(private http: HttpClient) {
        
    }

    getServiceStatus(serviceId : number) : Observable<RestServiceReferenceModel> {
        return this.http.get<RestServiceReferenceModel>(`${this.baseUrl}account/displayStatus/${serviceId}`);
    }


}