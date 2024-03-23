import { useState, useEffect } from "react";
import "./Community.scss";
import Header from 'systems/Header';
import Button from "components/Button";
import Footer from "components/Footer";
import {ReactComponent as Profile} from "../../assets/images/profile.svg";
import {ReactComponent as CommentHeart} from "../../assets/images/commentHeart.svg";
import {ReactComponent as Comment} from "../../assets/images/comment.svg";
import axios from "axios";
import {  RxHeart, RxChatBubble, RxDotsVertical } from "react-icons/rx";

import { useParams } from "react-router-dom";


const Community = ({ stockName }) => {
  const { stockId } = useParams();  //URL로부터 supportId를 가져옵니다.

  //const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState(''); //새댓글
  const [editIndex, setEditIndex] = useState(-1);
  const [showActions, setShowActions] = useState(false); //댓글 수정, 삭제 아이콘
  const [community, setCommunity] = useState([]); //댓글 목록
  const [reply, setReply] = useState('');


  const name = sessionStorage.getItem('name');

  //const { stockId } = useParams();  URL로부터 supportId를 가져옵니다.
 //해당 주식의 커뮤니티 댓글 가져오기
 useEffect (() => {

  const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
  });

  const stockId = '005930'; // 주식 종목 코드
  const token = sessionStorage.getItem('token');

    apiClient.get(`/api/v1/community/get?stockId=${stockId}`, {
      headers: {
          "X-AUTH-TOKEN": token,
      }
  })
    .then(response => {
      console.log('커뮤니티 댓글 가져오기 성공:', response);
      setCommunity(response.data);
    })
    .catch(error => {
      console.error('커뮤니티 에러 발생:', error);
    });
}, [community]);


  //커뮤니티 댓글 달기
  const postComment = () => {
     // POST 요청할 API 주소입니다.
     const url = `/api/v1/community/post`;


     // header에 담을 정보를 설정합니다.
     const headers = {
       'Content-Type': 'application/json',
       'X-AUTH-TOKEN' : sessionStorage.getItem("token")
       // 추가적인 헤더 정보를 넣으실 수 있습니다.
     };
 
     // body에 담을 정보를 설정합니다.
     const data = {
       comment: newComment,
       stockId: stockId
       // 추가적인 body 정보를 넣으실 수 있습니다.
     };
 
     // Axios를 이용해 POST 요청을 보냅니다.
     axios.post(url, data, { headers })
       .then((response) => {
         console.log('응답 성공:', response.data);
       })
       .catch((error) => {
         console.error('요청 실패:', error);
         console.error('오류 메시지:', error.message); // 추가적인 오류 메시지 출력
         console.error('오류 객체:', error.response); // 응답 객체 출력 (응답 코드, 응답 데이터 등)
       });

  };




 // 대댓글을 등록하는 함수입니다.
const postReply = async () => {
  const url = "/api/v1/community/reply";

  const token = sessionStorage.getItem("token");
  if (!token || token.trim() === "") {
    console.error("토큰이 누락되었습니다. 로그인 후 다시 시도해주세요.");
    return;
  }

  const headers = {
    "Content-Type": "application/json",
    "X-AUTH-TOKEN": token,
  };

  const data = {
    targetCommentId: 0,
    comment: reply,
  };

  try {
    const response = await axios.post(url, data, { headers });
    const { success, msg } = response.data;
    console.log("응답 성공:", success, msg);

    // 성공적으로 생성된 대댓글에 대한 후속 처리를 여기에 작성하세요.
    // 예: 댓글 목록 새로 고침, 입력 창 초기화 등

  } catch (error) {
    console.error("요청 실패:", error);
    console.error("오류 메시지:", error.message);
    console.error("오류 객체:", error.response);
  }
};



