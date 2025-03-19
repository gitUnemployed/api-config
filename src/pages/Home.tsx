import { useState } from "react";
import { PostMethodAPI } from "../lib/apiConfig";
import { ServerVariables } from "../lib/serverVariables";
import toast from "react-hot-toast";
// import axios from "axios";

const Home = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const handlePostAPI = async () => {
    const res = await PostMethodAPI({
      variable: ServerVariables?.user?.login,
      payload: { email },
      loading: setLoading,
    });
    if (res) {
      toast.success(res?.message);
      console.log(res);
    }
  };
  return (
    <div>
      {loading && <>Loading...</>}
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
