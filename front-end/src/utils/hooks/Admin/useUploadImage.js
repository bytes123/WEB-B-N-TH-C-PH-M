import React, { useState, useEffect } from "react";

export default function useUploadImage() {
  const [imagePreview, setImagePreview] = useState();
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setImagePreview(undefined);
      return;
    }
    console.log(selectedFile);
    const objectUrl = URL.createObjectURL(selectedFile);
    setImagePreview(objectUrl);
    console.log(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  return { imagePreview, setSelectedFile };
}
