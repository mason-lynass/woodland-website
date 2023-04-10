function MailingList() {
    return (
        <div id='mailing-list'>
            <div id='mailing-list-copy'>
                <h2>Stay Connected</h2>
                <p>Sign up for our mailing list to hear about events, open spaces, and news.</p>
            </div>
            <div>
                <input type='email' id='mailing-list-address' placeholder="email address"></input>
                <button id='mailing-list-submit'>SUBMIT</button>
            </div>
        </div>
    )
}

export default MailingList