import { FormEvent, useRef } from 'react';
import classes from './NewsletterRegistration.module.css';

function NewsletterRegistration() {

  const emailInputRef = useRef<HTMLInputElement>(null);

  function registrationHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // fetch user input (state or refs)

    fetch('/api/newsletter', {
      method: 'POST',
      body: JSON.stringify({
        email: emailInputRef.current?.value,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then(response => response.json()).then(data => {
      console.log(data);
    })

    // optional: validate input
    // send valid data to API
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            ref={emailInputRef}
            placeholder='Your email'
            aria-label='Your email'
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;