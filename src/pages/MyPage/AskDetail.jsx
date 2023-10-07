import React, { useState, useEffect } from "react";
import "./AskDetail.scss";
import Header from "systems/Header";
import Profile from "systems/Profile";
import Footer from "components/Footer";
import Button from "components/Button";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function AskDetail() {
  const apiClient = axios.create({
    baseURL:
      process.env.NODE_ENV === "production"
        ? process.env.REACT_APP_API_URL
        : undefined,
  });

  const navigate = useNavigate();
  const { supportId } = useParams(); // URL로부터 supportId를 가져옵니다.

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [status, setStatus] = useState("");
  const [createdAt, setCreatedAt] = useState("");

  // fetchData 함수 정의
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchData = async () => {
    try {
      const token = sessionStorage.getItem("token");

      const response = await apiClient.get(
        `/api/v1/support/get/user-support?support_id=${supportId}`,
        {
          headers: {
            "X-AUTH-TOKEN": token,
          },
        }
      );

      const data = response.data;
      console.log("supportDetail Success", response);
      setTitle(data.title);
      setContent(data.contents);
      setStatus(data.status);
      setCreatedAt(data.createdAt);
    } catch (error) {
      console.log("supportDetail Fail", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const days = ["일", "월", "화", "수", "목", "금", "토"];
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()}.${
      days[date.getDay()]
    }`;
  };

  const onClickDelete = () => {
    const token = sessionStorage.getItem("token");
    if (token !== null) {
      apiClient
        .delete("/api/v1/support/remove", {
          headers: {
            "X-AUTH-TOKEN": token,
          },
          params: {
            supportId: parseInt(supportId),
          },
        })
        .then((response) => {
          alert("문의사항이 삭제되었습니다!");
          console.log("delete Succeess", response.data);
          navigate("/askpage", { replace: true });
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
    } else {
      alert("로그인 해주세요!");
      navigate("/signIn", { replace: true });
      console.log("Token is null. Unable to send request.");
    }
  };

  const onClickBack = () => {
    navigate("/askpage");
  };

  return (
    <div className="askWriteContainer">
      <Header />
      <div className="askWriteBox">
        <div className="askWriteContent">
          <div className="profile">
            <Profile />
          </div>
          <div className="askWriteProfile">
            <div className="askWriteTitle">문의사항</div>
            <div className="askWriteInfo">
              <div className="askDetailInfo-title">
                <div>Q. {title}</div>
                <table className="askDetailInfo-date">
                  <tr>
                    <td>{status}</td>
                    <td>{formatDate(createdAt)}</td>
                  </tr>
                </table>
              </div>
              <div className="askDetailInfo-content">
                <div>{content}</div>
              </div>
              {status === "답변 완료" && (
                <>
                  <div className="askDetailAnswer-title">
                    <table className="askDetailAnswer-date">
                      <tr>
                        <td>{formatDate(createdAt)}</td>
                      </tr>
                    </table>
                    <div>A. {title}</div>
                  </div>
                  <div className="askDetailAnswer-content">
                    <div>{content}</div>
                  </div>
                </>
              )}
              {status === "답변 대기중" ? (
                <div className="askDetailInfo-button">
                  아직 관리자의 답변을 기다리고 있어요.
                  <div onClick={onClickDelete}>
                    <Button state="askDetail" />
                  </div>
                </div>
              ) : (
                <div className="askDetailAnswer-button" onClick={onClickBack}>
                  <Button state="all" />
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
