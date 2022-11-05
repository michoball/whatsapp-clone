import { Avatar, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import ChatIcon from "@mui/icons-material/Chat";
import Chat from "./Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SearchIcon from "@mui/icons-material/Search";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase.config";
import { collection, addDoc, query, where } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import { signOut } from "firebase/auth";

function Sidebar() {
  const [user] = useAuthState(auth);
  const userChatQuery = collection(db, "chats");
  const userChatRef = query(
    userChatQuery,
    where("users", "array-contains", user.email)
  );
  const [chatsSnapshot] = useCollection(userChatRef);
  // const q = chatsSnapshot?.docs.map((chat) => chat.data().users);

  // console.log(
  //   !!chatsSnapshot?.docs.filter((chat) =>
  //     chat.data().users.find((user) => user.includes("kmh060020@gmail.com"))
  //   )?.length > 0
  // );

  const createChat = () => {
    const input = prompt(
      "Please enter an email for the user you wish to chat with"
    );

    if (!input) {
      return null;
    }
    if (
      EmailValidator.validate(input) &&
      !chatAlreadyExists(input) &&
      input !== user.email
    ) {
      //We need to add the chat into the DB 'chats' collection if it doesn't already exist and is valid;
      addDoc(collection(db, "chats"), {
        users: [user.email, input],
      });
    } else {
      alert("Chat room is aready exist! ");
    }
  };

  const chatAlreadyExists = (recipientEmail) =>
    !!chatsSnapshot?.docs.filter((chat) =>
      chat.data().users.find((user) => user.includes(recipientEmail))
    )?.length > 0;
  // => blooean 값을 가지는 함수
  // !chatAlreadyExists를 하면 true면 false가 false면 true가 반환된다.
  // console.log(chatAlreadyExists("kmh060020@gmail.com"));

  return (
    <Container>
      <Header>
        <UserAvatar onClick={() => signOut(auth)} />

        <IconsContainer>
          <UserIconButton>
            <ChatIcon />
          </UserIconButton>
          <UserIconButton>
            <MoreVertIcon />
          </UserIconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chats" />
      </Search>

      <SidebarButton onClick={createChat}>Start A NEW CHAT</SidebarButton>
      {/* List of Chats */}
      {chatsSnapshot?.docs.map((chat) => (
        <Chat key={chat.id} id={chat.id} users={chat.data().users} />
      ))}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  height: 100vh;
  min-width: 300px;
  max-width: 350px;
  overflow-y: scroll;

  ::-webkit-scrollbar {
    display: none;
  }
`;
const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;

  :hover {
    transform: translateY(2px);
    box-shadow: -4px -5px 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;
  }
`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;

  box-shadow: inset 3px 0 10px rgba(0, 0, 0, 0.5);
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;
  background-color: aliceblue !important;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const IconsContainer = styled.div``;

const UserIconButton = styled(IconButton)`
  :hover {
    transform: translateY(2px);
    box-shadow: -4px -5px 10px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s;
  }
`;
