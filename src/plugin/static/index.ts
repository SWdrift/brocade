import { getStaticServe } from "./service";

export function useStatic(app: Application) {
    const staticServe = getStaticServe();
    app.use(staticServe);
}
