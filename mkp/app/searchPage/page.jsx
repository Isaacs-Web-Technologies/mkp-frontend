'use client'
import React, { useState, useEffect } from 'react';
import AxiosInstance from '@/components/axiosInstance';

const Search = () => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch search results when the component mounts
    // Replace 'YOUR_API_ENDPOINT' with your Flask backend API endpoint
    AxiosInstance.get('YOUR_API_ENDPOINT', { params: { query: searchText } })
      .then((response) => {
        setSearchResults(response.data.results);
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }, [searchText]);

  const handleSearch = () => {
    // Trigger a search when the user clicks the search button
    // You can implement the search logic here
    // For simplicity, we are just setting a sample result
    setSearchResults([
      { title: 'Search Result 1', content: 'This is the content of result 1.' },
      { title: 'Search Result 2', content: 'This is the content of result 2.' },
    ]);
  };

  const handleSendMessage = () => {
    if (message.trim() !== '') {
      // Send the message to your Flask backend
      // Replace 'YOUR_API_ENDPOINT' with your Flask backend API endpoint
      AxiosInstance.post('YOUR_API_ENDPOINT', { message })
        .then((response) => {
          setChatMessages([...chatMessages, response.data.message]);
        })
        .catch((error) => {
          console.error('Error sending message:', error);
        });

      // Clear the message input
      setMessage('');
    }
  };

  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        placeholder="Search..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>

      {/* Display search results */}
      <div>
        {searchResults.map((result, index) => (
          <div key={index}>
            <h3>{result.title}</h3>
            <p>{result.content}</p>
          </div>
        ))}
      </div>

      {/* Chat interface */}
      <div>
        <h2>Chat with MKP AI</h2>
        <div>
          {chatMessages.map((msg, index) => (
            <div key={index}>{msg}</div>
          ))}
        </div>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Search;
