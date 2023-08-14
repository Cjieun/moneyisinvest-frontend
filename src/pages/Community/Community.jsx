import { useState } from "react";
import "./Community.scss";
import Header from 'systems/Header';
/**import Pagenation from "systems/Pagination";*/
import Button from "components/Button";
import Footer from "components/Footer";
import {ReactComponent as ProfileImage} from "../../assets/images/profile.svg";
import {ReactComponent as Search} from "../../assets/images/search.svg";
import axios from "axios";


 
const Community = ({ stockName }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [replyIndex, setReplyIndex] = useState(-1); // 현재 대댓글을 작성중인 댓글 인덱스
  const [newReply, setNewReply] = useState('');
  const [likeStatus, setLikeStatus] = useState([]); // 각 댓글의 좋아요 상태를 저장하는 배열

  const handleInputChange = (event) => {
    setNewComment(event.target.value);
  };

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
        setComments([{ id: Date.now(), text: newComment, replies: [] }, ...comments]);
      }
  

    // 댓글 작성창 비우기
    setNewComment('');
  };

  const handleDelete = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
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

  const wrtieComment = () => {
     // POST 요청할 API 주소입니다.
     const url = 'http://localhost:8080/api/v1/community/post';

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
                {currentComments.map((comment, index) => (
                    <div key={index} className="writeComment">
                        <div><ProfileImage /></div>
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
                            <div>{comment.text}</div>
                            <div onClick={() => handleEdit(index)}>
                            <button state="edit">수정</button>
                            </div>
                            <div onClick={() => handleDelete(index)}>
                            <button state="delete">삭제</button>
                            </div>
                            <div onClick={() => handleReply(index)}>
                            <Button state="comment">대댓글 작성</Button>
                            </div>
                            
                            <div className="repliesContainer">
                           {/* 대댓글 목록 */}
                           {comment.replies.map((reply, replyIndex) => (
                                <div className="reply" key={replyIndex}>
                                {reply}
                                <div onClick={() => handleDeleteReply(index, replyIndex)}>
                                    <button state="delete">삭제</button>
                                </div>
                                </div>
                            ))}

                            {/* 대댓글 작성창 */}
                            {replyIndex === index && (
                                <form onSubmit={(event) => handleReplySubmit(event, index)} className="inputReplyForm">
                                <textarea
                                    className="inputReply"
                                    value={newReply}
                                    onChange={handleReplyChange}
                                    placeholder="대댓글을 입력하세요"
                                />
                                <div type="submit" className="replybtn">
                                <Button state="comment">대댓글 작성</Button></div>
                            
                                </form>
                            )}
                            
                            </div>

                        </>
                        )}
                    </div>
                    ))}

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
                className="writeComment"
                onSubmit={handleSubmit}>
                    <div><ProfileImage /></div>
                    <textarea
                    className="inputComment"
                    value={editIndex === -1 ? newComment : ''} 
                    onChange={handleInputChange}
                    placeholder="댓글을 입력하세요"
                    />
                    <button onClick={wrtieComment} type="submit">작성</button>
                </form>
            </div>
        </div>
        
    </div>
    <Footer/>
    </div>
  );
};

export default Community;
