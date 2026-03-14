import heic2any from "heic2any";

const imgHeicToJpegConvert = async (selectedFiles) => {
  const processedFiles = await Promise.all(
    selectedFiles.map(async (file) => {
      if (file.type === "image/heic" || file.type === "image/heif") {
        const convertedBlob = await heic2any({
          blob: file,
          toType: "image/jpeg",
        });

        const blob = Array.isArray(convertedBlob)
          ? convertedBlob[0]
          : convertedBlob;

        const newName = file.name.replace(/\.(heic|heif)$/i, ".jpg");

        return new File([blob], newName, {
          type: "image/jpeg",
        });
      }

      return file;
    }),
  );

  const newImages = processedFiles.map((file) => {
    const clientRefId = crypto.randomUUID();

    const taggedFile = Object.assign(file, { clientRefId });

    return {
      clientRefId, 
      file: taggedFile,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: "uploading",
    };
  });
  return newImages;
};

export default imgHeicToJpegConvert;
