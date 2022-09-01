import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [data, setUser] = useState(null);
  const [error, setError] = useState(false);
  const [text, setText] = useState();
  const [para, setPara] = useState({
    query: 'masai',
    page: 1,
    perPage: 5,
  });

  useEffect(() => {
    getUsers(para);
  }, [para]);
  const getUsers = ({ query, page, perPage }) => {
    setLoading(true);
    return axios({
      url: `https://api.github.com/search/users`,
      //url: 'https://api.github.com/users/karina',
      params: {
        q: query,
        page: page,
        per_page: perPage,
      },
    })
      .then((res) => {
        setUser(res.data.items);
        // console.log(res.data.items);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setLoading(false);
      });
  };

  const sortByDate = () => {
    //console.log("hello")
    data.sort((a, b) => b.id - a.id);
    console.log(data);
  };
  // console.log(newArr);

  console.log(data);
  const handleClick = () => {
    setPara({
      ...para,
      query: text,
    });
  };

  if (loading) {
    return <h1>.....loading</h1>;
  }
  if (error) {
    return <h1>...is error</h1>;
  }

  return (
    <div>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button onClick={handleClick}>Search</button>
      <br />
      <div>
        <button
          disabled={para.page === 1}
          onClick={() => setPara({ ...para, page: para.page - 1 })}>
          Prev
        </button>
        <button onClick={() => setPara({ ...para, page: para.page + 1 })}>
          Next
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          gap: '1em',
          width: '85%',
          margin: 'auto',
        }}>
        {data.map((el) => (
          <div
            key={el.id}
            style={{
              margin: 'auto',
              marginTop: '1em',
              boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
              padding: '1em',
            }}>
            <img src={el.avatar_url} style={{ width: '40%' }} />
            <h4>{el.login}</h4>
           
            <button>
              {' '}
              <Link
                to={`/followers/${el.login}`}
                style={{ textDecoration: 'none', color: 'black' }}>
                Followers 
              </Link>
            </button>
            <button>
              <Link
                to={`/following/${el.login}`}
                style={{ textDecoration: 'none', color: 'black' }}>
                Following
              </Link>
            </button>
            <br />
            <Link
              to={`/description/${el.login}`}
              style={{ textDecoration: 'none', color: 'black' }}>
              more details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
