export class CreateGoogleUserDto {
  email: string;
  firstName: string;
  lastName?: string;
  avatarUri?: string;
  provider: 'google';
}
