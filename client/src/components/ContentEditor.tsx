import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader, CheckCircle, AlertCircle, Edit2 } from "lucide-react";

interface ContentEditorProps {
  contentKey: string;
  titleLabel: string;
  descriptionLabel?: string;
}

export function ContentEditor({
  contentKey,
  titleLabel,
  descriptionLabel,
}: ContentEditorProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [titleEn, setTitleEn] = useState("");
  const [titleEs, setTitleEs] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionEs, setDescriptionEs] = useState("");

  // Queries and mutations
  const { data: content, isLoading } = trpc.media.getContent.useQuery({
    key: contentKey,
  });
  const updateMutation = trpc.media.updateContent.useMutation();

  // Load content when it changes
  useEffect(() => {
    if (content?.data) {
      setTitleEn(content.data.titleEn || "");
      setTitleEs(content.data.titleEs || "");
      setDescriptionEn(content.data.descriptionEn || "");
      setDescriptionEs(content.data.descriptionEs || "");
    }
  }, [content?.data]);

  const handleSave = async () => {
    try {
      const result = await updateMutation.mutateAsync({
        key: contentKey,
        titleEn: titleEn || undefined,
        titleEs: titleEs || undefined,
        descriptionEn: descriptionEn || undefined,
        descriptionEs: descriptionEs || undefined,
      });

      if (result.success) {
        setIsEditing(false);
        alert("Content updated successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    if (content?.data) {
      setTitleEn(content.data.titleEn || "");
      setTitleEs(content.data.titleEs || "");
      setDescriptionEn(content.data.descriptionEn || "");
      setDescriptionEs(content.data.descriptionEs || "");
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
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <Edit2 className="w-5 h-5" />
              {titleLabel}
            </CardTitle>
            <CardDescription>Edit content in English and Spanish</CardDescription>
          </div>
          {!isEditing && (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              Edit
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <>
            {/* English Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (English)
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="Enter title in English"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* Spanish Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Title (Spanish)
              </label>
              <input
                type="text"
                value={titleEs}
                onChange={(e) => setTitleEs(e.target.value)}
                placeholder="Enter title in Spanish"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
              />
            </div>

            {/* English Description */}
            {descriptionLabel && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (English)
                  </label>
                  <textarea
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="Enter description in English"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>

                {/* Spanish Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description (Spanish)
                  </label>
                  <textarea
                    value={descriptionEs}
                    onChange={(e) => setDescriptionEs(e.target.value)}
                    placeholder="Enter description in Spanish"
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 resize-none"
                  />
                </div>
              </>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="flex-1 flex items-center gap-2"
              >
                {updateMutation.isPending ? (
                  <>
                    <Loader className="w-4 h-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
                disabled={updateMutation.isPending}
              >
                Cancel
              </Button>
            </div>

            {updateMutation.isSuccess && (
              <div className="p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-green-900">
                    Content updated successfully!
                  </p>
                </div>
              </div>
            )}

            {updateMutation.error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-red-900">
                    Update failed
                  </p>
                  <p className="text-xs text-red-700">
                    {updateMutation.error.message}
                  </p>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            {/* Display Mode */}
            <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
              {titleEn && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    ENGLISH TITLE
                  </p>
                  <p className="text-gray-900">{titleEn}</p>
                </div>
              )}

              {titleEs && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    SPANISH TITLE
                  </p>
                  <p className="text-gray-900">{titleEs}</p>
                </div>
              )}

              {descriptionEn && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    ENGLISH DESCRIPTION
                  </p>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm">
                    {descriptionEn}
                  </p>
                </div>
              )}

              {descriptionEs && (
                <div>
                  <p className="text-xs font-semibold text-gray-600 mb-1">
                    SPANISH DESCRIPTION
                  </p>
                  <p className="text-gray-700 whitespace-pre-wrap text-sm">
                    {descriptionEs}
                  </p>
                </div>
              )}

              {!titleEn && !titleEs && !descriptionEn && !descriptionEs && (
                <p className="text-sm text-gray-500 italic">
                  No content yet. Click Edit to add content.
                </p>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
