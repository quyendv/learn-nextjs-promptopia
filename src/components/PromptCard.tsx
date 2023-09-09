import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { MouseEventHandler, useState } from 'react';
import { SessionWithUser } from '~/app/api/auth/[...nextauth]/route';
import { PromptDocument } from '~/models/prompt';

type Props = {
  post: PromptDocument;
  handleTagClick?: Function;
  handleEditPrompt?: MouseEventHandler;
  handleDeletePrompt?: MouseEventHandler;
};

function PromptCard({ post, handleTagClick, handleEditPrompt, handleDeletePrompt }: Props) {
  const { data: session } = useSession() as { data: SessionWithUser | null /* ...others key */ };
  const pathName = usePathname();
  const [copied, setCopied] = useState('');

  const handleCopy = (): void => {
    // only recopy after 2s
    if (copied === '') {
      setCopied(post.prompt);
      navigator.clipboard.writeText(post.prompt);
      setTimeout(() => setCopied(''), 2000);
    }
  };

  return (
    <div className="prompt_card">
      <div className="flex justify-start items-center gap-3 cursor-pointer">
        <Image
          src={post.creator?.image || ''}
          alt="user_image"
          width={40}
          height={40}
          className="rounded-full object-contain"
        />

        <div className="flex flex-col">
          <h3
            className="font-satoshi font-semi]
             text-gray-900"
          >
            {post.creator?.username}
          </h3>
          <p className="font-inter max-w-full break-words line-clamp-1 text-sm text-gray-500">{post.creator?.email}</p>
        </div>
      </div>

      <div className="copy_btn absolute top-3 right-3" onClick={handleCopy}>
        <Image
          src={copied === post.prompt ? '/assets/icons/tick.svg' : '/assets/icons/copy.svg'}
          alt={copied === post.prompt ? 'tick_icon' : 'copy_icon'}
          width={12}
          height={12}
        />
      </div>

      <p className="my-4 font-satoshi text-sm text-gray-700">{post.prompt}</p>
      <p className="font-inter text-sm blue_gradient cursor-pointer" onClick={() => handleTagClick && handleTagClick}>
        {post.tag}
      </p>

      {session?.user.id === post.creator._id.toString() && pathName === '/profile' && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer" onClick={handleEditPrompt}>
            Edit
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer" onClick={handleDeletePrompt}>
            Delete
          </p>
        </div>
      )}
    </div>
  );
}

export default PromptCard;
