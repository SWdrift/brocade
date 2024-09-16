import { defaultApi } from "./api";
import { defaultWeb } from "./web";

export function useModules(app: Application) {
    defaultApi(app);
    defaultWeb(app);
}
