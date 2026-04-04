import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { base44 } from '@/api/base44Client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Loader2, Copy, Check, Sparkles, Calendar, Send, Trash2, Shield, Globe, ExternalLink, Zap, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const PLATFORMS = [
  { id: 'linkedin', label: 'LinkedIn', emoji: '💼', color: 'bg-blue-700', limit: 3000, autoPost: true, instructions: 'Connected & ready to auto-post!' },
  { id: 'pinterest', label: 'Pinterest', emoji: '📌', color: 'bg-red-600', limit: 500, autoPost: true, instructions: 'Connected & ready to auto-post!' },
  { id: 'twitter', label: 'Twitter / X', emoji: '🐦', color: 'bg-sky-500', limit: 280, autoPost: false, bufferUrl: 'https://buffer.com/app', instructions: 'Use Buffer (free) to schedule posts.' },
  { id: 'facebook', label: 'Facebook', emoji: '📘', color: 'bg-blue-600', limit: 63206, autoPost: false, bufferUrl: 'https://buffer.com/app', instructions: 'Use Buffer (free) to schedule posts.' },
  { id: 'instagram', label: 'Instagram', emoji: '📸', color: 'bg-pink-500', limit: 2200, autoPost: false, bufferUrl: 'https://buffer.com/app', instructions: 'Use Buffer (free) to schedule posts.' },
  { id: 'tiktok', label: 'TikTok', emoji: '🎵', color: 'bg-black', limit: 2200, autoPost: false, bufferUrl: 'https://buffer.com/app', instructions: 'Use Buffer (free) to schedule posts.' },
  { id: 'reddit', label: 'Reddit', emoji: '🤖', color: 'bg-orange-600', limit: 40000, autoPost: false, instructions: 'Post manually in nostalgia subreddits for free organic reach.' },
];

const FREE_CHANNELS = [
  {
    name: 'Reddit Communities', emoji: '🤖', color: 'bg-orange-500',
    description: 'Massive free organic reach. Post interesting nostalgia facts and history content.',
    free: true, url: 'https://reddit.com',
    subreddits: [
      { name: 'r/nostalgia', members: '2M+', url: 'https://reddit.com/r/nostalgia' },
      { name: 'r/OldSchoolCool', members: '5M+', url: 'https://reddit.com/r/OldSchoolCool' },
      { name: 'r/history', members: '17M+', url: 'https://reddit.com/r/history' },
      { name: 'r/80s', members: '500K+', url: 'https://reddit.com/r/80s' },
      { name: 'r/90s', members: '800K+', url: 'https://reddit.com/r/90s' },
      { name: 'r/vintageads', members: '300K+', url: 'https://reddit.com/r/vintageads' },
      { name: 'r/TriviaNight', members: '100K+', url: 'https://reddit.com/r/TriviaNight' },
      { name: 'r/ClassicRock', members: '1M+', url: 'https://reddit.com/r/ClassicRock' },
    ],
  },
  {
    name: 'Facebook Groups', emoji: '👥', color: 'bg-blue-600',
    description: 'Huge nostalgia audiences. Share posts and invite group members to eDecades.',
    free: true, url: 'https://facebook.com/groups',
    groups: ['I Grew Up in the 80s', 'Classic TV Shows & Movies', '70s 80s 90s Nostalgia', 'Old School Music Lovers', 'Vintage Fashion Enthusiasts', 'Retro Pop Culture'],
  },
  {
    name: 'Pinterest', emoji: '📌', color: 'bg-red-600',
    description: 'Long shelf-life content. Pins drive traffic for months. Perfect for vintage/history.',
    free: true, url: 'https://business.pinterest.com',
    boards: ['1980s Nostalgia', 'Vintage Fashion', 'Classic Music', 'Retro Ads', 'Old School Tech', 'Historical Events'],
  },
  {
    name: 'Buffer (Free Plan)', emoji: '📅', color: 'bg-teal-600',
    description: 'Schedule up to 10 posts/month free across 3 platforms. Best for Twitter, Facebook, Instagram.',
    free: true, url: 'https://buffer.com',
    tips: ['Connect Twitter, Facebook, LinkedIn', 'Schedule posts in advance', 'Analyze best posting times', 'Use the browser extension'],
  },
  {
    name: 'Later (Free Plan)', emoji: '🗓️', color: 'bg-purple-600',
    description: 'Visual content scheduler. Great for Instagram & TikTok. 30 posts/month free.',
    free: true, url: 'https://later.com',
    tips: ['Visual calendar planner', 'Best time to post suggestions', 'Instagram grid preview', 'Linkin.bio free tool'],
  },
  {
    name: 'HARO (Free Press)', emoji: '📰', color: 'bg-indigo-600',
    description: 'Get quoted in major media outlets for free. Sign up as a source.',
    free: true, url: 'https://www.helpareporter.com',
    tips: ['Sign up as a "Source"', 'Respond to nostalgia/history queries', 'Get featured in Forbes, Buzzfeed, etc.', 'Builds backlinks & credibility'],
  },
  {
    name: 'Canva (Free)', emoji: '🎨', color: 'bg-cyan-600',
    description: 'Create stunning retro-themed graphics for all social platforms. 100% free tier.',
    free: true, url: 'https://canva.com',
    tips: ['Use vintage/retro templates', 'Create decade-themed graphics', 'Export in all sizes', 'Animate posts for TikTok'],
  },
];

