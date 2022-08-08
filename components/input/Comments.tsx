import { useContext, useEffect, useState } from 'react';
import type Comment from '../../types/comment';

import CommentList from './CommentList';
import NewComment from './NewComment';
import classes from './Comments.module.css';
import NotificationContext from '../../store/notificationContext';

function Comments(props: { eventId: any; }) {
  const { eventId } = props;

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const notificationCtx = useContext(NotificationContext);

  useEffect(() => {
    if (showComments) {
      notificationCtx.showNotification({
        title: 'Fetching...',
        message: 'Fetching Comments',
        status: "pending"
      })
      fetch('/api/comments/' + eventId)
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          return response.json().then(data => {
            throw new Error(data.message || 'Something went wrong!');
          })
        })
        .then(data => {
          notificationCtx.showNotification({
            title: 'Success',
            message: 'Successfully fetched comments',
            status: "success"
          })
          setComments(data.comments);
        })
        .catch(error => {
          notificationCtx.showNotification({
            title: 'Error',
            message: error.message || 'Something went wrong!',
            status: "error"
          })
        })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventId, showComments]);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  function addCommentHandler(commentData: {
    email: string;
    name: string;
    text: string;
  }) {
    notificationCtx.showNotification({
      title: 'Commenting...',
      message: 'Posting Comment',
      status: "pending"
    })
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.ok) {
        return response.json()
      }
      return response.json().then(data => {
        throw new Error(data.message || 'Something went wrong!');
      })
    })
      .then(data => {
        console.log(data);
        notificationCtx.showNotification({
          title: 'Success',
          message: 'Successfully posted comment.',
          status: "success"
        })
      })
      .catch(error => {
        notificationCtx.showNotification({
          title: 'Error',
          message: error.message || 'Something went wrong!',
          status: "error"
        })
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