'use client';

import { ChangeEvent, useEffect, useState } from 'react';
import { PromptDocument } from '~/models/prompt';
import PromptCard from './PromptCard';

type PromptListProps = {
  data: PromptDocument[];
  handleTagClick: (tag: string) => void;
};

const PromptCardList = ({ data, handleTagClick }: PromptListProps) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard key={post._id.toString()} post={post} handleTagClick={handleTagClick} />
      ))}
    </div>
  );
};

function Feed() {
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout>(); // for debounce, or using custom hooks like "tiktok-ui" project
  const [posts, setPosts] = useState<PromptDocument[]>([]);
  const [searchedPost, setSearchedPost] = useState<PromptDocument[]>([]); // filtered posts/prompts

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = (await response.json()) as PromptDocument[];
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const filterPrompt = (searchText: string): PromptDocument[] => {
    const regex = new RegExp(searchText, 'i'); // 'i' flag for case-insensitive search
    // filter by usernames, tags or prompt contents
    return posts.filter(
      (post) => regex.test(post.creator.username as string) || regex.test(post.tag) || regex.test(post.prompt),
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    // debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompt(e.target.value); // not using searchText because it is not updated now
        setSearchedPost(searchResult);
      }, 500),
    );
  };

  const handleTagClick = (tagName: string): void => {
    setSearchText(tagName);
    setSearchedPost(filterPrompt(tagName));
  };

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>
      <PromptCardList data={searchText ? searchedPost : posts} handleTagClick={handleTagClick} />
    </section>
  );
}

export default Feed;
