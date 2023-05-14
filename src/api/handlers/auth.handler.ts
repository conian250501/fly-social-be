import axios from "axios";
import IAuthHanlder from "./interface/IAuthHandler";

class AuthHandler implements IAuthHanlder{
  async  getTokenGithub(code: string): Promise<any> {
      try {
        const params = `?client_id=${process.env.GITHUB_CLIENT_ID}&client_secret=${process.env.GITHUB_CLIENT_SECRET}&code=${code}`;

        const { data } = await axios.post(
          `https://github.com/login/oauth/access_token${params}`,
          {},
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );

        return data;
      } catch (error) {
        throw error;
      }
  }
}

export default new AuthHandler();