import Head from 'next/head'
import { useEffect, useState } from "react";
import token from "../data/token";

export default function Home() {

  const [status, setStatus] = useState('Fetching...');

  useEffect(() => {
    const options = { method: 'GET' };

    // this is so the user can find the auth token in the minified source code if they search for it
    if(window.localStorage.getItem("debug"))
      options.headers = { 'Token': token };

    fetch('./api/status?verbose=', options)
      .then(response => response.json())
      .then(data => setStatus(data.longStatus));
  }, []);

  return (
    <div className="container">
      <Head>
        <meta charSet="utf-8" />
          <title>500 - Server Error</title>
          <meta name="description" content="San Diego CTF - Apollo 1337" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <h1 className="title">
          500 - Server Error
        </h1>

        <p className="description">
          We have a problem, Houston.
        </p>

        <div className="grid">
          <a className="card">
            <h3>Frontend Status &#128308;</h3>
            <p>Frontend pages are not rendering properly.</p>
          </a>

          <a className="card">
            <h3>Backend Status &#128994;</h3>
            <p>{status}</p>
          </a>
        </div>
      </main>

      <style jsx>{`
        .container {
          min-height: 100vh;
          padding: 0 0.5rem;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        main {
          padding: 5rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .title {
          margin: 0;
          line-height: 1.15;
          font-size: 4rem;
        }

        .title,
        .description {
          text-align: center;
        }

        .description {
          line-height: 1.5;
          font-size: 1.5rem;
        }

        .grid {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;

          max-width: 800px;
          margin-top: 3rem;
        }

        .card {
          margin: 1rem;
          flex-basis: 45%;
          padding: 1.5rem;
          text-align: left;
          color: inherit;
          text-decoration: none;
          border: 1px solid #eaeaea;
          border-radius: 10px;
          transition: color 0.15s ease, border-color 0.15s ease;
        }

        .card:hover,
        .card:focus,
        .card:active {
          color: #0070f3;
          border-color: #0070f3;
        }

        .card h3 {
          margin: 0 0 1rem 0;
          font-size: 1.5rem;
        }

        .card p {
          margin: 0;
          font-size: 1.25rem;
          line-height: 1.5;
        }

        @media (max-width: 600px) {
          .grid {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
          Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
          sans-serif;
        }

        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
)
}
