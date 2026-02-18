import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { trpc } from "@/lib/trpc";
import { Loader, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export function InstagramSettings() {
  const { t } = useLanguage();
  const [accessToken, setAccessToken] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Queries and mutations
  const { data: settings, isLoading: settingsLoading } = trpc.instagram.getSettings.useQuery();
  const { data: accountInfo, isLoading: accountLoading } = trpc.instagram.getAccountInfo.useQuery();
  const configMutation = trpc.instagram.configureSettings.useMutation();
  const syncMutation = trpc.instagram.syncPosts.useMutation();
  const disableMutation = trpc.instagram.disable.useMutation();

  const handleConfigure = async () => {
    if (!accessToken.trim()) {
      alert("Please enter an access token");
      return;
    }

    try {
      const result = await configMutation.mutateAsync({
        accessToken,
        isActive: true,
      });

      if (result.success) {
        setAccessToken("");
        setShowForm(false);
        alert("Instagram configured successfully!");
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleSync = async () => {
    try {
      const result = await syncMutation.mutateAsync();
      if (result.success) {
        alert(`Successfully synced ${result.synced} posts!`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleDisable = async () => {
    if (confirm("Are you sure you want to disable Instagram integration?")) {
      try {
        const result = await disableMutation.mutateAsync();
        if (result.success) {
          alert("Instagram integration disabled");
        }
      } catch (error) {
        alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
      }
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Instagram Integration</CardTitle>
          <CardDescription>
            Connect your Instagram Business account to automatically sync posts to your gallery
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settingsLoading ? (
            <div className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Loading settings...</span>
            </div>
          ) : settings ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Connected</p>
                  <p className="text-sm text-green-700">
                    Instagram integration is active and configured
                  </p>
                </div>
              </div>

              {accountLoading ? (
                <div className="flex items-center gap-2">
                  <Loader className="w-4 h-4 animate-spin" />
                  <span>Loading account info...</span>
                </div>
              ) : accountInfo?.data ? (
                <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <p className="font-semibold text-blue-900">Account: @{accountInfo.data.username}</p>
                  {accountInfo.data.name && (
                    <p className="text-sm text-blue-700">{accountInfo.data.name}</p>
                  )}
                  {accountInfo.data.biography && (
                    <p className="text-sm text-blue-700 mt-2">{accountInfo.data.biography}</p>
                  )}
                </div>
              ) : null}

              <div className="flex gap-2">
                <Button
                  onClick={handleSync}
                  disabled={syncMutation.isPending}
                  className="flex items-center gap-2"
                >
                  {syncMutation.isPending ? (
                    <>
                      <Loader className="w-4 h-4 animate-spin" />
                      Syncing...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="w-4 h-4" />
                      Sync Posts Now
                    </>
                  )}
                </Button>
                <Button
                  onClick={handleDisable}
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  Disconnect
                </Button>
              </div>

              {settings.data?.lastSyncedAt && (
                <p className="text-sm text-gray-600">
                  Last synced: {new Date(settings.data.lastSyncedAt).toLocaleString()}
                </p>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-yellow-900">Not Configured</p>
                  <p className="text-sm text-yellow-700">
                    Instagram integration is not yet configured
                  </p>
                </div>
              </div>

              {!showForm ? (
                <Button onClick={() => setShowForm(true)} className="w-full">
                  Configure Instagram
                </Button>
              ) : (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Instagram Access Token
                    </label>
                    <textarea
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="Paste your Instagram Business Account access token here"
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                      Get your token from{" "}
                      <a
                        href="https://developers.facebook.com/docs/instagram-api/getting-started"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Facebook Developer Console
                      </a>
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleConfigure}
                      disabled={configMutation.isPending || !accessToken.trim()}
                      className="flex-1"
                    >
                      {configMutation.isPending ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin mr-2" />
                          Configuring...
                        </>
                      ) : (
                        "Save Configuration"
                      )}
                    </Button>
                    <Button
                      onClick={() => {
                        setShowForm(false);
                        setAccessToken("");
                      }}
                      variant="outline"
                      className="flex-1"
                    >
                      Cancel
                    </Button>
                  </div>

                  {configMutation.error && (
                    <div className="p-3 bg-red-50 border border-red-200 rounded text-sm text-red-700">
                      Error: {configMutation.error.message}
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>How to Get Your Access Token</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to Facebook Developer Console</li>
            <li>Create or select your app</li>
            <li>Navigate to Instagram Graph API section</li>
            <li>Generate a long-lived access token</li>
            <li>Copy the token and paste it above</li>
          </ol>
          <p className="text-xs text-gray-500 mt-4">
            Your access token is stored securely and only used to sync posts from your Instagram
            Business account.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
