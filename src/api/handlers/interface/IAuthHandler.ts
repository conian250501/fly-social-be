export default interface IAuthHanlder {
  getTokenGithub(code:string): Promise<any>
}