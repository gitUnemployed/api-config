import { useState } from "react";
import { PostMethodAPI } from "../lib/apiConfig";
import { ServerVariables } from "../lib/serverVariables";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const handlePostAPI = async () => {
    const res = await PostMethodAPI({
      variable: ServerVariables?.user?.login,
      payload: { email },
      loading: setLoading,
    });
    console.log(res);
    alert("Success: " + res?.message);
  };
  return (
    <div>
      <input
        placeholder="email"
        name="email"
        value={email || ""}
        onChange={(e) => setEmail(e.target.value)}
        autoComplete="off"
        type="email"
      />
      <button onClick={handlePostAPI}>Call post api</button>
    </div>
  );
};

export default Home;
