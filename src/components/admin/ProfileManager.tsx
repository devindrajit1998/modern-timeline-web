import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Upload, X, User, FileText, Download } from 'lucide-react';

interface Profile {
  id: string;
  name: string;
  title: string[];
  email: string;
  phone: string;
  address: string;
  bio: string;
  avatar_url: string;
  cv_url: string;
}

const ProfileManager = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadingCV, setUploadingCV] = useState(false);
  const [selectedCV, setSelectedCV] = useState<File | null>(null);

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
        setProfile(data as Profile);
      } else {
        // Create default profile if none exists
        const defaultProfile = {
          name: user?.user_metadata?.name || '',
          title: [],
          email: user?.email || '',
          phone: '',
          address: '',
          bio: '',
          avatar_url: '',
          cv_url: '',
        };
        setProfile(defaultProfile as Profile);
      }
    } catch (error: any) {
      toast.error('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  if (!profile) {
    return <div>No profile data found.</div>;
  }

  const handleSave = async () => {
    if (!profile || !user) return;

    setSaving(true);
    try {
      const titles = Array.isArray(profile.title) 
        ? profile.title 
        : (profile.title as unknown as string).split('\n').map(t => t.trim()).filter(t => t);

      const profileData = {
        user_id: user.id,
        name: profile.name,
        title: titles,
        email: profile.email,
        phone: profile.phone,
        address: profile.address,
        bio: profile.bio,
        avatar_url: profile.avatar_url,
        cv_url: profile.cv_url,
        updated_at: new Date().toISOString(),
      };

      console.log('Profile data being sent:', profileData);

      let result;
      
      if (profile.id) {
        // Update existing profile
        console.log('Updating existing profile with ID:', profile.id);
        result = await supabase
          .from('profiles')
          .update(profileData)
          .eq('id', profile.id);
      } else {
        // Create new profile
        console.log('Creating new profile');
        result = await supabase
          .from('profiles')
          .insert(profileData)
          .select()
          .single();
      }

      const { error, data } = result;

      console.log('Database response:', { error, data });

      if (error) {
        console.error('Database error details:', error);
        throw error;
      }

      // If this was a new profile, update the local state with the returned data
      if (!profile.id && data) {
        setProfile(data);
      }

      toast.success('Profile saved successfully!');
    } catch (error: any) {
      console.error('Save error:', error);
      // More detailed error logging
      if (error.code) {
        console.error('Error code:', error.code);
      }
      if (error.details) {
        console.error('Error details:', error.details);
      }
      if (error.hint) {
        console.error('Error hint:', error.hint);
      }
      toast.error(`Failed to save profile: ${error.message}`);
    } finally {
      setSaving(false);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      
      setSelectedFile(file);
      
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile || !user) return;

    setUploading(true);
    try {
      const fileExt = selectedFile.name.split('.').pop();
      const fileName = `${user.id}/avatar-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-images')
        .upload(fileName, selectedFile);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-images')
        .getPublicUrl(fileName);

      // Update profile with new avatar URL
      setProfile(prev => prev ? { ...prev, avatar_url: publicUrl } : null);
      
      // Clear selected file and preview
      setSelectedFile(null);
      setPreviewUrl(null);
      
      toast.success('Image uploaded successfully!');
    } catch (error: any) {
      console.error('Upload error:', error);
      toast.error(`Failed to upload image: ${error.message}`);
    } finally {
      setUploading(false);
    }
  };

  const removeAvatar = () => {
    setProfile(prev => prev ? { ...prev, avatar_url: '' } : null);
    setSelectedFile(null);
    setPreviewUrl(null);
  };

  const handleCVSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (file.type !== 'application/pdf') {
        toast.error('Please select a PDF file');
        return;
      }
      
      // Validate file size (max 10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error('CV size must be less than 10MB');
        return;
      }
      
      setSelectedCV(file);
    }
  };

  const handleCVUpload = async () => {
    if (!selectedCV || !user) return;

    setUploadingCV(true);
    try {
      const fileExt = selectedCV.name.split('.').pop();
      const fileName = `${user.id}/cv-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('portfolio-documents')
        .upload(fileName, selectedCV);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from('portfolio-documents')
        .getPublicUrl(fileName);

      // Update profile with new CV URL
      setProfile(prev => prev ? { ...prev, cv_url: publicUrl } : null);
      
      // Clear selected file
      setSelectedCV(null);
      
      toast.success('CV uploaded successfully!');
    } catch (error: any) {
      console.error('CV upload error:', error);
      toast.error(`Failed to upload CV: ${error.message}`);
    } finally {
      setUploadingCV(false);
    }
  };

  const removeCV = () => {
    setProfile(prev => prev ? { ...prev, cv_url: '' } : null);
    setSelectedCV(null);
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Profile Information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Name</label>
            <Input
              value={profile?.name || ''}
              onChange={(e) => setProfile(prev => prev ? { ...prev, name: e.target.value } : null)}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Titles (one per line)</label>
            <Textarea
              placeholder="Software Engineer..."
              value={Array.isArray(profile.title) ? profile.title.join('\n') : profile.title}
              onChange={(e) => setProfile(prev => prev ? { ...prev, title: e.target.value.split('\n') } : null)}
              className="bg-gray-700 border-gray-600 text-white min-h-[80px]"
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
          <label className="block text-sm font-medium text-gray-300 mb-2">Profile Picture</label>
          
          {/* Current Avatar Display */}
          {profile?.avatar_url && !selectedFile && (
            <div className="mb-4">
              <div className="relative inline-block">
                <img
                  src={profile.avatar_url}
                  alt="Profile"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
                />
                <button
                  onClick={removeAvatar}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            </div>
          )}
          
          {/* File Upload */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white cursor-pointer hover:bg-gray-600 transition-colors"
              >
                <Upload size={16} />
                <span>Choose Image</span>
              </label>
              
              {selectedFile && (
                <Button
                  onClick={handleImageUpload}
                  disabled={uploading}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {uploading ? 'Uploading...' : 'Upload'}
                </Button>
              )}
            </div>
            
            {/* Preview */}
            {previewUrl && (
              <div className="relative inline-block">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-24 h-24 rounded-full object-cover border-2 border-gray-600"
                />
                <button
                  onClick={() => {
                    setSelectedFile(null);
                    setPreviewUrl(null);
                  }}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white text-xs transition-colors"
                >
                  <X size={12} />
                </button>
              </div>
            )}
            
            {!profile?.avatar_url && !selectedFile && (
              <div className="w-24 h-24 rounded-full bg-gray-700 border-2 border-gray-600 flex items-center justify-center">
                <User size={32} className="text-gray-400" />
              </div>
            )}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">CV/Resume</label>
          
          {/* Current CV Display */}
          {profile?.cv_url && !selectedCV && (
            <div className="mb-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                <FileText size={20} className="text-emerald-400" />
                <div className="flex-1">
                  <p className="text-white font-medium">Current CV</p>
                  <p className="text-gray-400 text-sm">PDF Document</p>
                </div>
                <div className="flex space-x-2">
                  <a
                    href={profile.cv_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                  >
                    <Download size={16} className="text-white" />
                  </a>
                  <button
                    onClick={removeCV}
                    className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    <X size={16} className="text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}
          
          {/* CV Upload */}
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <input
                type="file"
                accept=".pdf"
                onChange={handleCVSelect}
                className="hidden"
                id="cv-upload"
              />
              <label
                htmlFor="cv-upload"
                className="flex items-center space-x-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white cursor-pointer hover:bg-gray-600 transition-colors"
              >
                <Upload size={16} />
                <span>Choose PDF</span>
              </label>
              
              {selectedCV && (
                <Button
                  onClick={handleCVUpload}
                  disabled={uploadingCV}
                  size="sm"
                  className="bg-green-600 hover:bg-green-700"
                >
                  {uploadingCV ? 'Uploading...' : 'Upload CV'}
                </Button>
              )}
            </div>
            
            {/* Selected CV Info */}
            {selectedCV && (
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                <FileText size={20} className="text-emerald-400" />
                <div className="flex-1">
                  <p className="text-white font-medium">{selectedCV.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(selectedCV.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <button
                  onClick={() => setSelectedCV(null)}
                  className="p-2 bg-red-500 hover:bg-red-600 rounded-lg transition-colors"
                >
                  <X size={16} className="text-white" />
                </button>
              </div>
            )}
            
            {!profile?.cv_url && !selectedCV && (
              <div className="flex items-center space-x-3 p-3 bg-gray-700 rounded-lg border border-gray-600">
                <FileText size={20} className="text-gray-400" />
                <div>
                  <p className="text-gray-400">No CV uploaded</p>
                  <p className="text-gray-500 text-sm">Upload a PDF file</p>
                </div>
              </div>
            )}
          </div>
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
