import { defaultGlobal } from "./global";
import { defaultUser } from "./user";
import { defaultStatic } from "./static";

export function useModules(app: Application) {
    defaultGlobal();
    defaultUser();
    defaultStatic();
}
