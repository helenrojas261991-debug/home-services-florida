import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Loader, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";

export function GoogleBusinessSettings() {
  const [accessToken, setAccessToken] = useState("");
  const [googleLocationName, setGoogleLocationName] = useState("");
  const [showForm, setShowForm] = useState(false);

  // Queries and mutations
  const { data: settings, isLoading: settingsLoading } = trpc.googleBusiness.getSettings.useQuery();
  const { data: accountInfo, isLoading: accountLoading } = trpc.googleBusiness.getAccountInfo.useQuery();
  const configMutation = trpc.googleBusiness.configureSettings.useMutation();
  const syncMutation = trpc.googleBusiness.syncPosts.useMutation();
  const disableMutation = trpc.googleBusiness.disable.useMutation();

  const handleConfigure = async () => {
    if (!accessToken.trim() || !googleLocationName.trim()) {
      alert("Please enter both access token and location name");
      return;
    }

    try {
      const result = await configMutation.mutateAsync({
        accessToken,
        googleLocationName,
        isActive: true,
      });

      if (result.success) {
        setAccessToken("");
        setGoogleLocationName("");
        setShowForm(false);
        alert("Google Business configured successfully!");
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
        alert(`Successfully synced ${result.synced} reviews!`);
      } else {
        alert(`Error: ${result.error}`);
      }
    } catch (error) {
      alert(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  };

  const handleDisable = async () => {
    if (confirm("Are you sure you want to disable Google Business integration?")) {
      try {
        const result = await disableMutation.mutateAsync();
        if (result.success) {
          alert("Google Business integration disabled");
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
          <CardTitle>Google Business Profile Integration</CardTitle>
          <CardDescription>
            Connect your Google Business account to automatically sync customer reviews and ratings
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {settingsLoading ? (
            <div className="flex items-center gap-2">
              <Loader className="w-4 h-4 animate-spin" />
              <span>Loading settings...</span>
            </div>
          ) : settings?.data ? (
            <div className="space-y-4">
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-semibold text-green-900">Connected</p>
                  <p className="text-sm text-green-700">
                    Google Business integration is active and configured
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
                  <p className="font-semibold text-blue-900">Account: {accountInfo.data.accountId}</p>
                  <p className="text-sm text-blue-700 mt-1">
                    {accountInfo.data.locations?.length || 0} location(s) found
                  </p>
                  {accountInfo.data.locations && accountInfo.data.locations.length > 0 && (
                    <div className="mt-3 space-y-2">
                      <p className="text-xs font-semibold text-blue-900">Locations:</p>
                      {accountInfo.data.locations.map((loc: any, idx: number) => (
                        <div key={idx} className="text-xs text-blue-800 ml-2">
                          • {loc.displayName}
                        </div>
                      ))}
                    </div>
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
                      Sync Reviews Now
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
                    Google Business integration is not yet configured
                  </p>
                </div>
              </div>

              {!showForm ? (
                <Button onClick={() => setShowForm(true)} className="w-full">
                  Configure Google Business
                </Button>
              ) : (
                <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Google Access Token
                    </label>
                    <textarea
                      value={accessToken}
                      onChange={(e) => setAccessToken(e.target.value)}
                      placeholder="Paste your Google Business access token here"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 font-mono text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Location Name
                    </label>
                    <input
                      type="text"
                      value={googleLocationName}
                      onChange={(e) => setGoogleLocationName(e.target.value)}
                      placeholder="e.g., accounts/123456789/locations/987654321"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 font-mono text-sm"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Get this from your Google Business account settings
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={handleConfigure}
                      disabled={configMutation.isPending || !accessToken.trim() || !googleLocationName.trim()}
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
                        setGoogleLocationName("");
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
          <CardTitle>How to Get Your Credentials</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-700">
          <ol className="list-decimal list-inside space-y-2">
            <li>Go to Google Cloud Console</li>
            <li>Create or select your project</li>
            <li>Enable Google My Business API</li>
            <li>Create a service account and generate credentials</li>
            <li>Copy the access token and location name</li>
          </ol>
          <p className="text-xs text-gray-500 mt-4">
            Your access token is stored securely and only used to sync reviews from your Google Business profile.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
