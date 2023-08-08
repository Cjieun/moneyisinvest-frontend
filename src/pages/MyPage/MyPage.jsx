import React, {useEffect, useState, useRef} from "react";
import axios from "axios";
import "./MyPage.scss";
import Header from "../../systems/Header";
import Footer from "components/Footer";
import Profile from "../../systems/Profile";
import {ReactComponent as MyPageProfile} from "../../assets/images/profile.svg";
import MyButton from "../../components/Button";

export default function MyPage() {
    const [isNameEditing, setNameEditing] = useState(false);
    const [name, setName] = useState("손민기");

    const nameRef = useRef("");

    const handleNameEdit = () => {
        setNameEditing(true);
        if (nameRef.current) {
            nameRef.current.focus();
        }
    };

    const handleNameSave = () => {
        setNameEditing(false);
        // 여기서 서버로 이름 업데이트 요청을 보낼 수도 있습니다.
    };

    const handleNameChange = (event) => {
        setName(event.target.value);
    };

    const onClickEnter = (e) => {
        if (e.key === 'Enter') {
            handleNameSave();
        }
    }

    useEffect (() => {
        const token = sessionStorage.getItem("token");
        if (token !== null) {
            axios.get("/api/v1/user/detail", {
                headers: {
                    'X-Auth-Token': token,
                },
            })
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                if (err.response) {
                    // 서버 응답이 온 경우 (에러 응답)
                    console.log("Error response:", err.response.status, err.response.data);
                } else if (err.request) {
                    // 요청은 보내졌지만 응답이 없는 경우 (네트워크 오류)
                    console.log("Request error:", err.request);
                } else {
                    // 오류가 발생한 경우 (일반 오류)
                    console.log("General error:", err.message);
                }});
        } else {
            console.log("Token is null. Unable to send request.");
        }
        },[]);

        const onClickFileUpload = () => {
            const token = sessionStorage.getItem("token");
            if(token !== null) {
                const fileInput = document.getElementById("imgUpload");
                if(fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const formData = new FormData();
                    formData.append("file", file);

                    axios.post("/api/v1/profile/upload", formData, {
                        headers: {
                            'X-AUTH-TOKEN' : token,
                            'Content-Type': 'multipart/form-data'
                        }
                    }).then(res => {
                        console.log("!!", res.data);
                    }).catch((err) => {
                        console.log(err);
                    });
                }
            } else {
                console.log("Token is null.");
            }
        }

    return (
        <div className="myPageContainer">
            <Header />
            <div className="myPageBox">
                <div className="myPageContent">
                    <div className="profile">
                        <Profile/>
                    </div>
                    <div className="myPageProfile">
                        <div className="myPageTitle">마이페이지</div>
                        <div className="myPageInfo">
                            <div className="myPageInfo-content">
                                <table class="custom-table">
                                    <tr>
                                        <td>프로필 이미지</td>
                                        <td>
                                            <div className="profileChange">
                                                <MyPageProfile className="myProfile"/>
                                                <div class="filebox">
                                                    <input type="file" id="imgUpload" oonChange={onClickFileUpload}></input>
                                                    <label for="imgUpload">변경</label>
                                                </div>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>이름</td>
                                        <td>
                                            <div className="profileNameChange">
                                                {isNameEditing ? (
                                                    <input
                                                        className="myNameInput"
                                                        type="text"
                                                        value={name}
                                                        onChange={handleNameChange}
                                                        ref={nameRef}
                                                        onKeyPress={(e) => onClickEnter(e)}
                                                    />
                                                ) : (
                                                    <div className="myName">{name}</div>
                                                )}
                                                <div onClick={
                                                        isNameEditing ? handleNameSave : handleNameEdit
                                                    }>
                                                    <MyButton
                                                    state="mine"
                                                    />
                                                </div>
                                            </div>
                                        </td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>아이디</td>
                                        <td>jieunc023@gmail.com</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>비밀번호</td>
                                        <td>변경일 2023.8.7.월</td>
                                        <td></td>
                                    </tr>
                                </table>
                                <div className="myPageOut">계정 탈퇴하기</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}
