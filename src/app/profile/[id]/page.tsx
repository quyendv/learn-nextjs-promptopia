'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Profile from '~/components/Profile';
import { PromptDocument } from '~/models/prompt';

export default function UserProfile({ params }: { params: { id: string } }) {
  const searchParams = useSearchParams();
  const username = searchParams.get('name') as string;

  const [userPosts, setUserPosts] = useState<PromptDocument[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = (await response.json()) as PromptDocument[];

      setUserPosts(data);
    };
    if (params.id) fetchPosts();
  }, [params.id]);

  return (
    <Profile
      name={username}
      desc={`Welcome to ${username}'s personalized profile page. Explore ${username}'s exceptional prompts and be inspired by the power of their imagination`}
      data={userPosts}
    />
  );
}
