import React from "react";
import "./CommunityTwo.scss";
import Header from "systems/Header";

const CommunityMainFrame = ({ children }) => {
  return <div className="CommunityMainFrame">{children}</div>;
};

const CommunityInner = ({ children }) => {
  return <div className="CommunityInner">{children}</div>;
};

const CommunityCompanyName = (props) => {
  return <p className="CommunityCompanyName">{props.CompanyName}</p>;
};

const CommunityCommentBox = (props) => {
  const [HeartColor, setHeartColor] = React.useState("none");
  const [HeartStroke, setHeartStroke] = React.useState("#B0B0B0");
  const [isLiked, setIsLiked] = React.useState(false);
  const [MoreCommentColor, setMoreCommentColor] = React.useState("none");
  const [MoreCommentStroke, setMoreCommentStroke] = React.useState("#B0B0B0");
  const [IsCommentColor, setIsCommentColor] = React.useState(false);

  const HeartClick = () => {
    if (isLiked) {
      setHeartColor("none");
      setHeartStroke("#B0B0B0");
    } else {
      setHeartColor("#85D6D1");
      setHeartStroke("#85D6D1");
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
  };

  return (
    <div>
      <div className="CommunityCommentBox">
        <div className="UserProfile"></div>
        <div className="UserName">{props.UserName}</div>
        <div className="UserComment">{props.UserComment}</div>
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
        <div className="HeartCount">{props.HeartCount}</div>
        <button className="MoreCommentButton" onClick={MoreCommentClick}>
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
        <button className="OptionButton">
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
      </div>
      <div className="EndLine"></div>
    </div>
  );
};

const MoreCommentBox = (props) => {
  return (
    <div className="MoreCommentFrame">
      <div className="MoreCommentInnerBox">
        <div className="UserProfile"></div>
        <div className="UserName">{props.UserName}</div>
        <div className="UserComment">{props.UserComment}</div>
      </div>
    </div>
  );
};

const MoreCommentInput = (props) => {
  return (
    <div className="MoreCommentInputFrame">
      <div className="MoreCommentInputInnerBox">
        <div className="UserProfile"></div>
        <div className="UserName">{props.UserName}</div>
        <textarea
          placeholder="텍스트를 입력하세요"
          className="MoreCommentTextArea"
        ></textarea>
        <button className="MoreCommentButtonTwo">
          <p>완료</p>
        </button>
      </div>
    </div>
  );
};

const CommunityInput = (props) => {
  return (
    <div className="CommunityInputFrame">
      <div className="UserProfile"></div>
      <div className="UserName">{props.UserName}</div>
      <textarea
        placeholder="텍스트를 입력하세요"
        className="CommunityTextArea"
      ></textarea>
      <button className="TextRegister">
        <p>완료</p>
      </button>
    </div>
  );
};

export const CommunityTwo = () => {
  return (
    <CommunityMainFrame>
      <Header></Header>
      <CommunityInner>
        <CommunityCompanyName CompanyName="삼성전자"></CommunityCompanyName>
        <p className="TextCommunity">커뮤니티</p>
        <CommunityCommentBox
          UserName="손민기"
          UserComment="이 주식 도대체 언제 오르나요? 10만원 된다고 들어서 샀는데..."
          HeartCount="2,000"
          CommentCount="2,000"
        ></CommunityCommentBox>
        <MoreCommentBox
          UserName="최지은"
          UserComment="저는 그래서 그냥 장기투자 한다는 마음으로 갖고 있으려구요"
        ></MoreCommentBox>
        <MoreCommentBox
          UserName="전윤환"
          UserComment="그래도 차트 보니까 이제 슬슬 오를 때인듯"
        ></MoreCommentBox>
        <MoreCommentInput UserName="손민기"></MoreCommentInput>
        <CommunityCommentBox
          UserName="전윤환"
          UserComment="주식 초보인데 어떻게 하면 좋을까요? "
          HeartCount="2000"
          CommentCount="2000"
        ></CommunityCommentBox>
        <CommunityCommentBox
          UserName="최지은"
          UserComment="10만전자는 무슨... 반값이 됐네"
          HeartCount="2000"
          CommentCount="2000"
        ></CommunityCommentBox>
        <CommunityInput UserName="손민기"></CommunityInput>
      </CommunityInner>
    </CommunityMainFrame>
  );
};
