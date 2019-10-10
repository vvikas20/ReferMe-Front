import { environment } from "src/environments/environment";


export class ApiEndPoints {

    static readonly baseUrl: string = `${environment.serverURL}/api`;

    static readonly application: string = `${ApiEndPoints.baseUrl}/application`;
    static readonly applicationDetail: string = `${ApiEndPoints.application}/detail`;

    static readonly user: string = `${ApiEndPoints.baseUrl}/user`;
    static readonly addUser: string = `${ApiEndPoints.user}/add`;
    static readonly validateUser: string = `${ApiEndPoints.user}/validate`;
    static readonly allUser: string = `${ApiEndPoints.user}/all`;
    static readonly deleteUser: string = `${ApiEndPoints.user}/delete`;
}