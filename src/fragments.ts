import {gql} from "@apollo/client";

export const COMMENT_FRAGMENT = gql`
  fragment CommentFragment on Comment {
    id
    owner
    payload
    createAt
    user {
      isMe
      avatar
      userName
    }
  }
`;

export const PHOTO_FRAGMENT = gql`
  fragment PhotoFragment on Photo {
    id
    caption
    file
    isLiked
    owner
    totalLikes
    totalComments
    createAt
  }
`;
