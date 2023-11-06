export class JwtResponse {
  id: string;
  username: string;
  email: string;
  phone: string;
  roles: string[];
  token: string;
  refreshToken: string;

  constructor(id: string, username: string, email: string, phone: string, roles: string[], token: string, refreshToken: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
    this.roles = roles;
    this.token = token;
    this.refreshToken = refreshToken;
  }
}