import { defaultGlobal } from "./root";
import { defaultUser } from "./user";
import { defaultStatic } from "./static";

export function defaultApi(app: Application) {
    defaultGlobal();
    defaultUser();
    defaultStatic();
}
