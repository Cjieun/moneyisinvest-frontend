import { useState, useEffect } from "react";
import "./Community.scss";
import Header from 'systems/Header';
import Button from "components/Button";
import Footer from "components/Footer";
import {ReactComponent as ProfileImage} from "../../assets/images/profile.svg";
import {ReactComponent as Search} from "../../assets/images/search.svg";
import axios from "axios";
import {  RxHeart, RxChatBubble, RxDotsVertical } from "react-icons/rx";

const Community = ({ stockName }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [replyIndex, setReplyIndex] = useState(-1); // 현재 대댓글을 작성중인 댓글 인덱스
  const [newReply, setNewReply] = useState('');
  const [showActions, setShowActions] = useState(false); //댓글 수정, 삭제 아이콘
  const [community, setCommunity] = useState([]);
  const [profileName, setProfileName] = useState('');
  const [profileImageUrl, setProfileImageUrl] = useState('');
  const [targetCommentId, setTargetCommentId] = useState(null);
  const [replyOpen, setReplyOpen] = useState(false); // 대댓글 창 상태 관리

  const name = sessionStorage.getItem('name');

  const handleLikeToggle = (index) => {
    const updatedComments = [...comments];
    const currentComment = updatedComments[index];

    if (currentComment.isLiked) {
      currentComment.likeCount -= 1;
    } else {
      currentComment.likeCount += 1;
    }
    currentComment.isLiked = !currentComment.isLiked;

    setComments(updatedComments);
  };

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  }; //댓글 작성하는 거 실시간으로 보임

  const handleReplyChange = (event) => {
    setNewReply(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newComment.trim() === '') {
      return;
    }

    if (replyIndex !== -1) {
        // 대댓글을 작성중이면 해당 댓글의 replies에 추가
        const updatedComments = [...comments];
        updatedComments[replyIndex].replies.push(newComment);
        setComments(updatedComments);
        setReplyIndex(-1);
      } else if (editIndex !== -1) {
        // 수정 모드일 때는 댓글을 덮어씌우기
        const updatedComments = [...comments];
        updatedComments[editIndex].text = newComment;
        setComments(updatedComments);
        setEditIndex(-1);
      } else {
        // 새 댓글을 댓글 목록의 맨 위에 추가하여 최근 댓글이 가장 위에 오도록 함
        setComments([{ id: Date.now(), 
          text: newComment, 
          replies: [],
          likeCount: 0,
          isLiked: false}, ...comments]);
      }
  

    // 댓글 작성창 비우기
    setNewComment('');
  };



  const handleEdit = (index) => {
    // 선택한 댓글의 내용을 댓글 작성창에 표시하고 수정 모드로 설정
    setNewComment(comments[index].text);
    setEditIndex(index);
  };

  const handleReply = (index) => {
    // 대댓글 작성 모드로 설정
    setReplyIndex(index);
  };

  const handleReplySubmit = (event, index) => {
    event.preventDefault();
    if (newReply.trim() === '') {
      return;
    }

    const updatedComments = [...comments];
    updatedComments[index].replies.push(newReply);
    setComments(updatedComments);
    setReplyIndex(-1);
    setNewReply('');
  };

  /*const handleEditReply = (index, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[index].replies[replyIndex] = newReply; // 수정한 대댓글로 변경
    setComments(updatedComments);
    setReplyIndex(-1);
    setNewReply('');
  };*/

  const handleDeleteReply = (index, replyIndex) => {
    const updatedComments = [...comments];
    updatedComments[index].replies.splice(replyIndex, 1); // 대댓글 삭제
    setComments(updatedComments);
  };

  const commentsPerPage = 7; // 한 페이지에 보여줄 댓글 수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 번호

  const indexOfLastComment = currentPage * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(indexOfFirstComment, indexOfLastComment);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //const { stockId } = useParams();  URL로부터 supportId를 가져옵니다.
 //해당 주식의 커뮤니티 댓글 가져오기 - 가져와지는데 화면에 보이지는 않음
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
      console.log('커뮤니티 응답 데이터:', response);
      setCommunity(response.data);
    })
    .catch(error => {
      console.error('커뮤니티 에러 발생:', error);
    });
}, [community]);

