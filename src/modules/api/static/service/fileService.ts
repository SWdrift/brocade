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

export async function saveFile(file: File | null, path?: string, cover?: boolean) {
    veifyFilePath(path);

    if (!file) {
        if (!path) {
            throw createAppError("file or path is required");
        }
        const newPath = getNewPath(path);
        return await deleteFile(newPath);
    }

    const f = file as File;
    const { filepath: oldPath } = f;
    const p = path || oldPath;
    const newPath = getNewPath(p);

    if ((await hasFile(newPath)) && !cover) {
        if (newPath !== oldPath) {
            throw createAppError(`file ${p} already exists, please choose another name`);
        }
        return;
    }

    await veifyFolderPath(getFileFolder(newPath));
    await moveFile(oldPath, newPath);
}

export async function veifyFolderPath(path: string) {
    const exists = await fs.promises.stat(path).catch(() => false);
    if (!exists) {
        await fs.promises.mkdir(path, { recursive: true });
    }
    return true;
}

export function addRootToPath(path: string) {
    return ROOT_PATH + "/" + path;
}

function veifyFilePath(path?: string) {
    const regex = /^(?!.*\.\.)[^./][\w./-]*[^./]\.[a-zA-Z0-9]+$/;
    if (path && regex.test(path)) {
        return true;
    }
    throw createAppError("invalid file path");
}

function getNewPath(path: string) {
    return addRootToPath(getEnv(EnvEnum.STATIC_FOLDER) + "/" + path);
}

function getFileFolder(path: string) {
    const parts = path.split("/");
    return parts.slice(0, parts.length - 1).join("/");
}

async function hasFile(path: string) {
    const exists = await fs.promises.stat(path).catch(() => false);
    return exists;
}

async function moveFile(oldPath: string, newPath: string) {
    await fs.promises.rename(oldPath, newPath);
}

async function deleteFile(path: string) {
    await fs.promises.unlink(path);
}
