import React, { useState, useEffect } from 'react';
import { auth } from '../firebase/firebase'; // Import the auth object from your firebase.js file
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth';
import './PeerSupport.css';

const userSpaces = [
  'Community Support',
  'Suggested Actions',
  '1-on-1 Support',
  'Mental Health',
  'Motivation',
  'Life Advice',
];

const adminSpaces = [
  'Admin Dashboard',
  'User Reports',
  'System Notifications',
  'Admin Actions',
];

const PeerSupport = ({ initialSpace = 'Community Support' }) => {
  const [activeSpace, setActiveSpace] = useState(initialSpace);
  const [postInput, setPostInput] = useState('');
  const [posts, setPosts] = useState(() => {
    const initial = {};
    [...userSpaces, ...adminSpaces].forEach((space) => {
      initial[space] = [];
    });
    return initial;
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState(''); // Store email for login

  useEffect(() => {
    // Track auth state changes (user login or logout)
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Check if the user is an admin based on their email
        setIsAdmin(user.email === 'admin@gmail.com');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, 'yourPassword'); // Replace 'yourPassword' with the actual password
    } catch (error) {
      console.error('Login failed: ', error);
      alert('Failed to log in. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;

  const spaces = isAdmin ? adminSpaces : userSpaces;

  const handlePost = async () => {
    if (!postInput.trim()) return;

    const user = auth.currentUser;
    const userName = isAdmin && user ? user.email : 'Anonymous'; // Only show email if admin is logged in

    try {
      const response = await fetch('http://localhost:5000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: postInput }),
      });

      const analysis = await response.json();
      const emotion = analysis[0]?.label || 'Neutral';

      const newPost = {
        id: Date.now(),
        text: postInput,
        emotion,
        userName, // Store the poster's name/email (or 'Anonymous' for regular users)
        comments: [],
      };

      setPosts((prev) => ({
        ...prev,
        [activeSpace]: [newPost, ...prev[activeSpace]],
      }));

      setPostInput('');
    } catch (error) {
      console.error('Failed to analyze post:', error);
      alert('There was a problem analyzing your post. Please try again.');
    }
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
              isAdmin={isAdmin} // Pass isAdmin flag to PostCard
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

const PostCard = ({ post, space, posts, setPosts, isAdmin }) => {
  const [comment, setComment] = useState('');

  const addComment = () => {
    if (!comment.trim()) return;

    const updatedPosts = posts[space].map((p) =>
      p.id === post.id
        ? { ...p, comments: [...p.comments, { id: Date.now(), text: comment }] }
        : p
    );

    setPosts({ ...posts, [space]: updatedPosts });
    setComment('');
  };

  const deleteComment = (commentId) => {
    const updatedPosts = posts[space].map((p) =>
      p.id === post.id
        ? { ...p, comments: p.comments.filter((c) => c.id !== commentId) }
        : p
    );

    setPosts({ ...posts, [space]: updatedPosts });
  };

  return (
    <div className="post-card">
      <p className="post-text">
        {isAdmin && post.userName && (
          <span className="poster-name">{post.userName}</span> // Show the poster's name if admin is logged in
        )}
        {isAdmin ? post.userName : 'Anonymous'}: {post.text}
        <span className="emotion-tag"> ({post.emotion})</span>
      </p>
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
          <div key={c.id} className="comment">
            <p className="comment-text">💬 {c.text}</p>
            {isAdmin && (
              <button className="delete-comment" onClick={() => deleteComment(c.id)}>
                Delete
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeerSupport;
