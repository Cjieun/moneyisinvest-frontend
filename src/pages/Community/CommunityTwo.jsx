import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CommunityTwo.scss";
import Header from "systems/Header";
import Footer from "components/Footer";

// 메인커뮤니티 컴포넌트
const CommunityCommentBox = (props) => {
  const [HeartColor, setHeartColor] = React.useState("none");
  const [HeartStroke, setHeartStroke] = React.useState("#B0B0B0");
  const [isLiked, setIsLiked] = React.useState(false);
  const [MoreCommentColor, setMoreCommentColor] = React.useState("none");
  const [MoreCommentStroke, setMoreCommentStroke] = React.useState("#B0B0B0");
  const [IsCommentColor, setIsCommentColor] = React.useState(false);
  const [LikeCount, setLikeCount] = React.useState(0);

  const HeartClick = () => {
    if (isLiked) {
      setHeartColor("none");
      setHeartStroke("#B0B0B0");
      setLikeCount(LikeCount - 1);
    } else {
      setHeartColor("#85D6D1");
      setHeartStroke("#85D6D1");
      setLikeCount(LikeCount + 1);
    }
    setIsLiked(!isLiked);
  };

  const MoreCommentClick = () => {
    if (IsCommentColor) {
      setMoreCommentColor("none");
      setMoreCommentStroke("#B0B0B0");
    } else {
      setMoreCommentColor("#85D6D1");
      setMoreCommentStroke("#85D6D1");
    }
    setIsCommentColor(!IsCommentColor);
    setShowInputDiv(!showInputDiv);
    props.toggleMoreComments(props.id);
  };

  const [showInputDiv, setShowInputDiv] = React.useState(false);

  const [showDiv, setShowDiv] = React.useState(true);
  const [showDeletButton, setShowDeletButton] = React.useState(false);

  const handleToggle = () => {
    setShowDiv(!showDiv);
    setShowDeletButton(!showDeletButton);
  };

  const onClickDelete = (id) => {
    const token = sessionStorage.getItem("token");
    const apiClient = axios.create({
      baseURL: process.env.REACT_APP_API_URL,
    });
    if (token !== null) {
      apiClient
        .delete("/api/v1/community/", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
          params: {
            id: parseInt(id),
          },
        })
        .then((response) => {
          console.log("delete Success", response.data);
          window.location.reload();
        })
        .catch((err) => {
          if (err.response) {
            console.log(
              "Error response:",
              err.response.status,
              err.response.data
            );
          } else if (err.request) {
            console.log("Request error:", err.request);
          } else {
            console.log("General error:", err.message);
          }
        });
    }
    // else {
    //   alert("로그인 해주세요!");
    //   navigate("/signIn", { replace: true });
    //   console.log("Token is null. Unable to send request.");
    // }
  };

  return (
    <div>
      <div className="CommunityCommentBox">
        <div className="UserImformationBox">
          <div className="UserProfile"></div>
          <div className="UserName">{props.UserName}</div>
        </div>
        <div className="UserComment">{props.UserComment}</div>
        <div className="ButtonsBigBox">
          <div className="ButtonsBox">
            {showDiv && (
              <div className="HeartAndCommentBox">
                <button className="HeartButton" onClick={HeartClick}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill={HeartColor}
                    className="HeartSvg"
                  >
                    <path
                      d="M9.25434 17.8514L9.25295 17.8501C6.65968 15.2871 4.58336 13.2297 3.14377 11.3101C1.71711 9.40774 1 7.7474 1 5.99455C1 3.09743 3.05046 1 5.5 1C6.90428 1 8.2951 1.71835 9.21435 2.8857L10 3.8834L10.7857 2.8857C11.7049 1.71835 13.0957 1 14.5 1C16.9495 1 19 3.09743 19 5.99455C19 7.7474 18.2829 9.40774 16.8562 11.3101C15.4166 13.2297 13.3403 15.2871 10.7471 17.8501L10.7457 17.8514L10 18.5913L9.25434 17.8514Z"
                      stroke={HeartStroke}
                      stroke-width="2"
                    />
                  </svg>
                </button>
                <div className="HeartCount">{LikeCount}</div>
                <button
                  className="MoreCommentButton"
                  onClick={MoreCommentClick}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill={MoreCommentColor}
                    className="CommentSvg"
                  >
                    <path
                      d="M18 0H2C0.9 0 0 0.9 0 2V20L4 16H18C19.1 16 20 15.1 20 14V2C20 0.9 19.1 0 18 0ZM18 14H3.2L2 15.2V2H18V14ZM15 9H13V7H15M11 9H9V7H11M7 9H5V7H7"
                      fill={MoreCommentStroke}
                    />
                  </svg>
                </button>
                <div className="CommentCount">{props.CommentCount}</div>
              </div>
            )}
            {showDeletButton && (
              <button
                className="DeletButton"
                onClick={() => onClickDelete(props.id)}
              >
                <p className="DeletButtontext">삭제하기</p>
              </button>
            )}
            {/* -------------------------------------- */}
            {props.showCircleButton && (
              <button className="OptionButton" onClick={handleToggle}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                >
                  <circle cx="10.5" cy="3.5" r="1.5" fill="#B0B0B0" />
                  <circle cx="10.5" cy="9.5" r="1.5" fill="#B0B0B0" />
                  <circle cx="10.5" cy="15.5" r="1.5" fill="#B0B0B0" />
                </svg>
              </button>
            )}
            {/* -------------------------------------- */}
          </div>
        </div>
      </div>
      <div className="EndLine"></div>
      {showInputDiv && (
        <MoreCommentInput commentId={props.id}></MoreCommentInput>
      )}
    </div>
  );
};
// 작성 컴포넌트
const CommunityInput = (props) => {
  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const [comment, setComment] = useState("");

  const handleInputContent = (e) => {
    setComment(e.target.value);
  };

  const userNames = sessionStorage.getItem("name");

  const onClickSubmit = () => {
    const token = sessionStorage.getItem("token");

    if (token !== null) {
      apiClient
        .post(
          "/api/v1/community/",
          {
            comment: comment,
            stockId: "005930",
          },
          {
            headers: {
              "X-AUTH-TOKEN": token,
            },
          }
        )
        .then((res) => {
          console.log("Support upload Success", res.data);
          window.location.reload();
        })
        .catch((err) => {
          if (err.response) {
            console.log(
              "Error response:",
              err.response.status,
              err.response.data
            );
          } else if (err.request) {
            console.log("Request error:", err.request);
          } else {
            console.log("General error:", err.message);
          }
        });
    }
  };

  return (
    <div className="CommunityInputFrame">
      <div className="UserImformationBoxThree">
        <div className="UserProfile"></div>
        <div className="UserName">{userNames}</div>
      </div>
      <textarea
        placeholder="텍스트를 입력하세요"
        className="CommunityTextArea"
        onChange={handleInputContent}
        value={comment}
      ></textarea>
      <button className="TextRegister" onClick={onClickSubmit}>
        <p>완료</p>
      </button>
    </div>
  );
};
// 대댓글 컴포넌트
const MoreCommentBox = (props) => {
  return (
    <>
      <div>
        <div className="MoreCommentFrame">
          <div className="MoreCommentInnerBox">
            <div className="UserImformationBoxTwo">
              <div className="UserProfile"></div>
              <div className="UserName">{props.UserName}</div>
            </div>
            <div className="UserCommentTwo">{props.UserComment}</div>
          </div>
        </div>
      </div>
    </>
  );
};
// 대댓글 작성 컴포넌트
const MoreCommentInput = (props) => {
  // --------------------------------------------------------

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });
  const [MoreComment, setMoreComment] = useState("");
  const MoreCommentPost = (e) => {
    setMoreComment(e.target.value);
  };
  const userNames = sessionStorage.getItem("name");
  const onClickSubmit = () => {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      apiClient
        .post(
          "/api/v1/community/reply",
          {
            comment: MoreComment,
            targetCommentId: props.commentId,
          },
          {
            headers: {
              "X-AUTH-TOKEN": token,
            },
          }
        )
        .then((res) => {
          console.log("대댓글 작성 성공", res.data);
          window.location.reload();
        })
        .catch((err) => {
          if (err.response) {
            console.log(
              "Error response:",
              err.response.status,
              err.response.data
            );
          } else if (err.request) {
            console.log("Request error:", err.request);
          } else {
            console.log("General error:", err.message);
          }
        });
    }
  };

  // -------------------------------

  return (
    <div className="MoreCommentInputFrame">
      <div className="MoreCommentInputInnerBox">
        <div className="UserProfile"></div>
        <div className="UserName">{userNames}</div>
        <textarea
          placeholder="텍스트를 입력하세요"
          className="MoreCommentTextArea"
          onChange={MoreCommentPost}
          value={MoreComment}
        ></textarea>
        <button className="MoreCommentButtonTwo" onClick={onClickSubmit}>
          <p>완료</p>
        </button>
      </div>
    </div>
  );
};

