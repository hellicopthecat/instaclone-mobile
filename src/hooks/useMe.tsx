import {Query} from "@/__generated__/graphql";
import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {isLoggedIn, loggedOut} from "apollo";
import {useEffect} from "react";

const DEFINE_ME_QUERY = gql`
  query SeeMyProfile {
    seeMyProfile {
      id
      userName
      isMe
      avatar
    }
  }
`;
const useMe = () => {
  const hasToken = useReactiveVar(isLoggedIn);
  const {data} = useQuery<Query>(DEFINE_ME_QUERY, {skip: !hasToken});
  useEffect(() => {
    if (data?.seeMyProfile === null) {
      loggedOut();
    }
  }, [data]);
  return {data};
};
export default useMe;