/*useEffect(() => {
const token = sessionStorage.getItem("token");

//상점에 등록된 모든 상품 조회
const fetchData = async () => {
  console.log("fetchData 호출"); 
  if (!token || token.trim() === "") {
    console.error("토큰이 누락되었습니다. 로그인 후 다시 시도해 주세요.");
    return;
  }

  try {
    const response = await axios.get("/api/v1/shop/get/items", {
      headers: {
        "X-AUTH-TOKEN": token,
      },
      params: {
        size: 5,
        page: 0,
      },
    });
    setProductsList(response.data);
    console.log("상점 상품 정보 load success");
  } catch (error) {
    // 에러 처리
    console.error("API 요청 중 에러가 발생했습니다:", error);
  }
};

fetchData();
}, []); // 빈 배열을 넣어서 컴포넌트 마운트 시에만 실행되도록 합니다. */

//프로필이미지, 이름 가져오기
useEffect(() => {
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

async function fetchData() {
  const token = sessionStorage.getItem('token');

  if (!token || token.trim() === '') {
    console.error('토큰이 누락되었습니다. 로그인 후 다시 시도해 주세요.');
    return;
  }

  try {
    const response = await apiClient.get(`/api/v1/profile/get`, {
      headers: {
        'X-AUTH-TOKEN': token,
      },
    });

    const profileData = response.data;
    console.log(response);
    setProfileName(profileData.name);
  } catch (error) {
    console.error('프로필 정보를 불러오는데 실패했습니다.', error);
    console.error('오류 메시지:', error.message); // 추가적인 오류 메시지 출력
    console.error('오류 객체:', error.response); // 응답 객체 출력 (응답 코드, 응답 데이터 등)
  }
}

fetchData();
}, []); // 상태 변수를 위해 적절한 의존성 배열을 사용하거나 빈 배열로 남겨두십시오.

  //커뮤니티 댓글 달기 - 성공
  const postComment = () => {
     // POST 요청할 API 주소입니다.
     const url = "/api/v1/community/post";

     // header에 담을 정보를 설정합니다.
     const headers = {
       'Content-Type': 'application/json',
       'X-AUTH-TOKEN' : sessionStorage.getItem("token")
       // 추가적인 헤더 정보를 넣으실 수 있습니다.
     };
 
     // body에 담을 정보를 설정합니다.
     const data = {
       comment: newComment,
       stockId: '005930'
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

  //커뮤니티 대댓글 달기
  const postReply = () => {
    // POST 요청할 API 주소입니다.
    const url = '/api/v1/community/reply';

    // header에 담을 정보를 설정합니다.
    const headers = {
      'Content-Type': 'application/json',
      'X-AUTH-TOKEN' : sessionStorage.getItem("token")
      // 추가적인 헤더 정보를 넣으실 수 있습니다.
    };

    // body에 담을 정보를 설정합니다.
    const data = {
      comment: newReply,
      targetCommentId: 0
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
    comment: newReply,
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

  


//해당 주식의 커뮤니티 댓글(대댓글 정보 포함) 가져오기


//댓글 삭제
const deleteComment = async (id, index) => {
  // DELETE 요청할 API 주소입니다. id를 동적으로 적용해 주세요.
  const url = `/api/v1/community/remove${id}`;

  // header에 담을 정보를 설정합니다.
  const headers = {
    'X-AUTH-TOKEN': sessionStorage.getItem('token')
    // 추가적인 헤더 정보를 넣으실 수 있습니다.
  };

  try {
    // Axios를 이용해 DELETE 요청을 보냅니다.
    await axios.delete(url, {  headers });

    // API 요청이 성공적으로 이루어진 후에, 상태를 업데이트합니다.
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  } catch (error) {
    console.error('요청 실패:', error);
    console.error('오류 메시지:', error.message); // 추가적인 오류 메시지 출력
    console.error('오류 객체:', error.response); // 응답 객체 출력 (응답 코드, 응답 데이터 등)
  }
};



const communityItem = community.map((item) => (
  <div className="communityList">
    <div className="companycommunityList" key={item.id}>
      <div className="companycommunityProfile">
        <Profile className="companycommunityProfileImg" />
        <div className="companycommunityName">{item.name}</div>
    </div>
    <div className="companycommunityComment">{item.comment}</div>
    <div className="companycommunityReply">
      <div className="companycommunityIcons">
          <CommentHeart className="companycommunityIcon" />
          <div>0</div>
      </div>
        <div className="companycommunityIcons">
          <Comment className="companycommunityIcon" />
          <div>{item.replyCount}</div>
        </div>
      </div>
    
    </div>
  </div>
));


  
  return (
    <div className="communityContainer">
    <Header/>
    <div className="communityBox">
        <div className="communityContent">
        {/* 커뮤니티, 서치박스 */}
            <div className="communityTop">
                <div>{stockName}</div>
                <div className="communityTitle">커뮤니티</div>
                <div className="searchBox">
                <div className="Search">
                  <input type="text"/>
                  <div><Search/></div>
                 </div>
                </div>
            </div>

            <div className="commentList">
                {/* 댓글 목록 */}
                {communityItem}                
                {/*{ comments && comments.map((comment, index) => (
                    <div key={index.id} className="writeComment">
                        <div className="user"><img className="profileImg" src={profileImageUrl} alt="프로필 이미지" />{profileName}
                        <div className="userName">{comment.name}{comment.profileName}{index.name}</div> </div>
                        {editIndex === index ? (
                        <form onSubmit={handleSubmit}>
                            <textarea
                            className="inputComment"
                            value={newComment}
                            onChange={handleInputChange}
                            />
                            <button type="submit">수정 완료</button>
                        </form>
                      
                        ) : (
                        <>
                            <div className="group">
                            {/*<div className="companyCommunityList">
                            {comment.text}
                            </div>
                            <div className="commentText">{comment.text}</div>
                            <span className={`likeCount${comment.isLiked ? " liked" : ""}`}
              onClick={() => handleLikeToggle(index)}><RxHeart/><span > {comment.likeCount}</span></span>
                            <span className="replyCount"><RxChatBubble/></span>
                            <span onClick={() => setShowActions(!showActions)} className="edit-icon"><RxDotsVertical/></span>
                            {showActions && (
                              <div className="actions">
                                <div onClick={() => handleEdit(index)}>
                                <Button state="edit">수정</Button>
                                </div>
                                <div onClick={() =>  deleteComment(comment.id, index)} >
                                <Button state="delete">삭제</Button>
                                </div>
                              </div>
                            )}
                            <div onClick={() => handleReply(index)}>
                                <Button state="reply">대댓글 작성</Button>
                                </div>
                            </div>
                            <div className="repliesContainer">
                           {/* 대댓글 목록 *
                           {comment.replies.map((reply, replyIndex) => (
                                <div className="reply" key={replyIndex.id}>
                                  <div className="replyUser"><ProfileImage /></div>
                                  <div className="replyUserName">{reply.name}</div>
                                <div className="replyText">{reply.comment}</div>
                                <div onClick={() => handleDeleteReply(index, replyIndex)}>
                                    <Button state="delete">삭제</Button>
                                </div>
                                </div>
                            ))}

                            {/* 대댓글 작성창 *
                            {replyIndex === index && (
                                <form onSubmit={(event) => handleReplySubmit(event, index)} className="inputReplyForm">
                                <div><ProfileImage /></div>
                                <div className="replyUserName">최지은</div>
                                <textarea
                                    className="inputReply"
                                    value={newReply}
                                    onChange={handleReplyChange}
                                    placeholder="대댓글을 입력하세요"
                                />
                                <div onClick={postReply} type="submit" className="replybtn">
                                <Button state="reply">대댓글 작성</Button></div>
                            
                                </form>
                            )}
                            
                            </div>

                        </>
                        )}
                    </div>
                    ))} */}
            </div>
                  {/* 페이지네이션 */}
                <div className="pagination">
                    {Array.from({ length: Math.ceil(comments.length / commentsPerPage) }).map((_, index) => (
                    <button key={index} onClick={() => handlePageChange(index + 1)}>
                        {index + 1}
                    </button>
                    ))}
                </div>

            <div className="newComment">
                {/* 새로 작성하는 댓글 입력창 */}
                <form 
                className="postComment"
                onSubmit={handleSubmit}>
                    <div><Profile className="companycommunityProfileImg" /></div>
                    <div className="postUserName">{name}</div>
                    <textarea
                    className="inputComment"
                    value={editIndex === -1 ? newComment : ''} 
                    onChange={handleInputChange}
                    placeholder="댓글을 입력하세요"
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