export const CommunityTwo = (item) => {
  const [comments, setComments] = useState([]);

  const addComment = (userName, userComment) => {
    setComments([...comments, { userName, userComment }]);
  };

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const [communityReply, setCommunityReply] = useState([]);
  const token = sessionStorage.getItem("token");

  useEffect(() => {
    apiClient
      .get(`/api/v1/community/detail`, {
        params: {
          stockId: "005930",
        },
        headers: {
          "X-AUTH-TOKEN": token,
        },
      })
      .then((response) => {
        console.log("response.data:", response.data);
        console.log("디테일 가져오기 성공");
        setCommunityReply(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [moreCommentsVisibility, setMoreCommentsVisibility] = useState({});

  const toggleMoreComments = (id) => {
    setMoreCommentsVisibility({
      ...moreCommentsVisibility,
      [id]: !moreCommentsVisibility[id],
    });
  };

  return (
    <div className="CommunityMainFrame">
      <Header></Header>
      <div className="CommunityInner">
        <p className="CommunityCompanyName">회사명</p>
        <p className="TextCommunity">커뮤니티</p>
        {communityReply.map((item) => (
          <React.Fragment key={item.id}>
            <CommunityCommentBox
              id={item.id}
              UserName={item.name}
              UserComment={item.comment}
              CommentCount={item.replyCount}
              toggleMoreComments={toggleMoreComments}
              showCircleButton={item.wroteUser}
            />

            {moreCommentsVisibility[item.id] &&
              item.communityReply &&
              item.communityReply.map((reply) => (
                <>
                  <MoreCommentBox
                    key={reply.id}
                    UserName={reply.name}
                    UserComment={reply.comment}
                  />
                </>
              ))}
          </React.Fragment>
        ))}
        <CommunityInput
          onCommentSubmit={addComment}
          UserName={item.name}
        ></CommunityInput>
        <Footer></Footer>
      </div>
    </div>
  );
};
