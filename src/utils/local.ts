export const saveStringToLocal = (str: string, filename: string) => {
	const blob = new Blob([str], { type: "text/plain;charset=utf-8" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
};
export const saveUint8ArrayToLocal = (buffer: BlobPart, filename: string) => {
	const blob = new Blob([buffer], { type: "application/octet-stream" });
	const url = URL.createObjectURL(blob);
	const link = document.createElement("a");
	link.href = url;
	link.download = filename;
	link.click();
	URL.revokeObjectURL(url);
};
