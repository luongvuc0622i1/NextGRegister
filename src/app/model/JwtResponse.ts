export class JwtResponse {
    id: string;
    username: string;
    token: string;
    authorities: any[];

    constructor(id: string, username: string, token: string, authorities: any[]) {
        this.id = id;
        this.username = username;
        this.token = token;
        this.authorities = authorities;
    }
}