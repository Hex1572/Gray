import React, { useState, useEffect } from 'react';
import { pipeline } from '@xenova/transformers';
import './PeerSupport.css';

const spaces = [
  'Community Support',
  'Suggested Actions',
  '1-on-1 Support',
  'Mental Health',
  'Motivation',
  'Life Advice',
];

const PeerSupport = ({ initialSpace = 'Community Support' }) => {
  const [activeSpace, setActiveSpace] = useState(initialSpace);
  const [postInput, setPostInput] = useState('');

  const [posts, setPosts] = useState(() => {
    const initial = {};
    spaces.forEach((space) => {
      initial[space] = [];
    });
    return initial;
  });

  const [nlpModel, setNlpModel] = useState(null);
  const [loadingModel, setLoadingModel] = useState(true);
  const [modelError, setModelError] = useState(null);

  useEffect(() => {
    const loadModel = async () => {
      try {
        console.log('Loading BERT zero-shot model...');
        const model = await pipeline('zero-shot-classification', 'Xenova/facebook-bart-large-mnli', { quantized: true });
        setNlpModel(model);
        console.log('BERT model loaded successfully.');
      } catch (error) {
        console.error('Failed to load BERT model:', error);
        setModelError('Failed to load BERT model. Please check console.');
      } finally {
        setLoadingModel(false);
      }
    };
    loadModel();
  }, []);

  const handlePost = async () => {
    if (!postInput.trim()) return;

    let assignedSpace = activeSpace;

    if (nlpModel && activeSpace !== 'Suggested Actions') {
      try {
        const result = await nlpModel(postInput, spaces.filter(s => s !== 'Suggested Actions'));
        assignedSpace = result.labels[0];
        console.log('Classification result:', result);
        alert(`Your post was categorized under: ${assignedSpace} (score: ${result.scores[0].toFixed(2)})`);
      } catch (error) {
        console.error('Error during classification:', error);
        alert('Error classifying post. Check console.');
      }
    }

    const newPost = {
      id: Date.now(),
      text: postInput,
      comments: [],
    };

    setPosts((prev) => ({
      ...prev,
      [assignedSpace]: [newPost, ...prev[assignedSpace]],
    }));

    setPostInput('');
    setActiveSpace(assignedSpace); // optional: switch view to the assigned space
  };

  const renderMainContent = () => {
    if (activeSpace === 'Suggested Actions') {
      return (
        <div className="resource-links">
          <h3>Suggested Actions</h3>
          <ul>
            <li>
              🏥 <a href="https://www.doh.gov.ph/mental-health" target="_blank" rel="noreferrer">DOH Mental Health Resources</a>
            </li>
            <li>
              📍 <a href="https://www.ncmh.gov.ph/" target="_blank" rel="noreferrer">National Center for Mental Health (NCMH)</a> – Hotline: 1553
            </li>
            <li>
              📞 <a href="https://www.facebook.com/ncmhcrisishotline/" target="_blank" rel="noreferrer">NCMH Crisis Hotline (Facebook)</a>
            </li>
            <li>
              🧠 <a href="https://mentalhealthph.org/" target="_blank" rel="noreferrer">MentalHealthPH.org</a>
            </li>
            <li>
              🔍 <a href="https://directory.psychology.org.ph/" target="_blank" rel="noreferrer">Find a Psychologist (PAP Directory)</a>
            </li>
          </ul>
          <p className="note">These resources are verified and can guide you to professional support when needed. 💙</p>
        </div>
      );
    }

    return (
      <>
        <div className="posts-list">
          {posts[activeSpace]?.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              space={activeSpace}
              posts={posts}
              setPosts={setPosts}
              nlpModel={nlpModel}
            />
          ))}
        </div>

        <div className="post-box">
          <textarea
            rows="3"
            placeholder="Share your thoughts anonymously..."
            value={postInput}
            onChange={(e) => setPostInput(e.target.value)}
          />
          <button onClick={handlePost}>Post</button>
        </div>
      </>
    );
  };

  if (loadingModel) {
    return <div>Loading BERT model, please wait...</div>;
  }

  if (modelError) {
    return <div style={{ color: 'red' }}>{modelError}</div>;
  }

  return (
    <div className="peer-layout">
      <aside className="left-sidebar">
        <h3>Spaces</h3>
        <ul>
          {spaces.map((space) => (
            <li
              key={space}
              className={space === activeSpace ? 'active' : ''}
              onClick={() => setActiveSpace(space)}
            >
              {space}
            </li>
          ))}
        </ul>
      </aside>

      <main className="main-content">
        <div className="space-header">
          <h2>{activeSpace}</h2>
          <p className="anonymous-note">All posts are anonymous 💬</p>
        </div>
        {renderMainContent()}
      </main>

      <aside className="right-sidebar">
        <h4>Related Topics</h4>
        <ul>
          <li>Self-Care</li>
          <li>Stress Relief</li>
          <li>Motivational Stories</li>
          <li>Dealing with Burnout</li>
        </ul>
      </aside>
    </div>
  );
};

const PostCard = ({ post, space, posts, setPosts, nlpModel }) => {
  const [comment, setComment] = useState('');

  const addComment = async () => {
    if (!comment.trim()) return;

    if (nlpModel) {
      try {
        const result = await nlpModel(comment, [
          'Mental Health',
          'Motivation',
          'Community Support',
          'Life Advice',
          '1-on-1 Support',
        ]);
        console.log('Comment classification result:', result);
      } catch (error) {
        console.error('Error classifying comment:', error);
      }
    }

    const updatedPosts = posts[space].map((p) =>
      p.id === post.id ? { ...p, comments: [...p.comments, { id: Date.now(), text: comment }] } : p
    );

    setPosts({ ...posts, [space]: updatedPosts });
    setComment('');
  };

  return (
    <div className="post-card">
      <p className="post-text">🧑‍ Anonymous: {post.text}</p>
      <div className="comment-area">
        <input
          type="text"
          placeholder="Add a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button onClick={addComment}>Comment</button>
      </div>
      <div className="comments">
        {post.comments.map((c) => (
          <p key={c.id} className="comment-text">💬 {c.text}</p>
        ))}
      </div>
    </div>
  );
};

export default PeerSupport;
