import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LogOut, Settings, Upload, FileText } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect } from "react";

export default function Admin() {
  const { user, logout, loading } = useAuth();
  const { t } = useLanguage();
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Redirect to home if not authenticated or not admin
    if (!loading && (!user || user.role !== "admin")) {
      setLocation("/");
    }
  }, [user, loading, setLocation]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t("admin.loading")}</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== "admin") {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">{t("admin.dashboard")}</h1>
            <p className="text-gray-600">{t("admin.contentManagement")}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-gray-600">{user.name}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                logout();
                setLocation("/");
              }}
              className="flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              {t("admin.logout")}
            </Button>
          </div>
        </div>
      </header>

      {/* Admin Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Content Management Card */}
          <Card className="hover:shadow-lg transition cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {t("admin.contentManagement")}
              </CardTitle>
              <CardDescription>Manage hero images and service descriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Edit your website content including hero images, service descriptions, and more.
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                {t("admin.edit")}
              </Button>
            </CardContent>
          </Card>

          {/* Media Upload Card */}
          <Card className="hover:shadow-lg transition cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5 text-orange-500" />
                {t("admin.mediaUpload")}
              </CardTitle>
              <CardDescription>Upload photos and videos</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Upload new photos and videos to your gallery and update your website media.
              </p>
              <Button className="w-full bg-orange-500 hover:bg-orange-600">
                {t("admin.add")}
              </Button>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card className="hover:shadow-lg transition cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="w-5 h-5 text-green-600" />
                {t("admin.settings")}
              </CardTitle>
              <CardDescription>Configure integrations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Configure Google Business Profile and Instagram API settings.
              </p>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                {t("admin.edit")}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Coming Soon Message */}
        <Card className="mt-12 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">Admin Dashboard - Coming Soon</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-blue-800">
              The full admin dashboard with content management, media uploads, and integration settings is currently being developed.
              This interface will allow you to easily manage all aspects of your website without technical knowledge.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
