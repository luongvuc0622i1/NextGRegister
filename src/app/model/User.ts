export class User {
  id: string;
  username: string;
  email: string;
  phone: string;

  constructor(id: string, username: string, email: string, phone: string) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.phone = phone;
  }
}