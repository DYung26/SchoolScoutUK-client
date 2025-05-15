// components/ProfilePage.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/Sidebar";
import { UserCircle } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { navigate } from "wouter/use-browser-location";

export default function ProfilePage() {
  const { user, logout } = useAuth();

  function handleLogout() {
    logout();
    navigate("/login") 
  }

  return (
    <div className="flex min-h-screen bg-gray-100">
    {/*<Sidebar />*/}

      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <UserCircle className="h-16 w-16 text-gray-600" />
            <div>
              <h1 className="text-2xl font-semibold">
                {user?.user.firstName} {user?.user.lastName}
              </h1>
              <p className="text-sm text-gray-500">{user?.user.email}</p>
            </div>
          </div>
          <Button variant="default">Edit Profile</Button>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="info" className="w-full">
          <TabsList className="bg-white shadow-sm mb-4">
            <TabsTrigger value="info">Personal Info</TabsTrigger>
            <TabsTrigger value="account">Account Settings</TabsTrigger>
            {/*<TabsTrigger value="activity">Activity Logs</TabsTrigger>*/}
          </TabsList>

          {/* Personal Info */}
          <TabsContent value="info">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Full Name</p>
                    <p className="font-medium">
                      {user?.user.firstName} {user?.user.lastName}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">
                      {user?.user.email}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Phone</p>
                    <p className="font-medium">+234 ...</p>
                  </div>
                  {/*<div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">Lagos, Nigeria</p>
                  </div>*/}
                </div>
                <div>
                  <button
                    className="bg-red-500 border px-4 py-2 rounded-lg text-gray-100
                      hover:bg-red-300 hover:text-black"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Settings */}
          <TabsContent value="account">
            <Card>
              <CardContent className="p-6 space-y-4">
                <div>
                  <p className="text-sm text-gray-500">{user?.user.username}</p>
                  {/*<p className="font-medium"></p>*/}
                </div>
                <div>
                  <p className="text-sm text-gray-500">Password</p>
                  <Button variant="outline" size="sm">Change Password</Button>
                </div>
                {/*<div>
                  <p className="text-sm text-gray-500">Two-Factor Auth</p>
                  <p className="font-medium text-green-600">Enabled</p>
                </div>*/}
                <div>
                  <p className="text-sm text-gray-500">Email Verification</p>
                  {user?.user.isVerified ?
                    <p className="text-green-600 border inline-block px-4 py-2 
                      bg-green-600 text-white rounded-lg">
                      Verified
                    </p> :
                    <p className="text-red-600 border inline-block px-4 py-2 
                      bg-red-600 text-white rounded-lg">
                      Not Verified
                    </p> 

                  }
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Activity Logs */}
          {/*<TabsContent value="activity">
            <Card>
              <CardContent className="p-6">
                <ul className="text-sm space-y-2">
                  <li>🔐 Logged in from Lagos at 10:22 AM</li>
                  <li>✏️ Updated profile info</li>
                  <li>🔓 Changed password</li>
                  <li>📤 Uploaded documents</li>
                </ul>
              </CardContent>
            </Card>
          </TabsContent>*/}
        </Tabs>
      </main>
    </div>
  );
}

