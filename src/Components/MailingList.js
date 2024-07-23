function MailingList({ status, message, onSubmitted }) {

    // this is a more customized, stylized component that uses Mailchimp-Subscribe
    // see the Mailchimp-Subscribe docs on npm if you have questions
    
    let input
    const submit = () => {
        input &&
            input.value.indexOf('@') > -1 &&
            onSubmitted({
                EMAIL: input.value
            })
    }

    return (
        <div id='mailing-list'>
            <div id='mailing-list-copy'>
                <h2>Stay Connected</h2>
                <p>Sign up for our mailing list to hear about events, open spaces, and news.</p>
                <p>(we hardly ever send emails so follow the Woodland Instagram too!)</p>
            </div>
            <div>
            <input type='email' id='mailing-list-address' placeholder="email address" ref={node => input = node}></input>
                <button onClick={submit} className='blue' id='mailing-list-submit'>SUBMIT</button>
            </div>
            <div id='mailing-list-errors'>
                {status === "sending" && <div style={{ color: "blue" }}>sending...</div>}
                {status === "error" && (
                    <div
                        style={{ color: "red" }}
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
                {status === "success" && (
                    <div
                        style={{ color: "green" }}
                        dangerouslySetInnerHTML={{ __html: message }}
                    />
                )}
            </div>
        </div>
    )
}

export default MailingList