const DECADES = ['1920s','1930s','1940s','1950s','1960s','1970s','1980s','1990s','2000s','2010s','2020s'];
const TOPICS = ['Music', 'Fashion', 'Movies', 'Historical Events', 'Technology', 'Sports', 'Culture', 'Daily Life', 'Famous People', 'Fun Facts'];

export default function SocialMediaHub() {
  const queryClient = useQueryClient();
  const [generating, setGenerating] = useState(false);
  const [posting, setPosting] = useState(null);
  const [copied, setCopied] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState('linkedin');
  const [selectedDecade, setSelectedDecade] = useState('1980s');
  const [selectedTopic, setSelectedTopic] = useState('Music');
  const [generatedContent, setGeneratedContent] = useState('');
  const [generatedHashtags, setGeneratedHashtags] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');
  const [activeTab, setActiveTab] = useState('generate');

  const { data: authUser } = useQuery({
    queryKey: ['auth'],
    queryFn: () => base44.auth.me().catch(() => null),
  });

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ['social-posts'],
    queryFn: () => base44.entities.SocialMediaPost.list('-created_date', 50),
  });

  const saveMutation = useMutation({
    mutationFn: (data) => base44.entities.SocialMediaPost.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['social-posts']);
      toast.success('Post saved to queue!');
      setGeneratedContent('');
      setGeneratedHashtags('');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => base44.entities.SocialMediaPost.delete(id),
    onSuccess: () => queryClient.invalidateQueries(['social-posts']),
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => base44.entities.SocialMediaPost.update(id, data),
    onSuccess: () => queryClient.invalidateQueries(['social-posts']),
  });

  if (!authUser || authUser.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md">
          <CardContent className="p-8 text-center">
            <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Admin Only</h2>
            <p className="text-gray-600">You must be an admin to access the Social Media Hub.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const platform = PLATFORMS.find(p => p.id === selectedPlatform);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const result = await base44.integrations.Core.InvokeLLM({
        prompt: `You are the social media manager for eDecades, a platform for exploring history, nostalgia, music, fashion, and culture by decade.

Write an engaging ${selectedPlatform === 'twitter' ? 'tweet (max 240 chars)' : 'social media post'} about the topic "${selectedTopic}" in the "${selectedDecade}".

Make it fun, nostalgic, and engaging. Include a hook, interesting fact or story, and a call to action to visit eDecades.com.
${selectedPlatform === 'twitter' ? 'Keep it under 240 characters.' : 'Keep it 2-4 paragraphs.'}
${selectedPlatform === 'linkedin' ? 'Make it professional but still warm and engaging. Mention King Xcel Innovations / eDecades as the platform.' : ''}

Also provide 5-8 relevant hashtags.

Respond in JSON with: { "content": "...", "hashtags": "..." }`,
        response_json_schema: {
          type: 'object',
          properties: {
            content: { type: 'string' },
            hashtags: { type: 'string' },
          },
        },
      });
      setGeneratedContent(result.content || '');
      setGeneratedHashtags(result.hashtags || '');
    } catch (e) {
      toast.error('Failed to generate content');
    }
    setGenerating(false);
  };

  const handleAutoPost = async (platform_id, content, hashtags) => {
    setPosting(platform_id);
    try {
      const res = await fetch('/functions/postToSocial', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ platform: platform_id, content, hashtags }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to post');
      toast.success(`✅ Posted to ${platform_id === 'linkedin' ? 'LinkedIn' : 'Pinterest'} successfully!`);
      // Save as published
      await base44.entities.SocialMediaPost.create({
        platform: platform_id,
        content,
        hashtags,
        decade: selectedDecade,
        topic: selectedTopic,
        status: 'published',
        published_at: new Date().toISOString(),
      });
      queryClient.invalidateQueries(['social-posts']);
      setGeneratedContent('');
      setGeneratedHashtags('');
    } catch (e) {
      toast.error(e.message || 'Posting failed');
    }
    setPosting(null);
  };

  const handleOpenBuffer = (content, hashtags) => {
    const text = encodeURIComponent(`${content}\n\n${hashtags}`);
    window.open(`https://buffer.com/app/create?text=${text}`, '_blank');
  };

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
    toast.success('Copied to clipboard!');
  };

  const handleSave = (status) => {
    if (!generatedContent) return toast.error('Generate or write content first');
    saveMutation.mutate({
      platform: selectedPlatform,
      content: generatedContent,
      hashtags: generatedHashtags,
      decade: selectedDecade,
      topic: selectedTopic,
      status,
      scheduled_for: scheduledFor || null,
    });
  };

  const draftPosts = posts.filter(p => p.status === 'draft');
  const scheduledPosts = posts.filter(p => p.status === 'scheduled');
  const publishedPosts = posts.filter(p => p.status === 'published');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-700 to-indigo-700 text-white py-8 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-3 mb-2">
            <Globe className="w-8 h-8" />
            <h1 className="text-3xl font-bold">Social Media Hub</h1>
          </div>
          <p className="text-purple-200">AI-powered content creation & auto-posting for eDecades</p>
          <div className="flex gap-3 mt-3">
            <Badge className="bg-green-500 text-white border-0">✅ LinkedIn Connected</Badge>
            <Badge className="bg-red-500 text-white border-0">✅ Pinterest Connected</Badge>
            <Badge className="bg-white/20 text-white border-0">📋 Buffer for others</Badge>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Platform Status Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-3 mb-8">
          {PLATFORMS.map(p => (
            <Card key={p.id}
              className={`cursor-pointer border-2 transition-all ${selectedPlatform === p.id ? 'border-purple-500 shadow-md' : 'border-transparent'}`}
              onClick={() => setSelectedPlatform(p.id)}>
              <CardContent className="p-3 text-center">
                <div className={`w-10 h-10 ${p.color} rounded-full flex items-center justify-center text-xl mx-auto mb-2`}>
                  {p.emoji}
                </div>
                <p className="text-xs font-semibold text-gray-700">{p.label}</p>
                <Badge variant="outline" className={`mt-1 text-xs ${p.autoPost ? 'bg-green-50 text-green-700 border-green-300' : ''}`}>
                  {p.autoPost ? '⚡ Auto' : 'Manual'}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6 flex flex-wrap gap-1">
            <TabsTrigger value="generate">✨ AI Generator</TabsTrigger>
            <TabsTrigger value="queue">📋 Post Queue ({draftPosts.length + scheduledPosts.length})</TabsTrigger>
            <TabsTrigger value="published">✅ Published ({publishedPosts.length})</TabsTrigger>
            <TabsTrigger value="free">🆓 Free Channels</TabsTrigger>
            <TabsTrigger value="connect">🔌 Platform Status</TabsTrigger>
          </TabsList>

          {/* AI Generator Tab */}
          <TabsContent value="generate">
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-500" />
                    Generate Content
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Platform</label>
                    <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {PLATFORMS.map(p => (
                          <SelectItem key={p.id} value={p.id}>
                            {p.emoji} {p.label} {p.autoPost ? '⚡' : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {platform && (
                      <p className={`text-xs mt-1 ${platform.autoPost ? 'text-green-600 font-semibold' : 'text-gray-500'}`}>
                        {platform.autoPost ? '⚡ Auto-post enabled' : `Character limit: ${platform.limit.toLocaleString()}`}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Decade</label>
                    <Select value={selectedDecade} onValueChange={setSelectedDecade}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {DECADES.map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Topic</label>
                    <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        {TOPICS.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </div>

                  <Button onClick={handleGenerate} disabled={generating} className="w-full bg-purple-600 hover:bg-purple-700">
                    {generating ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Generating...</> : '✨ Generate with AI'}
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Preview & Post</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Post Content</label>
                    <Textarea
                      value={generatedContent}
                      onChange={(e) => setGeneratedContent(e.target.value)}
                      rows={6}
                      placeholder="Generated content will appear here. You can also write manually."
                      className="resize-none"
                    />
                    {generatedContent && (
                      <p className={`text-xs mt-1 ${generatedContent.length > (platform?.limit || 99999) ? 'text-red-500' : 'text-gray-500'}`}>
                        {generatedContent.length} / {platform?.limit.toLocaleString()} chars
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="text-sm font-medium mb-1 block">Hashtags</label>
                    <Input
                      value={generatedHashtags}
                      onChange={(e) => setGeneratedHashtags(e.target.value)}
                      placeholder="#eDecades #nostalgia #1980s"
                    />
                  </div>

                  {generatedContent && (
                    <Button variant="outline" className="w-full" onClick={() => handleCopy(`${generatedContent}\n\n${generatedHashtags}`, 'preview')}>
                      {copied === 'preview' ? <><Check className="w-4 h-4 mr-2 text-green-500" />Copied!</> : <><Copy className="w-4 h-4 mr-2" />Copy to Clipboard</>}
                    </Button>
                  )}

                  <div>
                    <label className="text-sm font-medium mb-1 block">Schedule For (optional)</label>
                    <Input type="datetime-local" value={scheduledFor} onChange={(e) => setScheduledFor(e.target.value)} />
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-2">
                    {/* Auto-post buttons */}
                    {platform?.autoPost && (
                      <Button
                        onClick={() => handleAutoPost(selectedPlatform, generatedContent, generatedHashtags)}
                        disabled={!generatedContent || posting === selectedPlatform}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold"
                      >
                        {posting === selectedPlatform
                          ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Posting...</>
                          : <><Zap className="w-4 h-4 mr-2" />Post Now to {platform.label}</>}
                      </Button>
                    )}

                    {/* Buffer button for manual platforms */}
                    {!platform?.autoPost && platform?.bufferUrl && generatedContent && (
                      <Button
                        onClick={() => handleOpenBuffer(generatedContent, generatedHashtags)}
                        className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                      >
                        <ExternalLink className="w-4 h-4 mr-2" />
                        Open in Buffer to Schedule
                      </Button>
                    )}

                    <div className="grid grid-cols-2 gap-2">
                      <Button variant="outline" onClick={() => handleSave('draft')} disabled={saveMutation.isPending || !generatedContent}>
                        Save as Draft
                      </Button>
                      <Button onClick={() => handleSave('scheduled')} disabled={saveMutation.isPending || !generatedContent} className="bg-purple-600 hover:bg-purple-700">
                        <Calendar className="w-4 h-4 mr-2" />
                        Add to Queue
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Post Queue Tab */}
          <TabsContent value="queue">
            <div className="space-y-4">
              {isLoading && <p className="text-center text-gray-500 py-8">Loading posts...</p>}
              {[...draftPosts, ...scheduledPosts].length === 0 && !isLoading && (
                <Card><CardContent className="p-12 text-center text-gray-400">No posts in queue. Generate some content!</CardContent></Card>
              )}
              {[...draftPosts, ...scheduledPosts].map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={() => deleteMutation.mutate(post.id)}
                  onMarkPublished={() => updateMutation.mutate({ id: post.id, data: { status: 'published', published_at: new Date().toISOString() } })}
                  onAutoPost={handleAutoPost}
                  onOpenBuffer={handleOpenBuffer}
                  onCopy={handleCopy}
                  copied={copied}
                  posting={posting}
                />
              ))}
            </div>
          </TabsContent>

          {/* Published Tab */}
          <TabsContent value="published">
            <div className="space-y-4">
              {publishedPosts.length === 0 && (
                <Card><CardContent className="p-12 text-center text-gray-400">No published posts yet.</CardContent></Card>
              )}
              {publishedPosts.map(post => (
                <PostCard
                  key={post.id}
                  post={post}
                  onDelete={() => deleteMutation.mutate(post.id)}
                  onCopy={handleCopy}
                  copied={copied}
                  readOnly
                />
              ))}
            </div>
          </TabsContent>

          {/* Free Channels Tab */}
          <TabsContent value="free">
            <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4">
              <h3 className="font-bold text-green-800 text-lg mb-1">🆓 100% Free Marketing Channels</h3>
              <p className="text-green-700 text-sm">All of these channels are completely free. Use the AI Generator tab to create content, then distribute it here.</p>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {FREE_CHANNELS.map(channel => (
                <Card key={channel.name} className="overflow-hidden">
                  <div className={`${channel.color} px-5 py-4 flex items-center justify-between`}>
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{channel.emoji}</span>
                      <div>
                        <h3 className="font-bold text-white text-lg">{channel.name}</h3>
                        <Badge className="bg-white/20 text-white border-0 text-xs">FREE</Badge>
                      </div>
                    </div>
                    <a href={channel.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1 bg-white/20 hover:bg-white/30 text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors">
                      Open <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <CardContent className="p-5">
                    <p className="text-sm text-gray-600 mb-4">{channel.description}</p>
                    {channel.subreddits && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Top Communities</p>
                        <div className="flex flex-wrap gap-2">
                          {channel.subreddits.map(s => (
                            <a key={s.name} href={s.url} target="_blank" rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-700 text-xs px-2 py-1 rounded-full hover:bg-orange-100 transition-colors">
                              {s.name} <span className="text-orange-400">{s.members}</span>
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                    {channel.groups && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Groups to Join</p>
                        <div className="flex flex-wrap gap-2">
                          {channel.groups.map(g => (
                            <span key={g} className="bg-blue-50 border border-blue-200 text-blue-700 text-xs px-2 py-1 rounded-full">{g}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {channel.boards && (
                      <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase mb-2">Suggested Boards</p>
                        <div className="flex flex-wrap gap-2">
                          {channel.boards.map(b => (
                            <span key={b} className="bg-red-50 border border-red-200 text-red-700 text-xs px-2 py-1 rounded-full">{b}</span>
                          ))}
                        </div>
                      </div>
                    )}
                    {channel.tips && (
                      <ul className="space-y-1">
                        {channel.tips.map(tip => (
                          <li key={tip} className="flex items-start gap-2 text-sm text-gray-600">
                            <span className="text-green-500 mt-0.5">✓</span> {tip}
                          </li>
                        ))}
                      </ul>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Platform Status Tab */}
          <TabsContent value="connect">
            <div className="grid md:grid-cols-2 gap-4">
              {PLATFORMS.map(p => (
                <Card key={p.id}>
                  <CardContent className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className={`w-10 h-10 ${p.color} rounded-full flex items-center justify-center text-xl`}>{p.emoji}</div>
                      <div>
                        <h3 className="font-semibold">{p.label}</h3>
                        <Badge variant="outline" className={`text-xs ${p.autoPost ? 'bg-green-50 text-green-700 border-green-300' : 'bg-amber-50 text-amber-700 border-amber-300'}`}>
                          {p.autoPost ? '⚡ Auto-posting enabled' : 'Manual / Buffer'}
                        </Badge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{p.instructions}</p>
                    {p.autoPost && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        <p className="text-xs text-green-800">Connected! Use the AI Generator tab to post directly.</p>
                      </div>
                    )}
                    {!p.autoPost && p.bufferUrl && (
                      <a href={p.bufferUrl} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline" size="sm" className="w-full">
                          <ExternalLink className="w-3 h-3 mr-2" /> Open Buffer to Schedule
                        </Button>
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
            <div className="mt-6 bg-blue-50 border border-blue-200 rounded-xl p-5">
              <h4 className="font-bold text-blue-800 mb-2">💡 How to use Buffer for Twitter, Facebook, Instagram & TikTok</h4>
              <ol className="space-y-2 text-sm text-blue-700">
                <li><strong>1.</strong> Sign up free at <a href="https://buffer.com" target="_blank" rel="noopener noreferrer" className="underline">buffer.com</a></li>
                <li><strong>2.</strong> Connect your Twitter, Facebook, Instagram accounts</li>
                <li><strong>3.</strong> Generate content here using the AI Generator</li>
                <li><strong>4.</strong> Click "Open in Buffer" — content is pre-filled</li>
                <li><strong>5.</strong> Schedule your post time and publish!</li>
              </ol>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function PostCard({ post, onDelete, onMarkPublished, onAutoPost, onOpenBuffer, onCopy, copied, readOnly, posting }) {
  const platform = PLATFORMS.find(p => p.id === post.platform);
  const fullText = `${post.content}\n\n${post.hashtags || ''}`.trim();

  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl">{platform?.emoji}</span>
            <Badge>{platform?.label}</Badge>
            <Badge variant={post.status === 'published' ? 'default' : post.status === 'scheduled' ? 'secondary' : 'outline'}>
              {post.status}
            </Badge>
            {post.decade && <Badge variant="outline">{post.decade}</Badge>}
            {post.topic && <Badge variant="outline">{post.topic}</Badge>}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <Button size="sm" variant="outline" onClick={() => onCopy(fullText, post.id)}>
              {copied === post.id ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
            </Button>
            {!readOnly && onMarkPublished && (
              <Button size="sm" variant="outline" onClick={onMarkPublished} className="text-green-600 border-green-300">
                <Send className="w-4 h-4" />
              </Button>
            )}
            <Button size="sm" variant="outline" onClick={onDelete} className="text-red-500 border-red-200">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>

        <p className="text-sm text-gray-800 whitespace-pre-wrap mb-2">{post.content}</p>
        {post.hashtags && <p className="text-sm text-purple-600 mb-3">{post.hashtags}</p>}

        {/* Auto-post or Buffer buttons on queue cards */}
        {!readOnly && (
          <div className="flex gap-2 mt-3">
            {platform?.autoPost && onAutoPost && (
              <Button
                size="sm"
                onClick={() => onAutoPost(post.platform, post.content, post.hashtags)}
                disabled={posting === post.platform}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {posting === post.platform
                  ? <><Loader2 className="w-3 h-3 mr-1 animate-spin" />Posting...</>
                  : <><Zap className="w-3 h-3 mr-1" />Post Now</>}
              </Button>
            )}
            {!platform?.autoPost && platform?.bufferUrl && onOpenBuffer && (
              <Button size="sm" variant="outline" onClick={() => onOpenBuffer(post.content, post.hashtags)} className="text-teal-700 border-teal-300">
                <ExternalLink className="w-3 h-3 mr-1" /> Open in Buffer
              </Button>
            )}
          </div>
        )}

        {post.scheduled_for && (
          <p className="text-xs text-gray-400 mt-2">📅 Scheduled: {new Date(post.scheduled_for).toLocaleString()}</p>
        )}
        {post.published_at && (
          <p className="text-xs text-gray-400 mt-2">✅ Published: {new Date(post.published_at).toLocaleString()}</p>
        )}
      </CardContent>
    </Card>
  );
}
