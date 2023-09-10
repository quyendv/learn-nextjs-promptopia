import { PromptDocument } from '~/models/prompt';
import PromptCard from './PromptCard';

type Props = {
  name: string;
  desc: string;
  data: PromptDocument[];
  handleEditPrompt?: (post: PromptDocument) => void;
  handleDeletePrompt?: (post: PromptDocument) => Promise<void>;
};

function Profile({ name, desc, data, handleEditPrompt, handleDeletePrompt }: Props) {
  return (
    <section className="w-full">
      <h1 className="head_text text-left">{name} Profile</h1>
      <p className="desc text-left">{desc}</p>

      <div className="mt-10 prompt_layout">
        {data.map((post) => (
          <PromptCard
            key={post._id.toString()}
            post={post}
            handleEditPrompt={() => handleEditPrompt && handleEditPrompt(post)}
            handleDeletePrompt={() => handleDeletePrompt && handleDeletePrompt(post)}
          />
        ))}
      </div>
    </section>
  );
}

export default Profile;
