import axios from "axios";

export class LoginReceiver {
  constructor(private username: string, private password: string) {}

  async doRequest(url: string): Promise<string> {
    const credentials = `${this.username}:${this.password}`;
    const base64Credentials = btoa(credentials); // Base64 encode credentials

    const headers = {
      Authorization: `Basic ${base64Credentials}`,
      "Content-Type": "application/json",
    };

    try {
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      throw new Error('Failed to fetch superheroesError during login:' + error);
    }
  }
}
