export class JwtResponse {
    id: string;
    username: string;
    jwt: string;
    authorities: any[];

    constructor(id: string, username: string, jwt: string, authorities: any[]) {
        this.id = id;
        this.username = username;
        this.jwt = jwt;
        this.authorities = authorities;
    }
}