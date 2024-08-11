import { UploadButton } from "@/utils/uploadthing";
import React from "react";
import { useToast } from "./ui/use-toast";

interface FileUploadProps {
  endpoint: "fileUploader";
  onChange: (url?: string) => void;
}

const FileUpload = ({ endpoint, onChange }: FileUploadProps) => {
  const { toast } = useToast();
  return (
    <div>
      <UploadButton
        endpoint={endpoint}
        onClientUploadComplete={(res) => {
          // Do something with the response
          toast({
            title: "Success",
            description: "File uploaded successfully",
          });
          onChange(res?.[0].url);
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          toast({
            title: "Error",
            description: error.message,
            variant: "destructive",
          });
        }}
      />
    </div>
  );
};

export default FileUpload;
