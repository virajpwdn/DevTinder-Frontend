import { useEffect, useRef, useState } from "react";
import {
  upload,
  ImageKitAbortError,
  ImageKitInvalidRequestError,
  ImageKitUploadNetworkError,
  ImageKitServerError,
} from "@imagekit/react";
import AuthService from "../../service/auth.service";
import UserService from "../../service/user.service";
import imgHeicToJpegConvert from "../../utils/heicConvert";

export const usePhotoUpload = () => {
  const [images, setImages] = useState([]);
  const [dragOver, setDragOver] = useState(false);
  const abortControllerRef = useRef(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const getAllPhotos = async () => {
      try {
        const { data } = await UserService.getAllPhotos();
        if (data.photos.length > 0) setImages(data.photos);
      } catch (err) {
        console.log("error fetching photos - ", err);
      }
    };
    getAllPhotos();
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => {
    setDragOver(false);
  };
  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    handleFiles(Array.from(e.dataTransfer.files));
  };

  const handleFiles = async (selectedFile) => {
    if (!selectedFile) return;
    if (selectedFile.length + images.length > 6)
      return alert("You can only upload upto 6 images");

    const imageFiles = await imgHeicToJpegConvert(selectedFile);
    setImages((prev) => [...prev, ...imageFiles]);
    abortControllerRef.current = new AbortController();

    try {
      const uploadPromises = imageFiles.map(async (file) => {
        const authParams = await AuthService.getImageKitToken();
        try {
          const result = await upload({
            ...authParams,
            file: file.file,
            fileName: file.file.name,
            onProgress: (event) => {
              const percent = Math.round((event.loaded / event.total) * 100);
              setImages((prev) =>
                prev.map((img) =>
                  img?.clientRefId === file?.file?.clientRefId
                    ? { ...img, progress: percent }
                    : img,
                ),
              );
            },
            abortSignal: abortControllerRef.current.signal,
          });
          return {
            status: "fulfilled",
            fileName: file.file.name,
            clientRefId: file.file.clientRefId,
            value: result,
          };
        } catch (err) {
          return { status: "rejected", fileName: file.file.name, reason: err };
        }
      });

      const results = await Promise.all(uploadPromises);
      const succeeded = results.filter((r) => r.status === "fulfilled");
      const failed = results.filter((r) => r.status === "rejected");

      setImages((prev) =>
        prev.map((img) => {
          const match = succeeded.find(
            (r) => r.clientRefId === img.clientRefId,
          );
          return match
            ? { ...img, status: "complete", imagekitResponse: match.value }
            : img;
        }),
      );

      if (failed.length > 0) {
        const failedNames = new Set(failed.map((r) => r.fileName));
        alert(`${failed.length} image(s) failed: ${failed[0].reason}`);
        setImages((prev) => prev.filter((img) => !failedNames.has(img.name)));
      }

      if (succeeded.length > 0) {
        await UserService.postUserPhotos(
          succeeded.map((img) => ({
            filePath: img.value.filePath,
            fileId: img.value.fileId,
            fileType: img.value.fileType,
            height: img.value.height,
            width: img.value.width,
            url: img.value.url,
            size: img.value.size,
            clientRefId: img.clientRefId,
          })),
        );
      }
    } catch (err) {
      if (err instanceof ImageKitAbortError)
        console.error("Aborted:", err.reason);
      else if (err instanceof ImageKitInvalidRequestError)
        console.error("Invalid:", err.message);
      else if (err instanceof ImageKitUploadNetworkError)
        console.error("Network:", err.message);
      else if (err instanceof ImageKitServerError)
        console.error("Server:", err.message);
      else console.error("Upload failed:", err);
    }
  };

  const imgDeleteHandler = async (photoId) => {
    const deleteImg = await UserService.deletePhotoById(photoId);
    setImages(deleteImg.photos);
  };

  return {
    images,
    setImages,
    dragOver,
    fileInputRef,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFiles,
    imgDeleteHandler,
  };
};
