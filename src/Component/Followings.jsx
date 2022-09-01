import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

const Following = () => {
  const [loading, setLoading] = useState(true);
  const [data, setUser] = useState([]);
  const [error, setError] = useState(false);
  const param = useParams();
  const { login } = param;
  const [para, setPara] = useState({
    query: 'masai',
    page: 1,
    // perPage: 5,
  });

  useEffect(() => {
    getUsers(para);
  }, [login]);
  const getUsers = ({ query, page, perPage }) => {
    setLoading(true);
    return axios({
      url: `https://api.github.com/users/${login}/following`,
      params: {
        q: query,
        page: page,
        // per_page: perPage,
      },
    })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
        setLoading(false);
      })
      .catch((e) => {
        console.log(e);
        setError(true);
        setLoading(false);
      });
  };
  console.log(data);

  if (loading) {
    return <h1>.....loading</h1>;
  }
  if (error) {
    return <h1>...is error</h1>;
  }
  return (
    <div>
      <div>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: '1em',
            width: '95%',
            margin: 'auto',
          }}>
          {data.map((el) => {
            //console.log(el.following_url)
            //let str = el.following_url.slice(0, el.following_url.length - 13);
            //console.log(str)
            return (
              <div
                key={el.id}
                style={{
                  width: '70%',
                  margin: 'auto',
                  marginTop: '1em',
                  boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                  padding: '1em',
                }}>
                <img src={el.avatar_url} style={{ width: '50%' }} />
                <p>User Name :- {el.login}</p>
                <div>
                  <button>
                    {' '}
                    <Link to={`/followers/${el.login}`}   style={{ textDecoration: 'none', color: 'black' }}>Followers</Link>
                  </button>
                  <button>
                    <Link to={`/following/${el.login}`}   style={{ textDecoration: 'none', color: 'black' }}>Following</Link>
                  </button>

                  <br />
                  <Link to={`/description/${el.login}`}   style={{ textDecoration: 'none', color: 'black' }}>More Detail</Link>
                </div>
                <Link to='/'   style={{ textDecoration: 'none', color: 'black' }}> Go Back Home</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Following;
