import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase/server";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

export function Profile() {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    bio: "",
    username: "",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
  });


  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        fetchProfile(user.id);
      }
    });
  }, []);

  async function fetchProfile(userId: string) {
    const { data, error } = await supabase
      .from("authors")
      .select("*")
      .eq("user_id", userId)
      .single();
    if (data)
      setProfile({
        name: data.name,
        email: data.email,
        bio: data.bio,
        username: data.username,
      });
  }

  const saveProfile = async () => {
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase
        .from("authors")
        .update({
          name: profile.name,
          email: profile.email,
          bio: profile.bio,
          username: profile.username,
        })
        .match({ user_id: user.id });
      if (!error) {
        // console.log("Profile updated successfully");
        toast.success("Profile updated successfully");
      } else {
        toast.error("Failed to update profile: " + error.message);
      }
    }
  };

  // console.log(passwords.oldPassword, passwords.newPassword);
  const changePassword = async () => {
    // console.log("changePassword");
    const {
      data: { user },
      error: getUserError,
    } = await supabase.auth.getUser();
    if (user) {
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword,
      });
      if (!error) {
        // console.log("Password updated successfully");
        toast.success("Password updated successfully");
      } else {
        toast.error("Failed to update password: " + error.message);
      }
    }
  }

  return (
    <Card className="w-full max-w-3xl">
      <CardHeader className="space-y-1">
        <CardTitle>Hi, {profile.username}</CardTitle>
        <CardDescription>Update your profile information.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bio">Bio</Label>
          <Input
            id="bio"
            value={profile.bio}
            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            id="username"
            value={profile.username}
            onChange={(e) =>
              setProfile({ ...profile, username: e.target.value })
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="oldPassword">Old Password</Label>
          <Input
            id="oldPassword"
            type="password"
            value={passwords.oldPassword}
            onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            value={passwords.newPassword}
            onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
          />
        </div>

        <Button onClick={changePassword}>Change Password</Button>

        {/*    <div style={{ position: 'relative' }}>
          <div className="space-y-2">
            <Label htmlFor="oldPassword">Old Password</Label>
            <Input
              id="oldPassword"
              type="password"
              value={passwords.oldPassword}
              onChange={(e) => setPasswords({ ...passwords, oldPassword: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={passwords.newPassword}
              onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })}
            />
          </div>

          <Button onClick={changePassword}>Change Password</Button>

          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(128, 128, 128, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            color: 'white',
            fontSize: '1.5em',
            fontWeight: 'bold',
            textAlign: 'center'
          }}>
            Doesn't work yet
          </div>
        </div> */}
      </CardContent>
      <CardFooter>
        <Button onClick={saveProfile}>Save</Button>
      </CardFooter>
      <CardFooter>
        View your public profile
        <Link href={`/${profile.username}`}>
          <Button>Here</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
