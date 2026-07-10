import React, { useEffect } from 'react';

const SENDER_ACCOUNT_ID = '4282163fd87824';
const SENDER_FORM_ID = 'epY5AQ';
const SENDER_SCRIPT_ID = 'sender-universal-script';
const SENDER_SCRIPT_URL =
    'https://cdn.sender.net/accounts_resources/universal.js';

function MailingList() {
    useEffect(() => {
        window.Sender = 'sender';

        window.sender =
            window.sender ||
            function senderQueue() {
                window.sender.q = window.sender.q || [];
                window.sender.q.push(arguments);
            };

        window.sender.l = window.sender.l || Date.now();

        window.sender.on =
            window.sender.on ||
            function registerSenderListener(event, callback) {
                window.sender.listeners = window.sender.listeners || {};
                window.sender.listeners[event] =
                    window.sender.listeners[event] || [];

                window.sender.listeners[event].push(callback);
            };

        /*
         * Queue the account initialization before loading the script.
         * Sender processes the queue after its script finishes loading.
         */
        window.sender(SENDER_ACCOUNT_ID);

        if (!document.getElementById(SENDER_SCRIPT_ID)) {
            const senderScript = document.createElement('script');

            senderScript.id = SENDER_SCRIPT_ID;
            senderScript.src = SENDER_SCRIPT_URL;
            senderScript.async = true;

            document.body.appendChild(senderScript);
        }
    }, []);

    return (
        <div>
            <style>{`
                #mailing-list {
                    box-sizing: border-box;
                    margin: 20px 4vw 60px;
                    padding: 20px;
                    text-align: center;
                    width: calc(100% - 8vw);
                    background-color: #ffffff;
                    color: #000000;
                    font-family:
                        'Open Sans',
                        Arial,
                        Helvetica,
                        sans-serif;
                }

                #mailing-list,
                #mailing-list * {
                    box-sizing: border-box;
                }

                #mailing-list .mailing-list-introduction {
                    margin: 0 0 12px;
                    text-align: center;
                }

                #mailing-list h4 {
                    margin: 0 0 10px;
                    color: #000000;
                    font-family:
                        'Open Sans',
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 35px;
                    text-align: center;
                    text-transform: none;
                    letter-spacing: normal;
                }

                #mailing-list .mailing-list-introduction p {
                    margin: 0 0 10px;
                    color: #000000;
                    font-family:
                        'Open Sans',
                        Arial,
                        Helvetica,
                        sans-serif;
                    font-size: 15px;
                    font-weight: 400;
                    line-height: 21px;
                    text-align: center;
                }

                #mailing-list .mailing-list-introduction p:last-child {
                    margin-bottom: 0;
                }

                #mailing-list a {
                    color: #000000;
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }

                /*
                 * Keep the outer mailing-list block wide while constraining
                 * the Sender form to the old MailerLite form width.
                 */
                #mailing-list .sender-form-container {
                    width: 100%;
                    max-width: 550px;
                    margin: 12px auto 0;
                }

                #mailing-list .sender-form-field {
                    width: 100%;
                    max-width: 100%;
                    min-height: 190px;
                    margin: 0 auto;
                    text-align: left;
                }

                /*
                 * Sender inserts a fixed-width iframe inside a wrapper.
                 * Center the iframe within the available form area.
                 */
                #mailing-list .sender-form-field > div {
                    display: flex !important;
                    justify-content: center !important;
                    width: 100% !important;
                    max-width: 100% !important;
                    margin: 0 !important;
                }

                #mailing-list .sender-form-field iframe {
                    display: block !important;
                    flex: 0 1 auto !important;
                    max-width: 100% !important;
                    margin: 0 auto !important;
                    border: 0 !important;
                }

                @media only screen and (max-width: 550px) {
                    #mailing-list {
                        margin-right: 4vw;
                        margin-left: 4vw;
                        padding: 20px 10px;
                        width: calc(100% - 8vw);
                    }

                    #mailing-list h4 {
                        font-size: 26px;
                        line-height: 32px;
                    }

                    #mailing-list .sender-form-container {
                        margin-top: 16px;
                    }

                    #mailing-list .sender-form-field iframe {
                        width: 100% !important;
                    }
                }
            `}</style>

            <section id='mailing-list'>
                <div className='mailing-list-introduction'>
                    <h4>Stay Connected</h4>

                    <p>
                        Sign up for our mailing list to hear about events, open
                        spaces, and news.
                    </p>

                    <p>
                        (To request a show at Woodland, please fill out{' '}
                        <a href='https://forms.gle/H7XQjmM7R5fVCxez6'>
                            this form
                        </a>
                        )
                    </p>
                </div>

                <div className='sender-form-container'>
                    <div
                        className='sender-form-field'
                        data-sender-form-id={SENDER_FORM_ID}
                    />
                </div>
            </section>
        </div>
    );
}

export default MailingList;
