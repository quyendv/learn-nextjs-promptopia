'use client';

import { FormEvent, useEffect, useState } from 'react';
import { PromptDocument } from '~/models/prompt';
import PromptCard from './PromptCard';

type PromptListProps = {
  data: PromptDocument[];
  handleTagClick: Function;
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
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e: FormEvent<HTMLInputElement>) => {};

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('api/prompt');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

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

      <PromptCardList data={posts} handleTagClick={() => {}} />
    </section>
  );
}

export default Feed;
