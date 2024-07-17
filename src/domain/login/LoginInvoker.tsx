import { PageMeta } from "../superhero/PageMeta";
import { LoginCommand } from "./LoginCommand";

export class LoginInvoker {
  constructor(protected command: LoginCommand) {}

  pageMeta: PageMeta | undefined;

  async invoke(): Promise<string> {
    return (await this.command.execute()) as string; 
  }
}
