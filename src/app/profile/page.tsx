'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Profile from '~/components/Profile';
import { PromptDocument } from '~/models/prompt';
import { SessionWithUser } from '../api/auth/[...nextauth]/route';

export default function MyProfile() {
  const { data: session } = useSession() as { data: SessionWithUser | null /* ...others key */ };
  const [posts, setPosts] = useState<PromptDocument[]>([]);
  const router = useRouter();

  const handleEditPrompt = (post: PromptDocument): void => {
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDeletePrompt = async (post: PromptDocument): Promise<void> => {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        const filteredPosts = posts.filter((item) => item._id.toString() !== post._id.toString());

        setPosts(filteredPosts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`api/users/${session?.user.id}/posts`);
      const data = await response.json();
      setPosts(data);
    };
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={posts}
      handleEditPrompt={handleEditPrompt}
      handleDeletePrompt={handleDeletePrompt}
    />
  );
}