const updateComment = async (id, newComment, editIndex) => {
  // 서버에 저장된 댓글 데이터를 업데이트하기 위한 비동기 작업을 수행합니다.
  const token = sessionStorage.getItem('token');
  const url = `/api/v1/community/update/${id}`;
  const headers = {
    'X-AUTH-TOKEN': token,
  };
  const data = {
    comment: newComment,
  };

  try {
    // Axios를 이용해 PUT 요청을 보냅니다.
    const response = await axios.put(url, data, { headers });

    console.log('댓글 업데이트(수정) 응답 데이터:', response);

    // 서버로부터 업데이트 성공 응답을 받은 후에 로컬 상태에서 댓글 목록을 업데이트합니다.
    if (editIndex !== -1) {
      const updatedComments = [...community];
      updatedComments[editIndex].text = newComment;
      setCommunity(updatedComments);
      setEditIndex(-1);
    }
  } catch (error) {
    console.error('댓글 업데이트(수정)에서 오류 발생:', error);
    console.error('오류 메시지:', error.message);
    console.error('오류 객체:', error.response);
  }
}; 

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_URL : undefined,
});  

const deleteComment = async (id) => {
  const token = sessionStorage.getItem("token");
    if (token !== null) {
      apiClient
        .delete("/api/v1/community/remove", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
          params: {
            id: parseInt(id),
          },
        })
        .then((response) => {
          alert("댓글이 삭제되었습니다!");
          console.log("delete Succeess", response.data);
          
        })
        .catch((err) => {
          if (err.response) {
            // 서버 응답이 온 경우 (에러 응답)
            console.log(
              "Error response:",
              err.response.status,
              err.response.data
            );
          } else if (err.request) {
            // 요청은 보내졌지만 응답이 없는 경우 (네트워크 오류)
            console.log("Request error:", err.request);
          } else {
            // 오류가 발생한 경우 (일반 오류)
            console.log("General error:", err.message);
          }
        });
    } 
};



  const CommentList = props => {
    return (
      <div className="communityList">
        <Profile className="companycommunityProfileImg" />
        <p className="companycommunityName">{props.userName}</p>
        <div className="companycommunityComment">{props.userComment}</div>
        <div className="companycommunityDate">{props.createdAt.substring(0, 10)}</div>
        <p className="userHeart"> ♡</p>
        <span onClick={() => setShowActions(!showActions)} className="edit-icon"><RxDotsVertical/></span>
                            {showActions && (
                              <div className="actions">
                                <div onClick={updateComment}>
                                <Button state="edit">수정</Button>
                                </div>
                                <div onClick={() => deleteComment(props.id)} >
                                <Button state="delete">삭제</Button>
                                </div>
                              </div>
                            )}
        <div onClick={postReply} type="submit" className="replybtn">
          <Button state="reply">대댓글 작성</Button>
      </div>
      </div>
    );
  };



  return (
    <div className="communityContainer">
    <Header/>
    <div className="communityBox">
        <div className="communityContent">
        {/* 커뮤니티, 서치박스 */}
            <div className="communityTop">
                <div>{stockName}</div>
                <div className="communityTitle">커뮤니티</div>
            </div>

            <div className="commentList">
                {/* 댓글 목록 */}

                {/*{communityItem} */}

                <div className="comments">
                {community.map((item) => {
                return (
                  <CommentList
                  userName={item.name}
                  userComment={item.comment}
                  createdAt={item.createdAt}
                  id={item.id}
                  />
                  );
                  })}
                </div>               
                
            </div>
                  

            <div className="newComment">
                {/* 새로 작성하는 댓글 입력창 */}
                <form 
                className="postComment">

                    <div><Profile className="companycommunityProfileImg" /></div>
                    <div className="postUserName">{name}</div>
                    <input
                    className="inputComment"
                    value={newComment} 
                    //onChange={handleInputChange}
                    placeholder="댓글을 입력하세요"
                    onChange={ e => {
                      setNewComment(e.target.value);
                    }}
                    />
                    <button onClick={postComment} type="submit" className="postBtn">작성</button>
                </form>
            </div>
        </div>
        
    </div>
    <Footer/>
    </div>
  );
};

export default Community;
