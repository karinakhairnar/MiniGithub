import React from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
const Decription = () => {
  const [user, setUser] = useState([]);
  const [repo, setRepo] = useState([]);
  const [para, setPara] = useState({
    query: 'masai',
    page: 1,
    // perPage: 5,
  });
  const param = useParams();
  const { login } = param;
  // console.log(login);
  const fetchRepos = async () => {
    await fetch(`https://api.github.com/users/${login}/repos`)
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setRepo(res);
      });
  };
  console.log(repo);

  useEffect(
    () => {
      getUsers(para);
      fetchRepos();
    },
    [login],
    [para],
  );

  const getUsers = ({ query, page, perPage }) => {
    return axios({
      url: `https://api.github.com/users/${login}`,
      params: {
        q: query,
        page: page,
        // per_page: perPage,
      },
    })
      .then((res) => {
        // console.log(res.data)
        // setUser(res.data.items.filter((item) => item.id == id));
        setUser([res.data]);
        //  console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  console.log(user);

  return (
    <div>
      Decription

      <div
        style={{
          width: '75%',
          margin: 'auto',
        }}>
        {user.map((el) => {
          //console.log(el.following_url)
          let str = el.following_url.slice(0, el.following_url.length - 13);
          //console.log(str)
          return (
            <div
              key={el.id}
              style={{
                width: '50%',
                display: 'flex',
                textAlign: 'left',
                margin: 'auto',
                marginTop: '1em',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                padding: '1em',
              }}>
              <div
                style={{
                  textAlign: 'center',
                }}>
                <img
                  src={el.avatar_url}
                  style={{
                    width: '85%',
                    border: '1px solid black',
                    padding: '0.5em',z
                    marginBottom: '0.5em',
                  }}
                />
                <p> Total Repositories :- {el.public_repos}</p>
                <button>
                  <a
                    href={`https://github.com/${login}`}
                    style={{ textDecoration: 'none', color: 'black' }}>
                    View github Profile
                  </a>
                </button>
              </div>
              <div style={{ padding: '1em' }}>
                <p>Repo ID :- {el.login}</p>
                <p>User Name :- {el.name}</p>
                <p>Decription :- {el.bio}</p>
                <p>Created_at :- {el.created_at}</p>
                <div
                  style={{
                    display: 'flex',
                    gap: '10px',
                    justifyContent: 'space-around',
                    marginTop: '3em',
                  }}>
                  <button>
                    <Link
                      to={`/following/${el.login}`}
                      style={{ textDecoration: 'none', color: 'black' }}>
                      {el.following} Following
                    </Link>
                  </button>
                  <button>
                    <Link
                      to={`/followers/${el.login}`}
                      style={{ textDecoration: 'none', color: 'black' }}>
                      {el.followers} Followers
                    </Link>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        <button style={{marginTop:'2em'}}>
          <Link to='/' style={{ textDecoration: 'none', color: 'black' }}>
            {' '}
            Go Back Home
          </Link>
        </button>
      </div>
      <h1>All Repositories</h1>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3,1fr)',
          textAlign: 'left',
          margin: '1em',
          padding: '1em',
        }}>
        {repo.map((el) => {
          return (
            <div
              key={el.id}
              style={{
                width: '90%',
                textAlign: 'auto',
                margin: '1em',
                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
                padding: '1em',
              }}>
              <div>
                <p>Repo Name :- {el.name}</p>
                <p>Created At :- {el.created_at}</p>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {' '}
                  <p>Visibility :- {el.visibility}</p>
                  <p>Language :- {el.language}</p>
                </div>

                <div style={{ margin: 'auto', textAlign: 'center' }}>
                  <button>
                    <a
                      href={`https://github.com/${login}/${el.name}`}
                      style={{ textDecoration: 'none', color: 'black' }}>
                      View github
                    </a>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Decription;
