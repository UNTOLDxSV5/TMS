export const storageService = {
  upload: async (filename: string, content: string) => {
    const url = `https://mock-s3.local/${encodeURIComponent(filename)}`;
    console.log(`[STORAGE] Uploaded ${filename} to ${url}`);
    return { url, key: filename };
  },
};
