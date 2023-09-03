import { useState, useContext } from "react";
import { userContext } from "../Utils/UserProvider"; 
import { BsChatRight, BsChevronDown } from "react-icons/bs";
import { Box, Flex, Icon, Text, Image } from "@chakra-ui/react"; 

const ChatPage = () => {
  const { users } = useContext(userContext); // Getting users from userContext using useContext hook
  const [open, setOpen] = useState(false); 

  const handleOpenChats = () => {
    setOpen(!open); // Toggling the value of "open" when the chat box is clicked
  };

  return (
    <Flex justify="flex-end" pr="2rem"> {/* Rendering a flex container to position the chat box to the right */}
      <Box
        boxShadow="rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px" // Adding a drop shadow to the chat box
        w="21%" // Setting the width of the chat box
        rounded="10px" // Rounding the corners of the chat box
      >
        <Flex
          className="text-xl text-white bg-blue-800 p-4 flex items-end justify-between gap-[2rem] rounded-t-[11px] cursor-pointer" // Styling the chat header
          onClick={handleOpenChats} // Adding a click event to toggle the visibility of the user list
        >
          <Icon as={BsChatRight} className="-mr-[8rem]" /> {/* Rendering the chat icon */}
          <Text>Chats</Text> {/* Rendering the text "Chats" */}
          <Icon as={BsChevronDown} /> {/* Rendering the chevron icon */}
        </Flex>
        {open ? ( // If "open" is true, render the user list
          <Box className="p-4  h-[16rem] overflow-y-auto scrollbar-thin">
            {users?.map((user) => ( // Loop through users array and render user details
              <Box key={user.id}>
                <Flex gap="2"  pb="[2px]">
                  <Image
                    className="w-14 h-14 p-2 rounded-full"
                    src={user.profilepicture}
                    alt={user.username}
                  />
                  <Text>{user.name}</Text>
                </Flex>
              </Box>
            ))}
          </Box>
        ) : (
          "" // If "open" is false, render an empty string
        )}
      </Box>
    </Flex>
  );
};

export default ChatPage;
