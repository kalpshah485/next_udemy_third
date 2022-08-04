import Comment from '../../types/comment';
import classes from './CommentList.module.css';

function CommentList(props: {
  items: Comment[]
}) {
  return (
    <ul className={classes.comments}>
      {/* Render list of comments - fetched from API */}
      {
        props.items.map(item => (
          <li key={item.id}>
            {' '}
            <p>{item.text}</p>
            <div>
              By <address>{item.name}</address>
            </div>
          </li>
        ))
      }
    </ul>
  );
}

export default CommentList;