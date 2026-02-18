import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import {
  Loader,
  Trash2,
  Upload,
  Image,
  Video,
  GripVertical,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

interface GalleryItem {
  id: string;
  url: string;
  type: "image" | "video";
  title: string;
  createdAt: Date;
}

export function GalleryManager() {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null);

  // Queries and mutations
  const { data: allContent, isLoading } = trpc.media.getAllContent.useQuery();
  const deleteMutation = trpc.media.deleteContent.useMutation();

  // Load gallery items from content
  useEffect(() => {
    if (allContent?.data) {
      const items: GalleryItem[] = [];

      allContent.data.forEach((content) => {
        if (content.imageUrl) {
          items.push({
            id: `${content.key}-image`,
            url: content.imageUrl,
            type: "image",
            title: content.titleEn || content.key,
            createdAt: new Date(content.createdAt),
          });
        }
        if (content.videoUrl) {
          items.push({
            id: `${content.key}-video`,
            url: content.videoUrl,
            type: "video",
            title: content.titleEn || content.key,
            createdAt: new Date(content.createdAt),
          });
        }
      });

      // Sort by creation date (newest first)
      items.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setGalleryItems(items);
    }
  }, [allContent?.data]);

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm(`Delete this ${item.type}? This action cannot be undone.`)) {
      return;
    }

    try {
      const contentKey = item.id.split("-")[0];
      const result = await deleteMutation.mutateAsync({
        key: contentKey,
      });

      if (result.success) {
        setGalleryItems(galleryItems.filter((i) => i.id !== item.id));
        alert("Item deleted successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader className="w-6 h-6 animate-spin text-blue-600" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Gallery Manager</CardTitle>
        <CardDescription>
          View and manage all uploaded images and videos
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {galleryItems.length === 0 ? (
          <div className="text-center py-12">
            <Image className="w-12 h-12 mx-auto text-gray-300 mb-3" />
            <p className="text-gray-600 mb-4">No media uploaded yet</p>
            <p className="text-sm text-gray-500">
              Upload images or videos using the Media Upload section
            </p>
          </div>
        ) : (
          <>
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {galleryItems.map((item) => (
                <div
                  key={item.id}
                  className="relative group rounded-lg overflow-hidden bg-gray-100 aspect-square"
                >
                  {/* Media Preview */}
                  {item.type === "image" ? (
                    <img
                      src={item.url}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={item.url}
                      className="w-full h-full object-cover"
                      controls={false}
                    />
                  )}

                  {/* Type Badge */}
                  <div className="absolute top-2 left-2">
                    <div className="bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                      {item.type === "image" ? (
                        <Image className="w-3 h-3" />
                      ) : (
                        <Video className="w-3 h-3" />
                      )}
                      {item.type === "image" ? "Image" : "Video"}
                    </div>
                  </div>

                  {/* Overlay on Hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <Button
                      onClick={() => window.open(item.url, "_blank")}
                      size="sm"
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => handleDelete(item)}
                      size="sm"
                      variant="destructive"
                      disabled={deleteMutation.isPending}
                      className="flex items-center gap-1"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </Button>
                  </div>

                  {/* Title and Date */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3 text-white">
                    <p className="text-sm font-medium truncate">{item.title}</p>
                    <p className="text-xs text-gray-300">
                      {item.createdAt.toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <span className="font-medium">Total items:</span> {galleryItems.length}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Images:</span>{" "}
                {galleryItems.filter((i) => i.type === "image").length}
              </p>
              <p className="text-sm text-gray-700">
                <span className="font-medium">Videos:</span>{" "}
                {galleryItems.filter((i) => i.type === "video").length}
              </p>
            </div>
          </>
        )}

        {deleteMutation.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-red-900">Delete failed</p>
              <p className="text-xs text-red-700">
                {deleteMutation.error.message}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
