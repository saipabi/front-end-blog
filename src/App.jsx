import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

// const API_URL = "https://backend-blog-w9jh.onrender.com/posts";
const API_URL = "https://backend-blog-w9jh.onrender.com/api/posts"; 


function App() {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [formData, setFormData] = useState({ 
        title: '', content: '', category: '', author: '', image: '' 
    });

    // Fetch posts from backend
    const fetchPosts = async () => {
        try {
            const response = await axios.get(API_URL);
            setPosts(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching posts:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Submit new post
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(API_URL, formData);
            setPosts([response.data, ...posts]); // Add new post to UI
            setFormData({ title: '', content: '', category: '', author: '', image: '' });
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <div className="container mt-5 bg-primary">
            <h2 className="mb-4 text-center">My Blog</h2>

            {/* Form to add a new blog post */}
            <div className="card p-4 mb-4 shadow-sm">
                <h4>Add a New Post</h4>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" name="title" value={formData.title} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Content</label>
                        <textarea className="form-control" name="content" value={formData.content} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Category</label>
                        <input type="text" className="form-control" name="category" value={formData.category} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Author</label>
                        <input type="text" className="form-control" name="author" value={formData.author} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Image URL</label>
                        <input type="text" className="form-control" name="image" value={formData.image} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="btn btn-primary">Add Post</button>
                </form>
            </div>

            {/* Displaying blog posts */}
            {loading ? <p className="text-center">Loading Posts...</p> : (
                posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post._id} className="card mb-3 shadow-sm">
                            {post.image && <img src={post.image} className="card-img-top" alt={post.title} style={{ height: "200px", objectFit: "cover" }} />}
                            <div className="card-body">
                                <h4 className="card-title">{post.title}</h4>
                                <p className="card-text">{post.content}</p>
                                <span className="badge bg-secondary">{post.category}</span>
                                <p className="text-muted mt-2">By {post.author}</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No posts available.</p>
                )
            )}
        </div>
    );
}

export default App;
