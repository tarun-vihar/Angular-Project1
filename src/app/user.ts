export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public userName: string,
    public email: string,
    public phone: number,
    public password: string,
    public confirmPassword: string,
    public address: string,
    public doAggree: boolean
  ) {}
}
