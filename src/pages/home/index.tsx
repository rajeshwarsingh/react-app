import styles from './home.module.scss';

export function Home() {
  return (
    <div className={styles.main}>
      <header>
        <h1>Welcome to the react</h1>
        <p>
          <b>Author: Rajeshwar Singh</b>
        </p>
      </header>
    </div>
  );
}

export default Home;
