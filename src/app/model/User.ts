export class User {
  firstName: string;
  lastName: string;
  email: string;
  emailVerifired: boolean;
  phoneNumber: string;
  phoneVerifired: boolean;
  bio: string;
  imageUrl: string;

  constructor(firstName: string, lastName: string, email: string, emailVerifired: boolean, phoneNumber: string, phoneVerifired: boolean, bio: string, imageUrl: string) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.emailVerifired = emailVerifired;
    this.phoneNumber = phoneNumber;
    this.phoneVerifired = phoneVerifired;
    this.bio = bio;
    this.imageUrl = imageUrl;
  }
}