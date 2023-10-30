export class JwtResponse {
    id: string;
    username: string;
    email: string;
    phone: string;
    roles: any[];
    token: string;

    constructor(id: string, username: string, email: string, phone: string, roles: any[], token: string) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.roles = roles;
        this.token = token;
    }
}