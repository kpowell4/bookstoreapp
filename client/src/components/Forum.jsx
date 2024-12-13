import React, { useEffect, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "../css/Dashboard.css";
import { PostContext } from './PostContext'; // Import PostContext

const Forum = () => {
    const { posts, setPosts } = useContext(PostContext);
    const navigate = useNavigate();
    useEffect(() => {
        axios.get('http://localhost:3002/post/posts')
            .then(res => {
                setPosts(res.data);
                console.log(res.data);
            })
            .catch(err => console.error(err));
    }, [setPosts]);

    return (
        <div className="dashboard">
            
            <div className="header-box">
                <h1>Forum</h1>
                <h2 className='dashboard-text'>Here you can review and manage all the posts made by students.</h2>
                
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Student Name</th>
                        <th>Date Posted</th>
                        <th>Selected Book</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.username}</td>
                            <td>{post.date}</td>
                            <td>{post.selectedBook}</td>
                            <td>
                                <button onClick={() => {
                                    console.log(`Navigating to postdetails with ID: ${post.id}`);
                                    navigate(`/postdetails/${post.id}`);
                                }}>View Details</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Forum;




