export class User {
  name: string;
  lastName: string;
  email: string;
  emailVerifired: boolean;
  phoneNumber: string;
  phoneVerifired: boolean;
  bio: string;
  imageUrl: string;

  constructor(name: string, lastName: string, email: string, emailVerifired: boolean, phoneNumber: string, phoneVerifired: boolean, bio: string, imageUrl: string) {
    this.name = name;
    this.lastName = lastName;
    this.email = email;
    this.emailVerifired = emailVerifired;
    this.phoneNumber = phoneNumber;
    this.phoneVerifired = phoneVerifired;
    this.bio = bio;
    this.imageUrl = imageUrl;
  }
}