// Thanks to https://gist.github.com/n1ru4l/dc99062577b746e0783410b1298ab897
export function convertBlobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onloadend = () => {
      resolve(reader.result as string);
    };
    reader.readAsDataURL(blob);
    reader.onerror = reject;
  });
}
