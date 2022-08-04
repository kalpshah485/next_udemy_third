import { useEffect, useState } from 'react';
import type Comment from '../../types/comment';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';

function Comments(props: { eventId: any; }) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    if (showComments) {
      fetch('/api/comments/' + eventId)
      .then((response) => response.json())
      .then(data => {
        setComments(data.comments);
      })
    }
  },[eventId, showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: {
    email: string;
    name: string;
    text: string;
  }) {
    // send data to API
    fetch('/api/comments/' + eventId,{
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      console.log(data);
      
    })
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList items={comments} />}
    </section>
  );
}

export default Comments;