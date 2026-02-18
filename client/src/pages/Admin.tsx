import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Settings, Upload, FileText, Loader } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useAdminAuth } from "@/hooks/useAdminAuth";
import { MediaUpload } from "@/components/MediaUpload";
import { ContentEditor } from "@/components/ContentEditor";
import { GalleryManager } from "@/components/GalleryManager";
import { InstagramSettings } from "@/components/InstagramSettings";
import { GoogleBusinessSettings } from "@/components/GoogleBusinessSettings";

export default function Admin() {
  const { isAuthenticated, isLoading, logout } = useAdminAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "media" | "content" | "gallery" | "instagram" | "google"
  >("dashboard");

  // Redirect if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      setLocation("/admin/login");
    }
  }, [isAuthenticated, isLoading, setLocation]);

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <Loader className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  // Don't render if not authenticated
  if (!isAuthenticated) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
            <p className="text-gray-600">Manage your website content</p>
          </div>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </Button>
        </div>
      </header>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto py-4">
            {[
              { id: "dashboard", label: "Dashboard", icon: "📊" },
              { id: "media", label: "Media Upload", icon: "📤" },
              { id: "content", label: "Content Editor", icon: "✏️" },
              { id: "gallery", label: "Gallery", icon: "🖼️" },
              { id: "instagram", label: "Instagram", icon: "📸" },
              { id: "google", label: "Google Business", icon: "🔍" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                <span className="mr-2">{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Welcome to Admin Panel</CardTitle>
                <CardDescription>
                  Manage all aspects of your website from here
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <Card className="border-2 border-blue-200 bg-blue-50">
                    <CardContent className="pt-6">
                      <Upload className="w-8 h-8 text-blue-600 mb-2" />
                      <h3 className="font-semibold text-gray-800">Media Upload</h3>
                      <p className="text-sm text-gray-600">
                        Upload images and videos to your website
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-green-200 bg-green-50">
                    <CardContent className="pt-6">
                      <FileText className="w-8 h-8 text-green-600 mb-2" />
                      <h3 className="font-semibold text-gray-800">Content Editor</h3>
                      <p className="text-sm text-gray-600">
                        Edit text content in English and Spanish
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border-2 border-purple-200 bg-purple-50">
                    <CardContent className="pt-6">
                      <Settings className="w-8 h-8 text-purple-600 mb-2" />
                      <h3 className="font-semibold text-gray-800">Integrations</h3>
                      <p className="text-sm text-gray-600">
                        Connect Instagram and Google Business
                      </p>
                    </CardContent>
                  </Card>
                </div>

                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Quick Tips:</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Use Media Upload to add images and videos</li>
                    <li>• Edit content in both English and Spanish</li>
                    <li>• Connect Instagram to auto-sync your posts</li>
                    <li>• Connect Google Business to show customer reviews</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Media Upload Tab */}
        {activeTab === "media" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h2 className="text-xl font-bold mb-4">Upload Images</h2>
                <MediaUpload type="image" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-4">Upload Videos</h2>
                <MediaUpload type="video" />
              </div>
            </div>
          </div>
        )}

        {/* Content Editor Tab */}
        {activeTab === "content" && (
          <div className="space-y-6">
            <ContentEditor
              contentKey="hero-section"
              titleLabel="Hero Section"
              descriptionLabel="Hero Description"
            />
            <ContentEditor
              contentKey="service-plumbing"
              titleLabel="Plumbing Service"
              descriptionLabel="Service Description"
            />
            <ContentEditor
              contentKey="service-painting"
              titleLabel="Painting Service"
              descriptionLabel="Service Description"
            />
            <ContentEditor
              contentKey="service-maintenance"
              titleLabel="General Maintenance"
              descriptionLabel="Service Description"
            />
          </div>
        )}

        {/* Gallery Tab */}
        {activeTab === "gallery" && (
          <div className="space-y-6">
            <GalleryManager />
          </div>
        )}

        {/* Instagram Tab */}
        {activeTab === "instagram" && (
          <div className="space-y-6">
            <InstagramSettings />
          </div>
        )}

        {/* Google Business Tab */}
        {activeTab === "google" && (
          <div className="space-y-6">
            <GoogleBusinessSettings />
          </div>
        )}
      </main>
    </div>
  );
}
