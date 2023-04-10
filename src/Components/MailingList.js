function MailingList({ status, message, onSubmitted }) {

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
            </div>
            <div>
            <input type='email' id='mailing-list-address' placeholder="email address" ref={node => input = node}></input>
                <button onClick={submit} id='mailing-list-submit'>SUBMIT</button>
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