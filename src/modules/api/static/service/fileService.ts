import fs from "fs";
import { createAppError } from "../../../../public/error/modules/appError";
import { ROOT_PATH } from "../../../../public/path";
import { EnvEnum, getEnv } from "../../../../public/env";

interface File {
    size: number;
    filepath: string;
    originalFilename: string | null;
    newFilename: string;
    mimetype: string | null;
    mtime?: Date | null | undefined;
    hashAlgorithm: false | "sha1" | "md5" | "sha256";
    hash?: string | null;
}

export async function saveFiles(files: File | File[]) {
    if (Array.isArray(files)) {
        const f = files as File[];
        Promise.all(f.map((file) => saveFile(file)));
    } else {
        const f = files as File;
        saveFile(f);
    }
}

export async function saveFile(files: File | File[], path?: string) {
    if (Array.isArray(files)) {
        throw createAppError("save file array not supported");
    }
    if (!veifyFilePath(path)) {
        throw createAppError("invalid file path");
    }
    const f = files as File;
    const { filepath: oldPath } = f;
    const p = path || oldPath;
    if (fs.existsSync(p)) {
        if (p !== oldPath) {
            throw createAppError(`file ${p} already exists, please choose another name`);
        }
        return;
    }
    const newPath = getNewPath(p);
    await fs.promises.rename(oldPath, newPath);
}

function veifyFilePath(path?: string) {
    return true;
}

function getNewPath(path: string) {
    return ROOT_PATH + "/" + getEnv(EnvEnum.STATIC_FOLDER) + "/" + path;
}
