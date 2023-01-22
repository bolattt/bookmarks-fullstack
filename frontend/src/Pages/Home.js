import { Link } from "react-router-dom";
function Home() {
  return (
    <div>
      <h2>Welcome</h2>
      <h3>To the greatest bookmarks app!</h3>
      <Link to="bookmarks">
        <button>Enter</button>
      </Link>
    </div>
  );
}

export default Home;
