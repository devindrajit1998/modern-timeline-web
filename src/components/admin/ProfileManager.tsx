
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';

interface Profile {
  id: string;
  name: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  bio: string;
  avatar_url: string;
}

const ProfileManager = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (data) {
        setProfile(data);
      } else {
        // Create default profile if none exists
        const defaultProfile = {
          name: user?.user_metadata?.name || '',
          title: '',
          email: user?.email || '',
          phone: '',
          address: '',
          bio: '',
          avatar_url: '',
        };
        setProfile(defaultProfile as Profile);
      }
    } catch (error: any) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!profile || !user) return;

    setSaving(true);
    try {
      const profileData = {
        user_id: user.id,
        name: profile.name,
        title: profile.title,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from('profiles')
        .upsert(profileData);

      if (error) throw error;

      toast.success('Profile saved successfully!');
    } catch (error: any) {
      toast.error('Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="text-white">Loading profile...</div>;
  }

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Name</label>
            <Input
              value={profile?.name || ''}
              onChange={(e) => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Title</label>
            <Input
              value={profile?.title || ''}
              onChange={(e) => setProfile(prev => prev ? { ...prev, title: e.target.value } : null)}
              className="bg-gray-700 border-gray-600 text-white"
              placeholder="e.g., Frontend Developer"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
            <Input
              value={profile?.email || ''}
              onChange={(e) => setProfile(prev => prev ? { ...prev, email: e.target.value } : null)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
            <Input
              value={profile?.phone || ''}
              onChange={(e) => setProfile(prev => prev ? { ...prev, phone: e.target.value } : null)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Address</label>
          <Input
            value={profile?.address || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, address: e.target.value } : null)}
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Bio</label>
          <Textarea
            value={profile?.bio || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, bio: e.target.value } : null)}
            className="bg-gray-700 border-gray-600 text-white min-h-24"
            placeholder="Tell us about yourself..."
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Avatar URL</label>
          <Input
            value={profile?.avatar_url || ''}
            onChange={(e) => setProfile(prev => prev ? { ...prev, avatar_url: e.target.value } : null)}
            className="bg-gray-700 border-gray-600 text-white"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>
        <Button
          onClick={handleSave}
          disabled={saving}
          className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
        >
          {saving ? 'Saving...' : 'Save Profile'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileManager;
