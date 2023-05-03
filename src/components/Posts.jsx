import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Posts(props) {
  const params = useParams();
  console.log("params:", params);
  const { userId } = params;

  const [isLoading, setIsLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState();
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    const getUserDetail = async () => {
      const userDetailResponse = axios.get(
        `https://api.github.com/uers/${userId}`
      );
      const userPostsResponse = axios.get(
        `https://jsonplaceholder.typicode.com/posts/?userId=${userId}`
      );
      // console.log("userDetailResponse:", userDetailResponse);

      Promise.allSettled([userDetailResponse, userPostsResponse])
        .then(function (values) {
          console.log("values", values);
          setSelectedUser(values[0]?.value?.data);
          setUserPosts(values[1]?.value?.data);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log("err", err);
        });

      // setSelectedUser(userDetailResponse.data);
      // setIsLoading(false);

      // // console.log("userPostsResponse:", userPostsResponse);
      // setUserPosts(userPostsResponse.data);
    };
    getUserDetail();
  }, []);

  if (isLoading) {
    return (
      <div>
        <p> User details is loading. Please wait. </p>
      </div>
    );
  }

  return (
    <div>
      <div>
        <img src={selectedUser?.avatar_url} width="50px" />
        <h4>
          {" "}
          {selectedUser?.name ||
            selectedUser?.email ||
            selectedUser?.company ||
            "unknown"}{" "}
          Posts
        </h4>
      </div>

      {userPosts?.map((post) => {
        return (
          <div
            key={post.id}
            style={{
              background: "green",
              margin: "10px",
              fontSize: "16px",
              padding: "10px",
              cursor: "pointer",
            }}
          >
            <p>{post.id} </p>
            <strong>{post.tile} </strong>
            <p>{post.body} </p>
          </div>
        );
      })}
    </div>
  );
}

export default Posts;
