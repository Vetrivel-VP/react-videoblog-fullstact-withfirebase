import { Flex, Image } from "@chakra-ui/react";
import { getFirestore } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { firebaseApp } from "../firebase-config";
import { gertUserInfo, userUploadedVideos } from "../utils/fetchData";
import RecommendedVideos from "./RecommendedVideos";
import Spinner from "./Spinner";

const randomImage =
  "https://source.unsplash.com/1600x900/?nature,photography,technology";

const UserProfile = () => {
  const { userId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [feeds, setFeeds] = useState(null);

  const fireStoreDb = getFirestore(firebaseApp);

  useEffect(() => {
    setIsLoading(true);
    if (userId) {
      gertUserInfo(fireStoreDb, userId).then((user) => {
        setUserInfo(user);
      });

      userUploadedVideos(fireStoreDb, userId).then((feed) => {
        setFeeds(feed);
      });
      setIsLoading(false);
    }
  }, [userId]);

  if (isLoading) return <Spinner />;

  return (
    <Flex
      alignItems={"center"}
      justifyContent="center"
      width={"full"}
      height="auto"
      p={2}
      direction="column"
    >
      <Flex
        justifyContent={"center"}
        width="full"
        position={"relative"}
        direction="column"
        alignItems={"center"}
      >
        <Image
          src={randomImage}
          height={"320px"}
          width="full"
          objectFit={"cover"}
          borderRadius={"md"}
        />

        <Image
          src={userInfo?.photoURL}
          width="120px"
          objectFit={"cover"}
          border="2px"
          borderColor={"gray.100"}
          rounded="full"
          shadow={"lg"}
          mt="-16"
        />
      </Flex>

      {feeds && (
        <Flex direction={"column"} width="full" my={6}>
          <RecommendedVideos feeds={feeds} />
        </Flex>
      )}
    </Flex>
  );
};

export default UserProfile;
