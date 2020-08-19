import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AppService {
    api = 'http://localhost:8000/api';
    // api = 'http://localhost:3000';
    username: string;

    constructor(private http: HttpClient) {
    }

    // Returns all members
    getMembers() {
        return this.http
            .get(`${this.api}/members`)
            .pipe(catchError(this.handleError));
    }

    setUsername(name: string): void {
        this.username = name;
    }

    addMember(memberForm) {
        return this.http.post(`${this.api}/addMember/`, memberForm);
    }

    getMemberById(id) {
        return this.http
            .get(`${this.api}/members/${id}`)
            .pipe(catchError(this.handleError));
    }

    updateMembers(memberForm, id) {
        console.log(id);
        return this.http
            .put(`${this.api}/update/?id=${id}`, memberForm)
            .pipe(catchError(this.handleError));
    }

    deleteMember(id) {
        console.log('ID ' + id);
        return this.http
            .delete(`${this.api}/delete/?id=${id}`)
            .pipe(catchError(this.handleError));
    }

    getTeams() {
        return this.http
            .get(`${this.api}/teams`)
            .pipe(catchError(this.handleError));
    }

    private handleError(error: HttpErrorResponse) {
        if (error.error instanceof ErrorEvent) {
            console.error('An error occurred:', error.error.message);
        } else {
            console.error(
                `Backend returned code ${error.status}, ` + `body was: ${error.error}`
            );
        }
        return [];
    }
}
