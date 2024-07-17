import { LoginReceiver } from "./LoginReceiver";

export class LoginCommand {
  readonly url: string = `${process.env.REACT_APP_API_SERVER}/api/v1/login`;

  constructor(private receiver: LoginReceiver) {}

  async execute(): Promise<string> {
    return this.receiver.doRequest(this.url);
  }
}
