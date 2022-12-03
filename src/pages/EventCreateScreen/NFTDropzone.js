import { useEffect, useState } from "react";
import fileUpload from "../../assets/file_upload_icon.svg";
import "./Modal.css";
import Dropzone, { useDropzone } from "react-dropzone";
import { useSnackbar } from "notistack";

function NFTDropzone({ type, handleDrop, height }) {
  const maxSize = 31457280;
  const [fileData, setFileData] = useState([]);
  const [errors, setErrors] = useState(null);
  const [previewImg, setPreviewImg] = useState(null);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [checked, setChecked] = useState(false);
  const handleToggle = () => {
    setChecked(!checked);
  };
  const { fileUploadData, setFileUploadData } = useState({
    status: false,
    name: "",
    type: "",
  });
  const processFile = (file) => {
    console.log("ff", file);
    let fileUploaded = {
      status: false,
      name: "",
      data: "",
      type: "",
      size: "",
    };
    fileUploaded.status = true;
    fileUploaded.name = file.name;
    fileUploaded.data = file;
    fileUploaded.type = type;

    const fileSize = file.size / 1024 / 1024;

    if (fileSize > 30) {
      enqueueSnackbar(
        `Uploaded ${fileUploaded.type} image should be less than 30MB`,
        { variant: "error" }
      );
    } else {
      handleDrop(fileUploaded);
    }
  };
  const onDrop = async (acceptedFiles, fileRejections) => {
    console.log("accepted files", acceptedFiles);
    setFileData(acceptedFiles[0]);
    acceptedFiles.forEach((file) => {
      setErrors(null);
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
      reader.onloadend = async () => {
        setPreviewImg(reader.result);
      };
      if (file) {
        processFile(file);
      }
    });
    fileRejections.forEach((file) => {
      file.errors.forEach((err) => {
        if (err.code === "file-too-large") {
          setErrors(`Error: ${err.message}`);
          enqueueSnackbar(`Uploaded file should be less than 30MB`, {
            variant: "error",
          });
        }

        if (err.code === "file-invalid-type") {
          setErrors(`Error: ${err.message}`);
        }
      });
    });
  };

  return (
    <Dropzone
      onDrop={onDrop}
      accept="image/*"
      minSize={0}
      maxSize={maxSize}
      multiple={false}
      disabled={false}
    >
      {({ getRootProps, getInputProps, rejectedFiles, acceptedFiles }) => {
        return (
          <div
            className={`file-container `}
            {...getRootProps({
              style: {
                background: `${acceptedFiles[0] ? "#000000" : "#1D2126"}`,
              },
              className: `dropzone mm-upload-image file-container ${height} w-64 } ${
                false ? "pointer-events-none opacity-50" : ""
              }`,
            })}
          >
            <input {...getInputProps()} />

            {acceptedFiles[0] ? (
              <>
                {acceptedFiles[0].type.includes("video") ? (
                  <video
                    style={{
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                      overflow: "hidden",
                      objectFit: "contain",
                      borderRadius: "25px",
                    }}
                    controls
                    loop
                    src={previewImg}
                    alt="ad"
                  />
                ) : (
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      overflow: "hidden",
                      objectFit: "contain",
                      borderRadius: "25px",
                    }}
                    src={previewImg}
                    alt="ad"
                  />
                )}
                <p
                  style={{
                    zIndex: 2,
                    position: "absolute",
                    bottom: "50%",
                  }}
                  className="text-center"
                >
                  {acceptedFiles[0].name}
                </p>
              </>
            ) : (
              <>
                {" "}
                <img
                  className="file-upload"
                  src={fileUpload}
                  alt="file upload"
                />
                <p className="drag-text">Drag & Drop to Upload or Click</p>
                <p className="upload-inner-text">{`Supported media types .jpg, .png, .gif (<30MB)`}</p>
                {errors && (
                  <div className="text-red-500 mt-2">File is too large.</div>
                )}
              </>
            )}
          </div>
        );
      }}
    </Dropzone>
  );
}

export default NFTDropzone;
