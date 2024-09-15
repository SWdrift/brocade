import { useGlobal } from "./global";
import { useUser } from "./user";

export function useModules(app: Application) {
    useGlobal();
    useUser();
}
