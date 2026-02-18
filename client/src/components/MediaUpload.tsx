import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Upload, Image, Video, Loader, CheckCircle, AlertCircle, X } from "lucide-react";

interface MediaUploadProps {
  type: "image" | "video";
  contentKey?: string;
  onSuccess?: (url: string) => void;
}

export function MediaUpload({ type, contentKey, onSuccess }: MediaUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadMutation = trpc.media[
    type === "image" ? "uploadImage" : "uploadVideo"
  ].useMutation();

  const maxSize = type === "image" ? 10 * 1024 * 1024 : 100 * 1024 * 1024;
  const allowedTypes =
    type === "image"
      ? ["image/jpeg", "image/png", "image/webp", "image/gif"]
      : ["video/mp4", "video/webm", "video/quicktime"];

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    // Validate file type
    if (!allowedTypes.includes(file.type)) {
      alert(
        `Invalid file type. Allowed: ${
          type === "image"
            ? "JPEG, PNG, WebP, GIF"
            : "MP4, WebM, MOV"
        }`
      );
      return;
    }

    // Validate file size
    if (file.size > maxSize) {
      alert(
        `File too large. Maximum size: ${
          type === "image" ? "10MB" : "100MB"
        }`
      );
      return;
    }

    setSelectedFile(file);

    // Create preview
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.currentTarget.files;
    if (files && files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    try {
      const buffer = await selectedFile.arrayBuffer();
      const result = await uploadMutation.mutateAsync({
        file: Buffer.from(buffer),
        filename: selectedFile.name,
        mimeType: selectedFile.type,
        contentKey,
      });

      if (result.success && result.data) {
        alert("Upload successful!");
        setSelectedFile(null);
        setPreview(null);
        onSuccess?.(result.data.url);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {type === "image" ? (
            <Image className="w-5 h-5" />
          ) : (
            <Video className="w-5 h-5" />
          )}
          Upload {type === "image" ? "Image" : "Video"}
        </CardTitle>
        <CardDescription>
          {type === "image"
            ? "Upload a JPEG, PNG, WebP, or GIF image (max 10MB)"
            : "Upload an MP4, WebM, or MOV video (max 100MB)"}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {!selectedFile ? (
          <>
            {/* Drag and Drop Area */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 bg-gray-50 hover:border-gray-400"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept={allowedTypes.join(",")}
                onChange={handleInputChange}
                className="hidden"
              />

              <div
                onClick={() => fileInputRef.current?.click()}
                className="space-y-2"
              >
                <Upload className="w-12 h-12 mx-auto text-gray-400" />
                <p className="text-sm font-medium text-gray-700">
                  Drag and drop your {type} here
                </p>
                <p className="text-xs text-gray-500">
                  or click to browse
                </p>
              </div>
            </div>

            {/* File Input Button */}
            <Button
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full"
            >
              Choose {type === "image" ? "Image" : "Video"}
            </Button>
          </>
        ) : (
          <>
            {/* Preview */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-gray-700">Preview:</p>
              {type === "image" && preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full max-h-96 object-cover rounded-lg"
                />
              ) : type === "video" && preview ? (
                <video
                  src={preview}
                  controls
                  className="w-full max-h-96 rounded-lg"
                />
              ) : null}

              <div className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <span className="font-medium">File:</span> {selectedFile.name}
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Size:</span>{" "}
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={handleUpload}
                disabled={uploadMutation.isPending}
                className="flex-1 flex items-center gap-2"
              >
                {uploadMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="w-4 h-4" />
                    Upload
                  </>
                )}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
                disabled={uploadMutation.isPending}
              >
                Cancel
              </Button>
            </div>

            {uploadMutation.isSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Upload successful!
                  </p>
                  <p className="text-xs text-green-700">
                    Your {type} has been uploaded to the server
                  </p>
                </div>
              </div>
            )}

            {uploadMutation.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900">
                    Upload failed
                  </p>
                  <p className="text-xs text-red-700">
                    {uploadMutation.error.message}
                  </p>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
